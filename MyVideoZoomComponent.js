
// Import necessary modules
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const MyVideoZoomComponent = () => {
  const [username, setUsername] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [joinedUsers, setJoinedUsers] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [meetingForm, setMeetingForm] = useState({
    topic: '',
    duration: '',
    start_date: '',
    start_time: '',
  });

  const [meetingDetails, setMeetingDetails] = useState({
    meeting_id: '',
    meeting_url: '',
  })



  const registerUser = async () => {
    try {
      await axios.post(`${API_BASE_URL}/register`, { username });
      console.log('User registered successfully');
      alert('User: ' + username + ' registered successfully');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  const getRegisteredUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/registered-users`);
      // setRegisteredUsers(response.data);
      setRegisteredUsers(JSON.stringify(response.data));
      console.log('Registered Users:', response.data);
    } catch (error) {
      console.error('Error getting registered users:', error.message);
    }
  };


  const createMeeting = async () => {
    try {
      
      const response = await axios.post(
        `${API_BASE_URL}/users/me/meetings?topic=${meetingForm.topic}&duration=${meetingForm.duration}&start_date=${meetingForm.start_date}&start_time=${meetingForm.start_time}`
      );
  
      setMeetingId(response.data.meeting_id);
      setMeetingDetails({ meeting_id: response.data.meeting_id, meeting_url: response.data.meeting_url });
      console.log('Response:', response.data.meeting_id);
      alert(' Meeting created successfully');
      
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
    
  };
  

  const joinMeeting = async () => {
    const meetingUrl = meetingDetails.meeting_url;
    try {
      // await axios.post(`${API_BASE_URL}/join-meeting/${meetingId}/${username}`);
      window.open(meetingUrl, '_blank');
      console.log('meetingUrl:  ', meetingUrl);
      console.log('User joined meeting successfully');
    } catch (error) {
      console.error('Error joining meeting:', error.message);
    }
  };



  const getJoinedUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/joined-users`);
      setJoinedUsers(JSON.stringify(response.data));
      console.log('Joined Users:', response.data);
    } catch (error) {
      console.error('Error getting joined users:', error.message);
    }
  };

  
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Registration:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button title="Register" onPress={registerUser} />

      <View style={styles.section}>
        <Text style={styles.heading}>Registered Users:</Text>
        <Button title="Get Registered Users" onPress={getRegisteredUsers} />
        <Text>{registeredUsers}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Meeting Details:</Text>
        <TextInput
          style={styles.input}
          placeholder="Topic"
          value={meetingForm.topic}
          onChangeText={(text) => setMeetingForm({ ...meetingForm, topic: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Duration"
          value={meetingForm.duration}
          onChangeText={(text) => setMeetingForm({ ...meetingForm, duration: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Start Date"
          value={meetingForm.start_date}
          onChangeText={(text) => setMeetingForm({ ...meetingForm, start_date: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Start Time"
          value={meetingForm.start_time}
          onChangeText={(text) => setMeetingForm({ ...meetingForm, start_time: text })}
        />
        <Button title="Create Meeting" onPress={createMeeting} />
        <Button title="Join Meeting" onPress={joinMeeting} />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Joined Users:</Text>
        <Button title="Get Joined Users" onPress={getJoinedUsers} />
        <Text>{joinedUsers}</Text>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
});

export default MyVideoZoomComponent;