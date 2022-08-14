import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const tracks =[
  {
    title: 'death bed',
    artist: 'Powfu',
    artwork: require('../assets/album-arts/death-bed.jpg'),
    url: 'https://sample-music.netlify.app/death%20bed.mp3',
    duration: 2 * 60 + 53,
    id: '1',
  },
  {
    title: 'bad liar',
    artist: 'Imagine Dragons',
    artwork: require('../assets/album-arts/bad-liar.jpg'),
    url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
    duration: 2 * 60,
    id: '2',
  },
  {
    title: 'faded',
    artist: 'Alan Walker',
    artwork: require('../assets/album-arts/faded.jpg'),
    url: 'https://sample-music.netlify.app/Faded.mp3',
    duration: 2 * 60,
    id: '3',
  },
  {
    title: 'hate me',
    artist: 'Ellie Goulding',
    artwork: require('../assets/album-arts/hate-me.jpg'),
    url: 'https://sample-music.netlify.app/Hate%20Me.mp3',
    duration: 2 * 60,
    id: '4',
  },
  {
    title: 'Solo',
    artist: 'Clean Bandit',
    artwork: require('../assets/album-arts/solo.jpg'),
    url: 'https://sample-music.netlify.app/Solo.mp3',
    duration: 2 * 60,
    id: '5',
  },
  {
    title: 'without me',
    artist: 'Halsey',
    artwork: require('../assets/album-arts/without-me.jpg'),
    url: 'https://sample-music.netlify.app/Without%20Me.mp3',
    duration: 2 * 60,
    id: '6',
  },
];

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
  ],
});

const Player = () => {
  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
      console.log('Tracks added');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUpTrackPlayer();

    return () => TrackPlayer.destroy();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.pause()}>
          <Text style={styles.text}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => TrackPlayer.play()}>
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={styles.text}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.skipToNext()}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btn: {
    backgroundColor: '#ff0044',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default Player;