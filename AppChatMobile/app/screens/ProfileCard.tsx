import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function ProfileCard() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="bars" size={24} color="black" />
            <View style={{ paddingHorizontal: 10 }}></View>
            <FontAwesome name="refresh" size={24} color="black" />
          </View>

          <Text style={styles.title}>HeartSync</Text>
          <FontAwesome name="sliders" size={24} color="black" />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>

        {/* Profile Card */}
        <ImageBackground
          source={{
            uri: "https://fastly.picsum.photos/id/978/200/300.jpg?hmac=sP2_huC-v5a6cNxpdmxp1FPInoDET7j7O3GoftdaEJk",
          }}
          style={styles.cardBackground}
        >
          <View style={styles.info}>
            <Text style={styles.name}>
              Ava Jones, 25{" "}
              <FontAwesome name="check-circle" size={16} color="#00bfff" />
            </Text>
            <View style={styles.pronounsContainer}>
              <Text style={styles.pronouns}>she/her/hers</Text>
            </View>
            <Text style={styles.job}> Analyst at Tech</Text>
          </View>
        </ImageBackground>
        <View style={styles.footer}>
          <FontAwesome name="user" size={24} color="gray" />
          <FontAwesome name="heart" size={24} color="#1DA1F2" />
          <FontAwesome name="bookmark" size={24} color="gray" />
          <Ionicons name="send" size={24} color="gray" onPress={() => navigation.navigate("ChatScreen")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
    marginTop: 30,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    left: -15,
    fontSize: 20,
    fontWeight: "bold",
  },
  progressBar: {
    height: 7,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginTop: 10,
    width: "50%",
    alignSelf: "center",
  },
  progress: {
    height: "100%",
    width: "50%",
    backgroundColor: "#00bfff",
    borderRadius: 2,
  },
  cardBackground: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    height: 620,
    width: 372,
  },
  info: {
    position: "absolute",
    bottom: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 10,
  },
  pronounsContainer: {
    backgroundColor: "#00bfff", // Background color for the pronouns box
    marginVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20, // Border radius for the pronouns box
    marginBottom: 10,
  },
  pronouns: {
    fontSize: 14,
    color: "#ffffff", // Text color inside the pronouns box
  },
  job: {
    fontSize: 14,
    color: "#dcdcdc",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
});
