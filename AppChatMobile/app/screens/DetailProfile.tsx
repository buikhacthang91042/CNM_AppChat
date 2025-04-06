import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
export default function DetailProfile() {
  const navigation = useNavigation();
  const details = [
    { text: "5'6\"(168 cm)", color: "#e0f7fa" },
    { text: "Non-smoker", color: "#e8f5e9" },
    { text: "Cat lover", color: "#e3f2fd" },
    { text: "Master degree", color: "#ede7f6" },
    { text: "Want two", color: "#fff3e0" },
    { text: "Ocaasionally", color: "#ffebee" },
    { text: "Virgo", color: "#e3f2fd" },
    { text: "Relationship/Friendship", color: "#fce4ec" },
    { text: "No religious affiliation", color: "#e8eaf6" },
  ];
  const enjoys = [
    { text: "Classical Music & Art" },
    { text: "Thriller Films" },
    { text: "Nature" },
    { text: "Baking" },
    { text: "Asian Food" },
    { text: "Mathematics & Technology" },
  ];
  const languages = [
    { text: "English (Native)" },
    { text: "Spanish (Fluent)" },
    { text: "Tagalog (Verbal)" },
    { text: "Mandarin Chinese (Verbal)" },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.header}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="bars" size={24} color="black" />
            <View style={{ paddingHorizontal: 10 }}></View>
            <FontAwesome name="refresh" size={24} color="black" />
          </View>

          <Text style={styles.title}>HeartSync</Text>
          <FontAwesome name="sliders" size={24} color="black" />
        </View>

        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>

        <ImageBackground
          source={{
            uri: "https://fastly.picsum.photos/id/978/200/300.jpg?hmac=sP2_huC-v5a6cNxpdmxp1FPInoDET7j7O3GoftdaEJk",
          }} // URL ảnh profile
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
            <Text style={styles.job}>Business Analyst at Tech</Text>
          </View>
        </ImageBackground>
        {/* distance */}
        <View style={styles.addressWrapper}>
          <View style={styles.distanceWrapper}>
            <FontAwesome name="location-arrow" size={24} color="red" />
            <Text style={styles.distanceText}>2.0 kilometres away</Text>
          </View>
          <Text style={styles.addressText}>Las Vegas, NV 89104</Text>
        </View>
        {/* about me */}
        <View style={styles.infoWrapper}>
          <Text style={styles.titleText}>About me</Text>
          <Text
            style={{
              fontSize: 15,
              color: "#767A83",
            }}
          >
            It would be wonderful to meet someone who {"\n"}
            appreciates the arts and enjoys exploring the vibrant {"\n"}
            culture of the city. I value open-mindedness, good {"\n"}
            communication, and a shared passion for classical {"\n"}
            music and fine arts. Also, mother of 2 cats ;)
          </Text>
        </View>
        {/* my details */}
        <View style={styles.infoWrapper}>
          <Text style={styles.titleText}>My details</Text>
          <View style={styles.myDetailsWrapper}>
            {details.map((detail, index) => (
              <View
                key={index}
                style={[styles.detailBox, { backgroundColor: detail.color }]}
              >
                <Text style={styles.detailText}>{detail.text}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* enjoys */}
        <View style={styles.infoWrapper}>
          <Text style={styles.titleText}>I enjoy</Text>
          <View style={styles.myDetailsWrapper}>
            {enjoys.map((enjoy, index) => (
              <View key={index} style={styles.detailBox}>
                <Text style={styles.detailText}>{enjoy.text}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* communicate */}
        <View style={styles.infoWrapper}>
          <Text style={styles.titleText}>I communicate in</Text>
          <View style={styles.myDetailsWrapper}>
            {languages.map((language, index) => (
              <View key={index} style={styles.detailBox}>
                <Text style={styles.detailText}>{language.text}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* another image */}
        <View>
          <Image
            source={{
              uri: "https://fastly.picsum.photos/id/978/200/300.jpg?hmac=sP2_huC-v5a6cNxpdmxp1FPInoDET7j7O3GoftdaEJk",
            }} // URL ảnh profile
            style={{
              height: 400,
            }}
          />
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: "https://fastly.picsum.photos/id/978/200/300.jpg?hmac=sP2_huC-v5a6cNxpdmxp1FPInoDET7j7O3GoftdaEJk",
              }} // URL ảnh profile
              style={{
                height: 200,
                width: 200,
              }}
            />
            <Image
              source={{
                uri: "https://fastly.picsum.photos/id/978/200/300.jpg?hmac=sP2_huC-v5a6cNxpdmxp1FPInoDET7j7O3GoftdaEJk",
              }} // URL ảnh profile
              style={{
                height: 200,
                width: 200,
              }}
            />
          </View>
        </View>
        <View style={styles.confirmWrapper}>
          <TouchableOpacity style={[styles.iconButton, styles.cancelButton]}>
            <FontAwesome name="times" size={35} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.cancelButton]}>
            <FontAwesome name="check" size={35} color="green" />
          </TouchableOpacity>
        </View>
        <Text style={styles.reportText}>Hide and Report Profile</Text>
      </ScrollView>
      {/* tools bar */}
      <View style={styles.footer}>
        <FontAwesome name="undo" size={24} color="gray" />
        <FontAwesome name="heart" size={24} color="skyblue" />
        <FontAwesome name="bookmark" size={24} color="gray" />
        <TouchableOpacity onPress={() => navigation.navigate("ProfileCard")}>
          <FontAwesome name="user" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f7f7f7",
    padding: 16,
    marginTop: 30,
    marginBottom: 20,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(146, 202, 219, 0.4)",
    height: "100%",
  },
  swipeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  swipeText: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 10,
  },
  swipeTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconLeft: {
    marginRight: 32,
  },
  iconRight: {
    marginLeft: 32,
  },
  subText: {
    fontSize: 14,
    color: "#dcdcdc",
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#ffffff",
    marginVertical: 10,
    marginTop: 20,
    marginBottom: 20,
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
  info: {
    position: "absolute",
    bottom: 20,
    left: 20,
    padding: 10,
    borderRadius: 10,
  },
  addressWrapper: {
    justifyContent: "center",
    backgroundColor: "#EBFDFF",
    padding: 20,
  },
  distanceWrapper: {
    flexDirection: "row",
  },
  distanceText: {
    color: "#767F83",
    marginLeft: 10,
  },
  addressText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 20,
  },
  infoWrapper: {
    padding: 5,
    marginBottom: 10,
  },
  myDetailsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  detailBox: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#f9e9ec",
  },
  detailText: {
    fontSize: 15,
    color: "#424242",
  },
  confirmWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    left: 80,
    paddingVertical: 20,
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: "white", 
  },
  confirmButton: {
    backgroundColor: "#white",
  },
  reportText: {
    paddingVertical: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00bfff",
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
