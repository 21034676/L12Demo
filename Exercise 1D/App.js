import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Barometer } from 'expo-sensors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        margin: 10,
    },
});

export default function App() {
    const [{ pressure, relativeAltitude }, setData] = useState({
        pressure: 0,
        relativeAltitude: 0,
    });

    useEffect(() => {
        Barometer.setUpdateInterval(100);
        const subscription = Barometer.addListener(setData);
        return () => subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.text}>Pressure: {pressure} hPa</Text>
            <Text style={styles.text}>Relative Altitude: {relativeAltitude} m</Text>
        </View>
    );
}
