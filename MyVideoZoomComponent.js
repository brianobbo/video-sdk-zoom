
// Import necessary modules
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const MyVideoZoomComponent = () => {
  const [username, setUsername] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [meetingId, setMeetingId] = useState('');

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
      setRegisteredUsers(response.data);
      console.log('Registered Users:', response.data);
    } catch (error) {
      console.error('Error getting registered users:', error.message);
    }
  };

  const createMeeting = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/me/meetings?topic=test1&duration=5&start_date=2023-12-25&start_time=11%3A00`
      );
      setMeetingId(response.data.id);
      console.log('Meeting created successfully');
      alert(' Meeting created successfully');
    } catch (error) {
      console.error('Error creating meeting:', error.message);
    }
  };

  const joinMeeting = async () => {
    try {
      await axios.post(`${API_BASE_URL}/join-meeting/${meetingId}/${username}`);
      console.log('User joined meeting successfully');
    } catch (error) {
      console.error('Error joining meeting:', error.message);
    }
  };
  // const joinMeeting = async () => {
  //   const meetingUrl = 'https://us05web.zoom.us/j/87081352910?pwd=NWJb3SiVP2xIfhGv7KpfAlWNsKQq1N.1';
  //   try {
  //     await axios.post(`${API_BASE_URL}/join-meeting/${meetingId}/${username}`);
  //     window.open(meetingUrl, '_blank');
  //     console.log('User joined meeting successfully');
  //   } catch (error) {
  //     console.error('Error joining meeting:', error.message);
  //   }
  // };



//   const getJoinedUsers = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/joined-users`);
//       console.log('Joined Users:', response.data);
//     } catch (error) {
//       console.error('Error getting joined users:', error.message);
//     }
//   };

  return (
    <View>
      <Text>Username:</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      /><br/>
      <Button title="Register" onPress={registerUser} /><br/><br/>


      <Button title="Get Registered Users" onPress={getRegisteredUsers} />
      <Text>Registered Users:</Text><br/><br/>
      <FlatList
        data={registeredUsers}
        keyExtractor={(item) => item.username}
        // keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <Text>{item.username}</Text>}
      /><br/><br/>
      

      <Button title="Create Meeting" onPress={createMeeting} /><br/>
      <Button title="Join Meeting" onPress={joinMeeting} /><br/>
      <Button title="Get Joined Users" onPress={/*getJoinedUsers*/ null} /><br/>
      {/* <Button title="Create Meeting" /><br/>
      <Button title="Join Meeting" /><br/>
      <Button title="Get Joined Users" /> */}
    </View>
  );
};

export default MyVideoZoomComponent;