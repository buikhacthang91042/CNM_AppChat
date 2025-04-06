import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Swiper from "react-native-deck-swiper";
//import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome, Ionicons } from "@expo/vector-icons";

const App = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Le Viet Nguyen Hung",
      age: 25,
      image: "https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067630238749_e4294c7283ca9ec3442f7810c1b69611_vnnbuf.jpg",
      occupation: "Software Engineer",
      pronouns: "he/his",
    },
    {
      id: 2,
      name: "Rachael Green",
      age: 27,
      image: "https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067659973346_8b4cbaa3f3e8f8fc9b51924da4b2b0ea_clfvut.jpg",
      occupation: "Graphic Designer",
      pronouns: "she/her/hers",
    },
    {
      id: 3,
      name: "Nguyen Ngoc Tinh",
      age: 19,
      image: "https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067659984723_eca369b70f0ff1de12503db2ddf668a5_s0ktxy.jpg",
      occupation: "Graphic Designer",
      pronouns: "she/her/hers",
    },
  ]);

  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const checkTutorialStatus = async () => {
      try {

        await AsyncStorage.removeItem("tutorialShown");

        const tutorialShown = await AsyncStorage.getItem("tutorialShown");
        if (!tutorialShown) {
          setShowTutorial(true);
          await AsyncStorage.setItem("tutorialShown", "true");
        }
      } catch (error) {
        console.error("Lỗi khi truy cập AsyncStorage:", error);
      }
    };
    checkTutorialStatus();
  }, []);


  const closeTutorial = () => setShowTutorial(false);

  const onSwipedLeft = (cardIndex:number) => {
    console.log("Disliked:", cards[cardIndex]?.name);
  };

  const onSwipedRight = (cardIndex:number) => {
    console.log("Liked:", cards[cardIndex]?.name);
  };
  // hàm này để kiểm tra tutorial nha, coi nó có thay đổi không
  useEffect(() => {
    console.log("Show tutorial?", showTutorial);
  }, [showTutorial]);  

  return (
    <View style={styles.container}>
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

      {/* Swiper */}
      <View style={styles.swiperContainer}>
        <Swiper
          cards={cards}
          renderCard={(card) => (
            <View style={styles.card}>
              <ImageBackground source={{ uri: card?.image }} style={styles.cardImage}>
                <View style={styles.info}>
                  <Text style={styles.name}>
                    {card?.name}, {card?.age}{" "}
                    <FontAwesome name="check-circle" size={16} color="#00bfff" />
                  </Text>
                  <View style={styles.pronounsContainer}>
                    <Text style={styles.pronouns}>{card?.pronouns}</Text>
                  </View>
                  <Text style={styles.job}>
                    <FontAwesome name="folder" size={15} color="gray" /> {card?.occupation}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          )}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          stackSize={3}
          cardIndex={0}
          backgroundColor={"#f5f5f5"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "red",
                  color: "white",
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: -20,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "green",
                  color: "white",
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 20,
                  marginLeft: 20,
                },
              },
            },
          }}
        />
        
        {showTutorial && (
          console.log("Rendering tutorial overlay..."),
          <View style={styles.overlay} pointerEvents="auto">
            <Text style={styles.overlayText}>Swipe right if you like, left to pass!</Text>
            <TouchableOpacity style={styles.overlayButton} onPress={closeTutorial}>
              <Text style={styles.overlayButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <FontAwesome name="user" size={24} color="gray" />
        <FontAwesome name="heart" size={24} color="#1DA1F2" />
        <FontAwesome name="bookmark" size={24} color="gray" />
        <Ionicons name="send" size={24} color="gray" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    position: "absolute",
    top: 18,
    left: 0,
    right: 0,
    zIndex: 1,  // Header ở trên cùng
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  swiperContainer: {
    marginVertical:20,
    position: "relative", 
   
  },
  card: {
    borderRadius: 10,
    height: "100%",
  },
  cardImage: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "98%",
    width: "100%",
    overflow: "hidden",
  },
  info: {
    position: "absolute",
    bottom: 15,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
  },
  pronounsContainer: {
    backgroundColor: "#00bfff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 10,
    flexShrink: 1,
  },
  pronouns: {
    fontSize: 14,
    color: "#ffffff",
  },
  job: {
    fontSize: 14,
    color: "#dcdcdc",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1, 
  },
  overlay: {
    borderRadius:20,
    position: "absolute",         
    backgroundColor: "rgba(164,222,226, 0.3)", 
    width:'90%',
    height:740,
    top:60,
    left:21,
    justifyContent: "center",     
    alignItems: "center",        
    zIndex: 999,                 
    pointerEvents: "auto",       
  },
  
  overlayText: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
    fontWeight:'bold'
  },
  
  overlayButton: {
    backgroundColor: "#44bcd8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width:100,
    alignItems:'center'
  },
  
  overlayButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});

export default App;
