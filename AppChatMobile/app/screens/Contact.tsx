import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Contact() {
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedTab, setSelectedTab] = useState("requests");

  useEffect(() => {
    if (selectedTab === "requests") {
      fetchFriendRequests();
    } else {
      fetchFriends();
    }
  }, [selectedTab]);

  const fetchFriendRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const parsedToken = JSON.parse(token);

      const response = await axios.get(
        "http://192.168.1.11:5000/api/friends/requests",
        {
          headers: {
            Authorization: `Bearer ${parsedToken.token}`,
          },
        }
      );

      setRequests(response.data.requests);
    } catch (error) {
      console.error("Lỗi lấy lời mời:", error);
      Alert.alert("Lỗi", "Không thể lấy danh sách lời mời.");
    }
  };

  const fetchFriends = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const parsedToken = JSON.parse(token);

      const response = await axios.get(
        "http://192.168.1.11:5000/api/friends/list",
        {
          headers: {
            Authorization: `Bearer ${parsedToken.token}`,
          },
        }
      );

      setFriends(response.data);
    } catch (error) {
      console.error("Lỗi lấy bạn bè:", error);
      Alert.alert("Lỗi", "Không thể lấy danh sách bạn bè.");
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const parsedToken = JSON.parse(token);

      await axios.post(
        "http://192.168.1.11:5000/api/friends/accept-request",
        { senderId: requestId },
        {
          headers: {
            Authorization: `Bearer ${parsedToken.token}`,
          },
        }
      );

      Alert.alert("Thành công", "Đã chấp nhận lời mời.");
      fetchFriendRequests();
    } catch (error) {
      console.error("Lỗi chấp nhận:", error);
      Alert.alert("Lỗi", "Không thể chấp nhận lời mời.");
    }
  };

  const rejectRequest = async (requestId) => {
    Alert.alert("OK");
    // Implement reject logic if needed
  };

  const renderRequestItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.row}>
        <Image source={{ uri: item.sender.avatar }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.senderName}>{item.sender.name}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#28A745" }]}
              onPress={() => acceptRequest(item.sender._id)}
            >
              <Text style={styles.buttonText}>Chấp nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#DC3545" }]}
              onPress={() => rejectRequest(item.sender._id)}
            >
              <Text style={styles.buttonText}>Từ chối</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const renderFriendItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.row}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.senderName}>{item.name}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "requests" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("requests")}
        >
          <Text style={styles.tabText}>Lời mời</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "friends" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("friends")}
        >
          <Text style={styles.tabText}>Bạn bè</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={selectedTab === "requests" ? requests : friends}
        keyExtractor={(item) => item._id}
        renderItem={selectedTab === "requests" ? renderRequestItem : renderFriendItem}
        ListEmptyComponent={
          <Text style={styles.noRequests}>
            {selectedTab === "requests"
              ? "Không có lời mời nào."
              : "Bạn chưa có bạn bè nào."}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "center",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#eee",
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#007BFF",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  requestItem: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#ccc",
  },
  infoContainer: {
    flex: 1,
  },
  senderName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  noRequests: {
    textAlign: "center",
    color: "#777",
    marginTop: 50,
    fontSize: 16,
  },
});
