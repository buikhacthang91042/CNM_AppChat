import React, { useEffect, useState,useCallback   } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const CLOUDINARY_UPLOAD_PRESET = "ml_default";
const CLOUDINARY_CLOUD_NAME = "dbjqhaayj";
const CLOUDINARY_API =
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const AccountScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    avatar: "",
  });

  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const parsedToken = JSON.parse(token);
          if (!parsedToken) return;
  
          const response = await axios.get(
            "http://192.168.1.11:3000/api/auth/check",
            {
              headers: {
                Authorization: `Bearer ${parsedToken.token}`,
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          console.error("Error fetching user info:", error.message);
        }
      };
  
      fetchUserInfo();
    }, [])
  );
  

  const pickImageAndUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        const image = result.assets[0];
        const formData = new FormData();
        const localUri = image.uri;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const fileType = match ? `image/${match[1]}` : `image`;
        formData.append("file", {
          uri: image.uri,
          type: fileType,
          name: "avatar.jpg",
        });
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        const uploadRes = await axios.post(CLOUDINARY_API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const imageUrl = uploadRes.data.secure_url;

        const token = await AsyncStorage.getItem("token");
        const parsedToken = JSON.parse(token);
        await axios.put(
          "http://192.168.1.11:5000/api/auth/me/update",
          { avatar: imageUrl },
          {
            headers: { Authorization: `Bearer ${parsedToken.token}` },
          }
        );
        setUserInfo((prev) => ({ ...prev, avatar: imageUrl }));
      }
    } catch (error) {
      console.error("Upload ảnh lỗi:", error.message);
      if (error.response) {
        console.log("Chi tiết lỗi:", error.response.data);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImageAndUpload}>
            <Image
              source={
                userInfo.avatar
                  ? { uri: userInfo.avatar }
                  : require("../../assets/adaptive-icon.png")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Text style={styles.name}>{userInfo.name}</Text>
            <Text style={styles.info}> {userInfo.email}</Text>
            <Text style={styles.info}> {userInfo.phone}</Text>
            <Text style={styles.info}> {userInfo.gender}</Text>
            <Text style={styles.info}> {userInfo.dob}</Text>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditProfileScreen",{ userInfo })}
          >
            <MaterialIcons name="edit" size={24} color="#FFA500" />
            <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="#FF6347" />
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0D0D0D", // giữ màu nền khi dùng SafeAreaView
  },
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  profileSection: {
    flexDirection: "row",
    padding: 30,
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "#FFA500",
    borderWidth: 3,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 3,
  },
  buttonSection: {
    padding: 20,
    gap: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#FFA500",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AccountScreen;
