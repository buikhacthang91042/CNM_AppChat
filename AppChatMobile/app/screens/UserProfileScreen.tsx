import React, { useState } from "react";
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

const UserProfileScreen = ({ route }) => {
  const { user } = route.params;

  const [isRequestSent, setIsRequestSent] = useState(false);

  const sendFriendRequest = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const parsedToken = JSON.parse(token);
      console.log("Receiver ID:", user.id);
  
      await axios.post(
        "http://192.168.1.11:5000/api/friends/send-request",
        { receiverId: user.id },
        {
          headers: {
            Authorization: `Bearer ${parsedToken.token}`,
          },
        }
      );
  
      setIsRequestSent(true);
      Alert.alert("Thành công", "Đã gửi lời mời kết bạn.");
    } catch (error) {
      console.error("Lỗi gửi lời mời:", error);
  
      const message =
        error.response?.data?.message || "Không thể gửi lời mời kết bạn.";
      Alert.alert("Thất bại", message);
    }
  };
  

  const cancelFriendRequest = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const parsedToken = JSON.parse(token);
      console.log("Receiver ID:", user.id);

      await axios.post(
        "http://192.168.1.11:5000/api/friends/cancel-request",
        { receiverId: user.id }, 
        {
          headers: {
            Authorization: `Bearer ${parsedToken.token}`,
          },
        }
      );

      setIsRequestSent(false);
      Alert.alert("Đã hủy", "Lời mời kết bạn đã được hủy.");
    } catch (error) {
      console.error("Lỗi hủy lời mời:", error);
      Alert.alert("Thất bại", "Không thể hủy lời mời kết bạn.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang cá nhân</Text>
      <Image source={{ uri: user.avatar || "https://via.placeholder.com/120"}} style={styles.avatar} />
      <Text style={styles.info}>Tên: {user.name}</Text>
      <Text style={styles.info}>SĐT: {user.phone}</Text>
      <Text>Ngày sinh: {user.dob}</Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isRequestSent ? "#DC3545" : "#28A745" },
        ]}
        onPress={isRequestSent ? cancelFriendRequest : sendFriendRequest}
      >
        <Text style={styles.buttonText}>
          {isRequestSent ? "Hủy lời mời kết bạn" : "Gửi lời mời kết bạn"}
        </Text>
      </TouchableOpacity>
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
