import React,{useState, useEffect} from 'react';
import {StatusBar, Button, StyleSheet, Text, View} from 'react-native';
import {Sound} from "expo-av/build/Audio/Sound";

import { Audio } from 'expo-av';

const styles = StyleSheet.create({
  container: {

  },
});


export default function App() {

  async function playSound() {
      const soundfile = require('./short1.wav');
      const {sound} = await Audio.Sound.createAsync(soundfile);
      setMySound(sound);
      await Sound.playAsync();
  }

  useEffect(() => {
      return mySound
      ? () => {
          console.log('Unloading Sound');
          mySound.unloadAsync();
          }
          :undefined;
  }, [mySound]);

  return (
    <View>
      <StatusBar />
      <Button title="Play Sound" onPress={
      ()=>{

      }}
      />
    </View>
  );
}


