import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Audio } from 'expo-av';

export default function App() {
    const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
    const [isShaking, setIsShaking] = useState(false);
    const [sound, setSound] = useState();

    useEffect(() => {
        Gyroscope.setUpdateInterval(100);

        const subscription = Gyroscope.addListener(setData);

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (Math.abs(x) > 2 || Math.abs(y) > 2 || Math.abs(z) > 2) {
            setIsShaking(true);
            playSound();
        } else {
            setIsShaking(false);
        }
    }, [x, y, z]);

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('./BOING.m4a'));
        setSound(sound);
        await sound.playAsync();
    }

    return (
        <View style={styles.container}>
            {isShaking && <Text style={styles.shakeText}>SHAKE</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    shakeText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'red',
    },
});


