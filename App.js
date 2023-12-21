import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyVideoZoomComponent from './MyVideoZoomComponent';
import ScheduleMeeting from './ScheduleMeeting';
import MeetingComponent from './MeetingComponent';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}


      <MyVideoZoomComponent />
      {/* <ScheduleMeeting/> */}
      {/* <MeetingComponent/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



