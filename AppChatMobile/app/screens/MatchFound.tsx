import { transform } from '@babel/core';
import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useNavigation } from '@react-navigation/native';
const MatchScreen = () => {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      {/* tạo hiệu ứng pháo hoa*/}
      
      <ConfettiCannon
        count={250} // Mật độ pháo hoa
        origin={{ x: 0, y: 0 }} 
        autoStart={true} 
        fadeOut={true} 
        explosionSpeed={300} 
      />

      <Text style={styles.title}>Match found!</Text>
      <View style={styles.imagesContainer}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067659973346_8b4cbaa3f3e8f8fc9b51924da4b2b0ea_clfvut.jpg' }}
          style={[styles.image, { transform: [{ rotate: '-2deg' }] }]}
        />
        <Image
          source={{ uri: 'https://res.cloudinary.com/dxidi8djr/image/upload/v1732003658/z5067659984723_eca369b70f0ff1de12503db2ddf668a5_s0ktxy.jpg' }}
          style={[styles.image, { transform: [{ rotate: '2deg' }] }]}
        />
      </View>
      <Image
          source={require('../images/logo.png')}
          style={styles.logo}
        />
      <Text style={styles.description}>
        You’ve both shown interest in each other! Now {'\n'} go send that first message. Don’t wait too long!
      </Text>

      {/* Nút */}
      <TouchableOpacity
      style={styles.button}
      onPress={()=>navigation.navigate("ChatScreen")}
      >
        <Text style={styles.buttonText}>Send Message!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#00BCD4',
    marginBottom: 20,
  },
  logo:{
    position:'absolute',
    top:350,
    alignSelf: 'center', 
    width:100,
    height:100
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 250,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#f0f0f0',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00BCD4',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MatchScreen;
