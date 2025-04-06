import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function MatchNotification() {
  const [isModalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();
  const handleCloseModal = () => {
    
    navigation.navigate('DetailProfile');
  };

  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Profile Picture */}
            <Image
              source={{
                uri: "https://picsum.photos/200", // Thay link avatar thật
              }}
              style={styles.profileImage}
            />

            {/* Match Text */}
            <Text style={styles.matchTitle}>New match found!</Text>
            <Text style={styles.matchSubtitle}>
              Someone you swiped right on has also swiped right on you.
            </Text>

            {/* View Profile Button */}
            <TouchableOpacity style={styles.viewProfileButton} onPress={handleCloseModal}>
              <Text style={styles.viewProfileButtonText}>View profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  matchTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  matchSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
  },
  viewProfileButton: {
    marginTop: 15,
    backgroundColor: "#00bfff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  viewProfileButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
