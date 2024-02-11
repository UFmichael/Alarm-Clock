import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { textStyles, styles } from '../styles/styles';
import { Audio } from 'expo-av';

function AlarmClock() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [alarmTime, setAlarmTime] = useState(null);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [countdown, setCountdown] = useState('');

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = Audio.Sound.createAsync('alarm.mp3');
    setSound(sound);

    await sound.playAsync();

    sound.unloadAsync();
  }

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    staysActiveInBackground: true,
    playsThroughEarpieceAndroid: true
  })
  

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
      
      playSound();
      
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
