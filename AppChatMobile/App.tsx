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
      try {
        console.log(" Lời mời kết bạn mới:", data);
        console.log(data.request.userId1.name);
        
        Alert.alert(
          "📩 Lời mời kết bạn mới",
          `Bạn nhận được lời mời kết bạn từ ${data.request.userId1.name}`
        );
      } catch (error) {
        console.error('Lỗi hiển thị thông báo:', error);
      }
    });

    socket.on('friend_request_accepted', (data) => {
      console.log(" Lời mời kết bạn đã được chấp nhận:", data);
      Alert.alert(
        "✅ Kết bạn thành công",
        `${data.receiver.name} đã chấp nhận lời mời kết bạn của bạn!`
      );
    });

    socket.on('friend_request_rejected', (data) => {
      console.log(" Lời mời kết bạn đã bị từ chối:", data);
      Alert.alert(
        "❌ Lời mời bị từ chối",
        `${data.receiver.name} đã từ chối lời mời kết bạn của bạn.`
      );
    });

    return () => {
      socket.off('new_friend_request');
      socket.off('friend_request_accepted');
      socket.off('friend_request_rejected');
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