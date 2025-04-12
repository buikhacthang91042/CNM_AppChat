import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditProfileScreen = ({ route, navigation }) => {
  const { userInfo } = route.params;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateToYYYYMMDD = (date) => {
    if (!date) return '';
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || '');
      setPhone(userInfo.phone || '');
      setDob(formatDateToDDMMYYYY(userInfo.dob || ''));
      setEmail(userInfo.email || '');
      setGender(userInfo.gender || '');
    }
  }, [userInfo]);

  const handleUpdateProfile = async () => {
    const formattedDob = formatDateToYYYYMMDD(dob);
    const updatedData = { name, phone, dob: formattedDob, email, gender };
  
    console.log("Dữ liệu gửi lên API:", updatedData); // Log dữ liệu gửi đi
  
    try {
      const token = await AsyncStorage.getItem("token");
      const parsedToken = JSON.parse(token);
  
      const response = await axios.put(
        "http://192.168.1.30:5000/api/auth/me/update",
        updatedData,
        {
          headers: { Authorization: `Bearer ${parsedToken.token}` },
        }
      );
  
      console.log("Phản hồi từ API:", response.data); // Log phản hồi từ API
  
      if (response.status === 200) {
        Alert.alert("Thành công", "Cập nhật thông tin thành công!", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error.message);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin. Vui lòng thử lại.");
    }
  };

  const handleUpdatePassword = () => {
    // Điều hướng đến màn hình ForgotPasswordScreen
    navigation.navigate('UpdatePassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Chỉnh sửa thông tin</Text>

        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ và tên"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Ngày sinh</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập ngày sinh (dd/mm/yyyy)"
          value={dob}
          onChangeText={(text) => {
            const formattedText = text.replace(/[^0-9/]/g, '');
            setDob(formattedText);
          }}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Giới tính</Text>
        <View style={styles.genderContainer}>
          {['Nam', 'Nữ'].map((genderOption) => (
            <TouchableOpacity
              key={genderOption}
              style={[
                styles.genderOption,
                gender === genderOption && styles.genderOptionSelected,
              ]}
              onPress={() => setGender(genderOption)}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === genderOption && styles.genderTextSelected,
                ]}
              >
                {genderOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Cập nhật thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleUpdatePassword}
        >
          <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    paddingLeft: 30,    

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    width: '83%',
    marginLeft: 30,
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    width: '80%',
    marginLeft: 30,
  },
  genderOption: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
    
  },
  genderOptionSelected: {
    borderColor: '#4A90E2',
    backgroundColor: '#e0f7ff',
    
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  genderTextSelected: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    width: '83%',
    marginLeft: 30,
    shadowColor: '#000',
    marginTop: 20,
  },
  secondaryButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;