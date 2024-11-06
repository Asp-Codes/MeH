const Assessment = require("../models/stressModels");

exports.createAssessment =  async (req, res) => {
    const userId = req.user._id;

    const assessment = new Assessment({ userId, answers: [], completed: false });
    await assessment.save();

    res.json({ message: 'Assessment started', assessmentId: assessment._id });
};

exports.submitAnswer =  async (req, res) => {
    const { assessmentId, answer } = req.body;

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment || assessment.completed) {
        return res.status(400).json({ message: 'Invalid or completed assessment' });
    }

    assessment.answers.push(answer);
    await assessment.save();

    res.json({ message: 'Answer recorded' });
};

exports.getScore =  async (req, res) => {
    const { assessmentId } = req.params;

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
        return res.status(400).json({ message: 'Assessment not found' });
    }

    const totalQuestions = 10;
    if (assessment.answers.length < totalQuestions) {
        return res.status(400).json({ message: 'Assessment not yet completed' });
    }

    const userActualScore = assessment.answers.reduce((acc, score) => acc + score, 0);
    const totalPossibleScore = totalQuestions * 3; // 10 questions with a max score of 3 each
    const stressPercentage = (userActualScore / totalPossibleScore) * 100;

    let stressLevel;
    if (stressPercentage <= 25) {
        stressLevel = 'Low stress';
    } else if (stressPercentage <= 50) {
        stressLevel = 'Moderate stress';
    } else if (stressPercentage <= 75) {
        stressLevel = 'High stress';
    } else {
        stressLevel = 'Very high stress';
    }

    assessment.completed = true;
    assessment.score = stressPercentage;
    assessment.stressLevel = stressLevel;
    await assessment.save();

    return res.json({ success:true, assessment });
};
