import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const AnalyticsPage = ({ route,navigation }) => {

    const {flag,stressLevel,score}=route.params;
    const [assessmentData, setAssessmentData] = useState([]);
  
    useEffect(() => {
        fetchAssessmentData();
    }, []);

    const fetchAssessmentData = async () => {
        try {
            const response = await fetch('https://stressback.onrender.com/api/v1/me/assessments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
    
            const data = await response.json();
            console.log('API Response:', data); // Log the full API response
    
            if (data && data.assessments) {
                // Only take the last 7 valid entries
                const last7Data = data.assessments
                    .slice(-7)
                    .filter(item => {
                        const validScore = !isNaN(item.score) && item.score !== -Infinity && item.score !== null;
                        const validDate = item.date && typeof item.date === 'string';
                        if (!validScore || !validDate) {
                            console.warn(`Invalid data: ${JSON.stringify(item)}`);
                        }
                        return validScore && validDate;
                    });
    
                console.log('Filtered Assessment Data:', last7Data); // Log filtered data
    
                setAssessmentData(last7Data);
            } else {
                console.warn('No valid assessments found in response');
            }
    
        } catch (error) {
            console.error('Error fetching assessment data:', error);
        }
    };
    

    // Prepare data and labels for the last 7 data points
    const data = assessmentData.map(item => {
        // Ensure score is a valid number
        const validScore = isNaN(item.score) ? 0 : item.score;
        return validScore;
    });

    const labels = assessmentData.map(item => item.date);

    // Log data and labels to ensure they're correct
    console.log('Chart Data:', data);
    console.log('Chart Labels:', labels);

    /*const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                strokeWidth: 2, // Width of the line
            },
        ],
    };

    const chartConfig = {
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 2, // Optional: for percentage or floating-point values
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // Line color
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // To remove shadow from datasets
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
        bezier: true, // Enable Bezier curve for the line chart
    };*/


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {flag && (
                <>
                    <Text style={styles.title}>Your Stress Analytics</Text>
                    <Text style={styles.stressPercentage}>{score}%</Text>
                    <Text style={styles.stressLevelMessage}>{stressLevel}</Text>
                    <View style={styles.suggestionsContainer}>
                        <Text style={styles.suggestionsTitle}>Well-being Suggestions:</Text>
                        <Text style={styles.suggestion}>- Take breaks and relax</Text>
                        <Text style={styles.suggestion}>- Practice deep breathing exercises</Text>
                        <Text style={styles.suggestion}>- Engage in physical activity</Text>
                    </View>
                </>
            )}
            {/*<View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Stress Score Over Time</Text>
                <LineChart
                    data={chartData}
                    width={300} // from react-native
                    height={220}
                    chartConfig={chartConfig}
                    style={styles.chart}
                />
            </View>*/}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    stressPercentage: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    stressLevelMessage: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    suggestionsContainer: {
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    suggestionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    suggestion: {
        fontSize: 16,
        marginBottom: 8,
    },
    chartContainer: {
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chart: {
        borderRadius: 10,
        backgroundColor: 'white',
    },
});

export default AnalyticsPage;
