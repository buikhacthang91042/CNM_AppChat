import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  Entypo,
  Ionicons,
  Feather,
} from "@expo/vector-icons";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.videoIcon}>
              <FontAwesome name="video-camera" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <Entypo name="dots-three-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>
              Ava Jones, 25{" "}
              <FontAwesome name="check-circle" size={16} color="#00BDD5" />
            </Text>
            <Text style={styles.pronouns}>she/ her/ hers</Text>
            <Text style={styles.jobTitle}>Business Analyst at Tech</Text>
          </View>
        </View>
      </View>

      {/* Chat Content */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <Text style={styles.dateText}>Today</Text>
        <View style={styles.messageContainer}>
          <Text style={styles.messageTime}>08:42 PM</Text>
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>Hi there!</Text>
          </View>
          <Text style={styles.messageStatus}>Sent</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {/* Invite Section */}
        <View style={styles.inviteContainer}>
          <Text style={styles.inviteText}>
            <MaterialIcons name="lightbulb" size={16} color="#00BDD5" /> Invite
            your match to play a mini-game.
          </Text>
          <Text style={styles.inviteSubText}>
            Break the ice and find out if you both sync on a deeper level.
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputRow}>
          <TextInput placeholder="Type a message..." style={styles.input} />
          <TouchableOpacity style={styles.smileIcon}>
            <FontAwesome name="smile-o" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Icons Row and Send Button */}
        <View style={styles.bottomRow}>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconSpacing}>
              <FontAwesome name="globe" size={24} color="#00BDD5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSpacing}>
              <MaterialIcons name="lightbulb" size={24} color="#00BDD5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSpacing}>
              <FontAwesome name="image" size={24} color="#00BDD5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSpacing}>
              <FontAwesome name="camera" size={24} color="#00BDD5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconSpacing}>
              <Feather name="mic" size={24} color="#00BDD5" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={28} color="#00BDD5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  videoIcon: {
    marginLeft: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pronouns: {
    fontSize: 12,
    color: "#00BDD5",
    backgroundColor: "#e0f7fa",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4, 
    marginBottom: 4,
  },
  
  jobTitle: {
    fontSize: 12,
    color: "gray",
  },
  chatContainer: {
    padding: 16,
  },
  dateText: {
    textAlign: "center",
    color: "gray",
    marginBottom: 16,
  },
  messageContainer: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  messageBubble: {
    backgroundColor: "#00BDD5",
    padding: 12,
    borderRadius: 8,
    maxWidth: "80%",
    marginBottom: 8,
    marginTop: 8,
  },
  messageText: {
    color: "white",
  },
  messageTime: {
    color: "gray",
    fontSize: 12,
    marginTop: 4,
  },
  messageStatus: {
    color: "gray",
    fontSize: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    padding: 16,
    backgroundColor: "white",
  },
  inviteContainer: {
    backgroundColor: "#e0f7fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  inviteText: {
    color: "#00BDD5",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  inviteSubText: {
    color: "gray",
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 24,
    marginRight: 8,
  },
  smileIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSpacing: {
    marginHorizontal: 12,
  },
  sendButton: {
    padding: 12,
    borderRadius: 24,
    backgroundColor: "#e0f7fa",
    alignSelf: "flex-end",
  },
});
