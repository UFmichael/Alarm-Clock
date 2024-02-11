import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { textStyles, styles } from '../styles/styles';
import SoundPlayer from 'react-native-sound-player'
// import Sound from 'react-native-sound';
// import { stream } from 'youtube-audio-stream';
// import {} from 'youtube-audio-stream'
// import playSound from 'play-sound';
// import { PlaybackMixin } from 'expo-av/build/AV';
// import audioPlay from 'audio-play';
// import { play } from 'audio-play';
// import { load } from 'audio-loader';
// import { playAudioFile } from 'audic';
// import { Sound } from 'expo-av/build/Audio';
// import { fs } from 'fs';
// import {Speaker} from 'node-speaker';
import { Audio, Video } from 'expo-av';
// import {playAudioFile} from 'audic';

// const play = require('audio-play');
// const loader = require('audio-loader');

// const stream = require('youtube-audio-stream')

// Sound.setCategory('Playback');
// var ding = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
//   if (error) {
//     console.log('failed to load the sound', error);
//     return;
//   }
//   // when loaded successfully
//   // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
// });

// async function handleView (req, res) {
//   try {
//     for await (const chunk of stream(`http://youtube.com/watch?v=iNpXCzaWW1s`)) {
//       res.write(chunk)
//     }
//     res.end()
//   } catch (err) {
//     console.error(err)
//     if (!res.headersSent) {
//       res.writeHead(500)
//       res.end('internal system error')
//     }
//   }
// }



function AlarmClock() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [alarmTime, setAlarmTime] = useState(null);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [countdown, setCountdown] = useState('');

  // Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  // const playbackObject = new Audio.Sound('alarm.mp3');
  

  // const stream = require('youtube-audio-stream');
  // const url = 'https://www.youtube.com/watch?v=iNpXCzaWW1s';
  // const decoder = require('lame').Decoder;
  // const speaker = require('speaker');

// stream(url)
// .pipe(decoder())
// .pipe(speaker())
  // var fs = require('fs');

  // playSound = () => {
  //   async () => {
  //     // // playAudioFile('alarm.mp3');
  //     // const playbackObj = new Audio.Sound('alarm.mp3');
  //     // playbackObj.loadAsync('alarm.mp3');
  //     // playbackObj.playAsync();
  //   }
  // }

  // Audio.setAudioModeAsync({
  //   allowsRecordingIOS: false,
  //   playsInSilentModeIOS: true,
  //   shouldDuckAndroid: true,
  //   staysActiveInBackground: true,
  //   playsThroughEarpieceAndroid: true
  // })
  

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setAlarmTime(date);
    setIsAlarmSet(true);

    // Set a timeout to trigger the alarme
    const currentTime = new Date();
    const timeUntilAlarm = date - currentTime;
    setTimeout(() => {
      alert('Wake up!');
    
      // playbackObject.playAsync();

      // ding.setVolume(1);
      // ding.play(success => {
      //   if (success) {
      //     console.log('successfully finished playing');
      //   } else {
      //     console.log('playback failed due to audio decoding errors');
      //   }
      // });
      // handleView();
      // stream(url)
      //   .pipe(decoder())
      //   .pipe(speaker())
      // playAudioFile('alarm.mp3');

      // playSound;

      // var audio = new Audio('alarm.mp3');
      // audio.play();
      // playSound();
      // const playbackObj = new Audio.Sound();
      // playbackObj.loadAsync('alarm.mp3');
      // playbackObj.playAsync();

      // const Speaker = require('speaker');
      try {
          SoundPlayer.playUrl('https://example.com/music.mp3')
      } catch (e) {
          console.log(`cannot play the sound file`, e)
      }

      setIsAlarmSet(false);
      setCountdown('');
    }, timeUntilAlarm);

    // Start updating the countdown every second
    const intervalId = setInterval(() => {
      const remainingTime = date - new Date();
      if (remainingTime <= 0) {
        clearInterval(intervalId);
        setCountdown('');
      } else {
        const minutes = Math.floor(remainingTime / 60000);
        const formatMinutes = String(minutes).padStart(2, '0');
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        const formatSeconds = String(seconds).padStart(2, '0');
        setCountdown(`${formatMinutes} min : ${formatSeconds} sec`);
      }
    }, 1000);

    hideDatePicker();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Alarm Status: {isAlarmSet ? 'Set' : 'Not Set'}</Text>
      {isAlarmSet && <Text>Time Left: {countdown}</Text>}
      <TouchableOpacity onPress={showDatePicker} style={styles.button}>
        <Text style={textStyles.buttonText}>Set Alarm Date</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={showTimePicker} style={styles.button}>
        <Text style={textStyles.buttonText}>Set Alarm Time</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        textColor="black"
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        textColor="black"
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
}

export default AlarmClock;
