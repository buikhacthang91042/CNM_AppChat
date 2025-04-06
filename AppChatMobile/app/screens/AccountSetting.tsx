import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ScrollView,Image, TextInput} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { useNavigation } from '@react-navigation/native';
export default function AccountSetting() {
    const navigation = useNavigation();
    type Feature={
        feature:string;
        free: boolean;
        premium: boolean;
    }
    const features = [
        { feature: 'Unlimited swipes', free: true, premium: true },
        { feature: 'Advanced filters', free: true, premium: true },
        { feature: 'Remove ads', free: false, premium: true },
        { feature: 'Undo accidental left swipes', free: false, premium: true },
        { feature: 'Push your profile to more viewers', free: false, premium: true },
      ];
    
      const renderFeatureRow = ({ item }:{item:Feature}) => (
        <View style={styles.featureRow}>
          <Text style={styles.featureText}>{item.feature}</Text>
          <View style={styles.checkboxContainer}>
            <Text style={[styles.checkbox, item.free && styles.checked]}>✔</Text>
            <Text style={[styles.checkbox, item.premium && styles.checked]}>✔</Text>
          </View>
        </View>
      );
  return (
    <SafeAreaView style={styles.container}>
      {/*header*/}
      <View style={styles.header}>
        <FontAwesome name="bars" size={24} color="black" />
        <FontAwesome name="cog" size={24} color="black" />
      </View>
      {/*info user*/}
      <View style={styles.infoUserContainer}>
        <View style={styles.avatarContainer}>
          <Image
           style={styles.avatarImage}
           source={{uri:'https://picsum.photos/200/300'}}/>
           <View style={styles.progressContainer}>
                <Text style={{color:'white'}}>45% completed</Text>
           </View>
        </View>
        <View style={styles.infoWrapper}>
               <View style={styles.nameWrapper}>
                <Text 
                style={{
                    fontWeight:'bold',
                    fontSize:20
                    }}>
                Joshua Edwards, 29 </Text> 
                <FontAwesome name="check" size={20} color="#808080" />
               </View>
               <TouchableOpacity style={styles.buttonEditProfileWrapper}>
                    <Text style={{color:'rgb(54, 74, 76)'}}>Edit your profile {'>'} </Text>
               </TouchableOpacity>
        </View>
        
      </View>
      {/*verification*/}
      <View style={styles.verifyContainer}>
        <FontAwesome name="shield" size={40} color="#808080" />          
        <View style={styles.verifyTextContainer}>
            <Text style={styles.title}>
            Verification adds an extra layer of authenticity and trust to your profile.
            </Text>
            <TouchableOpacity>
            <Text style={styles.link}>Verify your account now!</Text>
            </TouchableOpacity>
        </View>
        
      </View>   
      {/*Table */}
      <View style={styles.tableWrapper}>
      {/* Header Section */}
      <View style={styles.headerTable}>
        <Text style={styles.titleTable}>HeartSync Premium</Text>
        <Text style={styles.subtitle}>
          Unlock exclusive features and supercharge your dating experience.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Upgrade from $7.99</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Comparison Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>What's included</Text>
          <View style={styles.columnTitles}>
            <Text style={styles.columnTitle}>Free</Text>
            <Text style={styles.columnTitle}>Premium</Text>
          </View>
        </View>
        <FlatList
          data={features}
          renderItem={renderFeatureRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>    
    <View style={styles.footer}>
        <FontAwesome name="undo" size={24} color="gray" />
        <FontAwesome name="heart" size={24} color="skyblue" />
        <FontAwesome name="bookmark" size={24} color="gray" />
        <TouchableOpacity 
        onPress={()=>navigation.goBack()}>
        <FontAwesome name="user" size={24} color="gray" />
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop:30
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal:10,
  },
  infoUserContainer:{
    flexDirection:'row'
  },
  progressContainer: {
    width: "80%", 
    height: 20,
    backgroundColor: "#00C2FF", 
    borderRadius:10,
    alignItems:'center',
    top:-20,
    left:2
  },
  avatarContainer:{
    alignItems:'center',
    paddingHorizontal:20
  },
  avatarImage:{
    borderRadius:70,
    height:150,
    width:140
  },
  infoWrapper:{
    justifyContent:'center'
  },
  nameWrapper:{
    flexDirection:'row'
  },
  buttonEditProfileWrapper:{
    backgroundColor:'#C6FAFF',
    width:'65%',
    height:35,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    marginVertical:10
  },
  verifyContainer: {
    width:'75%',
    left:'6%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#D9FAFF',
    padding:15,
    marginVertical:20,
    borderRadius:40
    
  },
  verifyTextContainer:{
    width:'85%',
  },
  title: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  link: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  tableWrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTable: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#00c1e4',
    padding: 20,
    borderRadius: 10,
  },
  titleTable: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00c1e4',
  },
  table: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  columnTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  columnTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    lineHeight: 20,
    borderRadius: 5,
  },
  checked: {
    backgroundColor: '#00c1e4',
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    marginTop:10
    
  },
});
