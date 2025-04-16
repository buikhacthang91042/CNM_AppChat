import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config/config";

const UserProfileScreen = ({ route }) => {
  const { user } = route.params;
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isSelf, setIsSelf] = useState(false);

  useEffect(() => {
    checkCurrentUser();
    checkFriendStatus();
    checkRequestStatus();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Không tìm thấy token');
      const parsedToken = JSON.parse(token);
      console.log('Token structure:', parsedToken); // Debug

      // Giải mã JWT payload
      const base64Url = parsedToken.token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      const currentUserId = payload.userId || payload._id || payload.sub || payload.id || payload.user_id;
      if (!currentUserId) throw new Error('Không tìm thấy ID người dùng trong token');

      setIsSelf(currentUserId === user.id);
    } catch (error) {
      console.error('Lỗi kiểm tra người dùng hiện tại:', error.message);
      Alert.alert('Lỗi', 'Không thể xác định người dùng hiện tại.');
    }
  };

  const checkFriendStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Không tìm thấy token');
      const parsedToken = JSON.parse(token);

      const response = await axios.get(`${BASE_URL}/api/friends/list`, {
        headers: { Authorization: `Bearer ${parsedToken.token}` },
      });

      const friends = response.data;
      const isAlreadyFriend = friends.some((friend) => friend._id === user.id);
      setIsFriend(isAlreadyFriend);
    } catch (error) {
      console.error('Lỗi kiểm tra trạng thái bạn bè:', error.message);
      Alert.alert('Lỗi', 'Không thể kiểm tra trạng thái bạn bè.');
    }
  };

  const checkRequestStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Không tìm thấy token');
      const parsedToken = JSON.parse(token);

      const response = await axios.get(`${BASE_URL}/api/friends/sent-requests`, {
        headers: { Authorization: `Bearer ${parsedToken.token}` },
      });

      const sentRequests = response.data.requests;
      const isRequestPending = sentRequests.some(
        (request) => request.userId2._id === user.id
      );
      setIsRequestSent(isRequestPending);
    } catch (error) {
      console.error('Lỗi kiểm tra trạng thái lời mời:', error.message);
      Alert.alert('Lỗi', 'Không thể kiểm tra trạng thái lời mời.');
    }
  };

  const sendFriendRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Không tìm thấy token');
      const parsedToken = JSON.parse(token);

      // Giải mã JWT payload
      const base64Url = parsedToken.token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      const currentUserId = payload.userId || payload._id || payload.sub || payload.id || payload.user_id;
      if (!currentUserId) throw new Error('Không tìm thấy ID người dùng trong token');

      if (currentUserId === user.id) {
        Alert.alert('Thông báo', 'Không thể kết bạn với chính mình.');
        return;
      }

      await axios.post(
        `${BASE_URL}/api/friends/send-request`,
        { receiverId: user.id },
        { headers: { Authorization: `Bearer ${parsedToken.token}` } }
      );

      setIsRequestSent(true);
      Alert.alert('Thành công', 'Đã gửi lời mời kết bạn.');
    } catch (error) {
      console.error('Lỗi gửi lời mời:', error.response?.data);
      const message = error.response?.data?.message || 'Không thể gửi lời mời kết bạn.';
      Alert.alert('Thất bại', message);
    }
  };

  const cancelFriendRequest = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Không tìm thấy token');
      const parsedToken = JSON.parse(token);

      await axios.post(
        `${BASE_URL}/api/friends/cancel-request`,
        { receiverId: user.id },
        { headers: { Authorization: `Bearer ${parsedToken.token}` } }
      );

      setIsRequestSent(false);
      Alert.alert('Đã hủy', 'Lời mời kết bạn đã được hủy.');
    } catch (error) {
      console.error('Lỗi hủy lời mời:', error);
      Alert.alert('Thất bại', 'Không thể hủy lời mời kết bạn.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang cá nhân</Text>
      <Image
        source={{ uri: user.avatar || 'https://via.placeholder.com/120' }}
        style={styles.avatar}
      />
      <Text style={styles.info}>Tên: {user.name}</Text>
      <Text style={styles.info}>SĐT: {user.phone}</Text>
      <Text>Ngày sinh: {user.dob}</Text>

      {isSelf ? (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#6C757D' }]} disabled>
          <Text style={styles.buttonText}>Đây là bạn</Text>
        </TouchableOpacity>
      ) : isFriend ? (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#6C757D' }]} disabled>
          <Text style={styles.buttonText}>Đã là bạn bè</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isRequestSent ? '#DC3545' : '#28A745' }]}
          onPress={isRequestSent ? cancelFriendRequest : sendFriendRequest}
        >
          <Text style={styles.buttonText}>
            {isRequestSent ? 'Hủy lời mời kết bạn' : 'Gửi lời mời kết bạn'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    padding: 14,
    marginTop: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 17,
  },
});