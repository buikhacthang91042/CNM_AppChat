import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "../config/socket";

export default function ChatScreen({ route }) {
  const { chatId, receiverId, name, currentUserId } = route.params;
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const flatListRef = useRef(null); 
  useEffect(() => {
    fetchMessages();

    socket.on("new_message", (data) => {
        if (data.message.chatId === chatId) {
          setMessages((prev) => {
            
            if (prev.some((msg) => msg.messageId === data.message.messageId)) {
              return prev;
            }
            const updatedMessages = [...prev, data.message];
            const sortedMessages = updatedMessages.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            flatListRef.current?.scrollToEnd({ animated: true });
            return sortedMessages;
          });
        }
      });

    return () => {
      socket.off("new_message");
    };
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Không tìm thấy token");
      const parsedToken = JSON.parse(token);

      const response = await axios.get(
        `http://192.168.1.11:3000/api/chat/messages/${chatId}`,
        {
          headers: { Authorization: `Bearer ${parsedToken.token}` },
        }
      );

      // Sắp xếp tin nhắn từ API theo createdAt
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.error("Lỗi lấy tin nhắn:", error);
      Alert.alert("Lỗi", "Không thể tải tin nhắn.");
    }
  };

  const sendMessage = async () => {
    if (!content.trim()) return;

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("Không tìm thấy token");
      const parsedToken = JSON.parse(token);

      console.log("Sending message with data:", { chatId, content, receiverId });

      await axios.post(
        "http://192.168.1.11:3000/api/chat/send",
        { chatId, content, receiverId },
        {
          headers: { Authorization: `Bearer ${parsedToken.token}` },
        }
      );

      setContent("");
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error.response?.data);
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Không thể gửi tin nhắn."
      );
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={{
        marginBottom: 10,
        alignSelf:
          item.senderId._id === currentUserId ? "flex-end" : "flex-start",
        backgroundColor:
          item.senderId._id === currentUserId ? "#007AFF" : "#f0f0f0",
        padding: 10,
        borderRadius: 10,
        maxWidth: "70%",
      }}
    >
      <Text
        style={{
          color: item.senderId._id === currentUserId ? "#fff" : "#333",
        }}
      >
        {item.content}
      </Text>
      <Text
        style={{
          fontSize: 10,
          color: item.senderId._id === currentUserId ? "#ddd" : "#888",
          marginTop: 5,
        }}
      >
        {new Date(item.createdAt).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.messageId}
        renderItem={renderMessage}
        style={styles.messageList}
        inverted // Tin nhắn mới nhất ở dưới cùng
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
        />
        <Button title="Gửi" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    textAlign: "center",
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
});