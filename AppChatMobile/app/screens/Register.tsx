import { Formik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; 
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView, Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {auth, firestore} from '../../Config/FirebaseConfig';
export function Register() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const initialValue = {
    ten: "",
    email: "",
    phone:"",
    password: ""
  };
  const handleRegister = (values) => {
    const { ten, email, phone, password } = values;
    const formData = {
      name: ten,
      email,
      phone,
      password,
    };
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Đã tạo người dùng");
        const userRef = collection(firestore, "UserData");
        addDoc(userRef, formData)
          .then(() => {
            console.log("Dữ liệu đã được thêm vào Firestore");
            Alert.alert(
              'Thông báo',
              'Tạo tài khoản thành công!',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('LoginScreen');
                  },
                },
              ],
              { cancelable: false }
            );
          })
          .catch(error => {
            console.error("Lỗi khi thêm dữ liệu:", error);
          });
      })
      .catch(error => {
        console.error("Lỗi tạo người dùng:", error);
        Alert.alert("Lỗi", error.message);
      });
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../images/logo.png')} style={styles.imageContainer} />

        <Text style={styles.title}>Đăng ký</Text>
        <Formik
  initialValues={initialValue}
  onSubmit={values => {
      handleRegister(values); 
  }}
>
  {({ handleChange, handleBlur, handleSubmit, values }) => (
    <View style={{ width: '100%' }}>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        onChangeText={handleChange('ten')}
        onBlur={handleBlur('ten')}
        value={values.ten}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        value={values.email}
      />

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        onChangeText={handleChange('phone')}
        onBlur={handleBlur('phone')}
        value={values.phone}
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  )}
</Formik>



        

        <Text style={styles.agreementText}>
          By signing up, you agree to our <Text style={styles.link}>Terms</Text> &{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 50,
      paddingHorizontal: 30,
    },
    imageContainer: {
      width: 120,
      height: 120,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: '#333',
      marginBottom: 25,
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 15,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      backgroundColor: '#f9f9f9',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    button: {
      backgroundColor: '#4A00E0',
      paddingVertical: 15,
      borderRadius: 30,
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
      shadowColor: '#4A00E0',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 17,
      fontWeight: 'bold',
    },
    agreementText: {
      color: '#555',
      fontSize: 13,
      textAlign: 'center',
      marginTop: 20,
      paddingHorizontal: 15,
      lineHeight: 18,
    },
    link: {
      color: '#007AFF',
      textDecorationLine: 'underline',
    },
  });