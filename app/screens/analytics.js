import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const AnalyticsPage = ({ navigation, route }) => {
    const { stressLevel, score } = route.params;
    const [assessmentData, setAssessmentData] = useState([]);

    useEffect(() => {
        fetchAssessmentData();
    }, []);

    const fetchAssessmentData = async () => {
        try {
            const response = await fetch('http://localhost:9000/me/assessments');
            const data = await response.json();
            const { assessment } = data;
            setAssessmentData(assessment);
        } catch (error) {
            console.error('Error fetching assessment data:', error);
        }
    };

    const data = {
        labels: assessmentData.map(item => item.date),
        datasets: [
            {
                data: assessmentData.map(item => item.score),
                strokeWidth: 2,
                color: () => 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    let stressMessage;
    if (score <= 25) {
        stressMessage = 'You are not stressed';
    } else if (score <= 50) {
        stressMessage = 'Mild stress';
    } else if (score <= 75) {
        stressMessage = 'Moderate stress';
    } else {
        stressMessage = 'Severe stress';
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stress Percentage</Text>
            <Text style={styles.score}>{score}%</Text>
            <Text style={styles.stressLevel}>Stress Level: {stressLevel}</Text>
            <Text style={styles.suggestions}>Well-being Suggestions:</Text>
            <Text style={styles.suggestion}>- Take breaks and relax</Text>
            <Text style={styles.suggestion}>- Practice deep breathing exercises</Text>
            <Text style={styles.suggestion}>- Engage in physical activity</Text>
            <Text style={styles.stressMessage}>{stressMessage}</Text>

            {/* Render the chart */}
            <LineChart
                data={data}
                width={400}
                height={220}
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: () => 'rgba(75, 192, 192, 1)',
                    labelColor: () => '#000',
                    strokeWidth: 2,
                }}
                style={{ marginVertical: 8 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    score: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    stressLevel: {
        fontSize: 18,
        marginBottom: 16,
    },
    suggestions: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    suggestion: {
        fontSize: 16,
        marginBottom: 4,
    },
    stressMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
});

export default AnalyticsPage;

