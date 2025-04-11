import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ActionSheet from "react-native-actions-sheet";
import { useNavigation } from '@react-navigation/native';
const mockChats = [
  {
    id: "1",
    name: "Hùng",
    lastMessage: "Chào bạn!",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Lan",
    lastMessage: "Khi nào đi ăn?",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Tú",
    lastMessage: "Gặp sau nha",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const actionSheetRef = useRef(null);
  const navigation = useNavigation();
  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: "#f0f0f0",
      }}
    >
      <Image
        source={{ uri: item.avatar }}
        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#222" }}>
          {item.name}
        </Text>
        <Text style={{ color: "#666", marginTop: 2 }}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const handleOptionPress = (option) => {
    if (option === 'addFriend') {
      navigation.navigate('AddFriend');
    } else if (option === 'createGroup') {
      alert('Tính năng Tạo nhóm đang phát triển...');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderColor: "#eee",
          marginTop: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#f0f0f0",
            borderRadius: 25,
            paddingHorizontal: 15,
            alignItems: "center",
            marginRight: 10,
            height: 40,
          }}
        >
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput
            placeholder="Tìm kiếm"
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 15,
              color: "#333",
            }}
          />
        </View>

        <TouchableOpacity
          onPress={openActionSheet}
          style={{
            backgroundColor: "#007AFF",
            borderRadius: 50,
            padding: 8,
          }}
        >
          <Ionicons name="person-add-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Danh sách chat */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
      />
      <ActionSheet ref={actionSheetRef}>
        <TouchableOpacity
          style={{ padding: 16 }}
          onPress={() => handleOptionPress("addFriend")}
        >
          <Text style={{ fontSize: 16 }}>➕ Thêm bạn mới</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 16 }}
          onPress={() => handleOptionPress('createGroup')}
        >
          <Text style={{ fontSize: 16 }}>👥 Tạo nhóm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 16 }}
          onPress={() => actionSheetRef.current?.hide()}
        >
          <Text style={{ fontSize: 16, color: 'red' }}>Hủy</Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
}
