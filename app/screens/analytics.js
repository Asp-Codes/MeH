import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { theme } from '../core/theme';
import BackButton from "../components/BackButton";

const AnalyticsPage = ({ route }) => {
    const { flag, stressLevel, score } = route.params;
    const [assessmentData, setAssessmentData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [randomVideos, setRandomVideos] = useState([]);
    const [randomTexts, setRandomTexts] = useState([]);

    const videoLinks = [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Example video links
        'https://www.youtube.com/watch?v=tgbNymZ7vqY',
        'https://www.youtube.com/watch?v=nQeUvNYOnTg',
        'https://www.youtube.com/watch?v=V-_O7nl0Ii0',
        'https://www.youtube.com/watch?v=YQHsXMglC9A',
        'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    ];

    const recommendationTexts = [
        'Recommendation: Take breaks and manage stress by meditating.',
        'Recommendation: Practice deep breathing exercises for relaxation.',
        'Recommendation: Try mindfulness exercises to calm your mind.',
        'Recommendation: Take a walk outside to clear your head.',
        'Recommendation: Stay hydrated and ensure you are eating well.',
    ];

    // Function to shuffle array and return the first 3 unique video links
    const getRandomVideos = () => {
        const shuffledVideos = [...videoLinks].sort(() => 0.5 - Math.random());
        return shuffledVideos.slice(0, 3);
    };

    // Function to get random texts
    const getRandomTexts = () => {
        const shuffledTexts = [...recommendationTexts].sort(() => 0.5 - Math.random());
        return shuffledTexts.slice(0, 3); // Get 3 random recommendation texts
    };

    useEffect(() => {
        if (!flag) {
            fetchAssessmentData();
        }

        setRandomVideos(getRandomVideos()); // Randomize 3 unique videos
        setRandomTexts(getRandomTexts()); // Randomize 3 recommendation texts
    }, [flag]);

    const fetchAssessmentData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://stressback.onrender.com/api/v1/me/assessments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();
            if (data && data.assessments) {
                const last7Data = data.assessments.slice(-7).filter(item =>
                    !isNaN(item.score) && item.date
                );
                setAssessmentData(last7Data);
            } else {
                setError('No valid assessments found');
            }
        } catch (error) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const lineChartData = assessmentData.map(item => item.score || 0);
    const xAxisLabels = assessmentData.map((_, index) => index + 1);  // Numbered Tests

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const handleVideoRedirect = (videoUrl) => {
        Linking.openURL(videoUrl).catch((err) => console.error('Failed to open URL:', err));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BackButton goBack={() => navigation.navigate('Home')} />
            {flag ? (
                <View style={styles.stressContainer}>
                    <Text style={styles.title}>Your Stress Analytics</Text>
                    <View style={styles.stressPercentageContainer}>
                        <Text style={styles.stressPercentage}>{score.toFixed(2)}%</Text>
                    </View>
                    <Text style={styles.stressLevelMessage}>{stressLevel}</Text>
                </View>
            ) : (
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Stress Trends (Last 7 Tests)</Text>
                    <View style={styles.chartArea}>
                        <YAxis
                            data={lineChartData}
                            contentInset={{ top: 20, bottom: 20 }}
                            svg={{ fontSize: 12, fill: theme.colors.text }}
                            numberOfTicks={5}
                            formatLabel={value => `${value}`}
                            style={styles.yAxis}
                        />
                        <View style={styles.chartContent}>
                            <LineChart
                                style={styles.chart}
                                data={lineChartData}
                                svg={{ stroke: theme.colors.primary, strokeWidth: 2 }}
                                contentInset={{ top: 20, bottom: 20 }}
                                curve={shape.curveBasis}
                            >
                                <Grid svg={{ stroke: theme.colors.secondary, strokeWidth: 0.5 }} />
                            </LineChart>
                            <XAxis
                                style={styles.xAxis}
                                data={xAxisLabels}
                                formatLabel={(_, index) => `${index + 1}`}
                                contentInset={{ left: 10, right: 10 }}
                                svg={{ fontSize: 12, fill: theme.colors.text }}
                            />
                        </View>
                    </View>
                </View>
            )}

            <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationTitle}>Recommendations</Text>
                {randomVideos.map((video, index) => (
                    <View key={index} style={styles.recommendationCard}>
                        <Text style={styles.recommendationText}>
                            {randomTexts[index]}
                        </Text>
                        <TouchableOpacity onPress={() => handleVideoRedirect(video)}>
                            <View style={styles.videoContainer}>
                                <Text style={styles.videoText}>Watch Video {index + 1}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: theme.colors.background,
    },
    stressContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20, // Added margin on top
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    stressPercentageContainer: {
        width: 150,
        height: 150,
        borderRadius: 60, // Makes it round
        borderWidth: 8,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20, // Space between title and percentage
        backgroundColor: theme.colors.surface,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    stressPercentage: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    stressLevelMessage: {
        fontSize: 18,
        color: theme.colors.secondary,
        textAlign: 'center',
    },
    chartContainer: {
        backgroundColor: theme.colors.surface,
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    chartArea: {
        flexDirection: 'row',
        height: 300,
    },
    yAxis: {
        marginRight: 10,
    },
    chartContent: {
        flex: 1,
        marginLeft: 10,
    },
    chart: {
        height: '100%',
    },
    xAxis: {
        marginTop: 10,
    },
    recommendationsContainer: {
        marginTop: 20,
    },
    recommendationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    recommendationCard: {
        backgroundColor: theme.colors.surface,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: theme.colors.shadow,
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    recommendationText: {
        fontSize: 16,
        color: theme.colors.text,
    },
    videoContainer: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    videoText: {
        color: theme.colors.onPrimary,
        fontSize: 16,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    errorText: {
        color: theme.colors.error,
        fontSize: 18,
        textAlign: 'center',
    },
});

export default AnalyticsPage;
