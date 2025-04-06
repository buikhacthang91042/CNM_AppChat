import React from 'react';
import { View, Text, FlatList, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
const App = () => {
  const matches = [
    { id: 1, name: 'Maria White', image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067612742524_dbbf0002ec38cdb0b01d67d750e23e18_lajc8b.jpg' },
    { id: 2, name: 'Anna Fernandez', image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067659973346_8b4cbaa3f3e8f8fc9b51924da4b2b0ea_clfvut.jpg' },
    { id: 3, name: 'Jennifer Brown', image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067630238749_e4294c7283ca9ec3442f7810c1b69611_vnnbuf.jpg' },
    { id: 4, name: 'Charlie Green', image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067642776282_f231577bf24ab7dfe6655ab62adb4bd9_jkqhnz.jpg' },
  ];

  const chats = [
    {
      id: 1,
      name: 'Ava Jones',
      image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067630238749_e4294c7283ca9ec3442f7810c1b69611_vnnbuf.jpg',
      message: 'You: Hello!',
      time: '11 hour ago',
    },
    {
      id: 2,
      name: 'Jennifer Brown',
      image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067630238749_e4294c7283ca9ec3442f7810c1b69611_vnnbuf.jpg',
      message: 'You: Truong Trong Treo!',
      time: '17 hour ago',
    },
    {
      id: 3,
      name: 'Charlie Green',
      image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067630238749_e4294c7283ca9ec3442f7810c1b69611_vnnbuf.jpg',
      message: 'You: Hello!',
      time: '3 hour ago',
    },
    {
      id: 4,
      name: 'Le Viet Nguyen Hung',
      image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067630238749_e4294c7283ca9ec3442f7810c1b69611_vnnbuf.jpg',
      message: 'You: Hello!',
      time: '23 hour ago',
    },
    {
      id: 5,
      name: 'Maria White',
      image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067630238749_e4294c7283ca9ec3442f7810c1b69611_vnnbuf.jpg',
      message: 'You: Hung dep trai!',
      time: '14 hour ago',
    },
    {
      id: 6,
      name: 'Ngo Quang Truong',
      image: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067630238749_e4294c7283ca9ec3442f7810c1b69611_vnnbuf.jpg',
      message: 'You: Hi!',
      time: '1 hour ago',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="bars" size={24} color="black" />
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>

      {/* Matches */}
      <Text style={styles.sectionTitle}>Matches (7)</Text>
      <FlatList
        horizontal
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <Image source={{ uri: item.image }} style={styles.matchImage} />
            <Text style={styles.matchName}>{item.name}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Chats */}
      <Text style={styles.sectionTitle}>Chats (6)</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <Image source={{ uri: item.image }} style={styles.chatImage} />
            <View style={styles.chatTextContainer}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
            <Text style={styles.chatTime}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
            <FontAwesome name="user" size={24} color="gray" />
            <FontAwesome name="heart" size={24} color="skyblue" />
            <FontAwesome name="bookmark" size={24} color="gray" />
            <TouchableOpacity>
            <FontAwesome name="user" size={24} color="gray" />
            </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  matchItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  matchImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  matchName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
    marginBottom: 10,
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatTextContainer: {
    flex: 1,
  },
  chatName: {
    fontWeight: 'bold',
  },
  chatMessage: {
    color: '#666',
  },
  chatTime: {
    fontSize: 12,
    color: '#aaa',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#ffffff",
  },
});

export default App;
