import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation';
import socket from './app/config/socket';
import { RegisterProvider } from "./app/context/RegisterContext";
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    socket.on('new_friend_request', (data) => {
      console.log(" Lời mời kết bạn mới:", data);
      Alert.alert(
        "📩 Lời mời kết bạn mới",
        `Bạn nhận được lời mời kết bạn từ ${data.request.sender.name}`
      );
    });

    socket.on('friend_request_accepted', (data) => {
      console.log(" Lời mời kết bạn đã được chấp nhận:", data);
      Alert.alert(
        "✅ Kết bạn thành công",
        `${data.receiver.name} đã chấp nhận lời mời kết bạn của bạn!`
      );
    });

    return () => {
      socket.off('new_friend_request');
      socket.off('friend_request_accepted');
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
       <RegisterProvider>
      <StatusBar style="auto" />
      <Navigation />
      </RegisterProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
