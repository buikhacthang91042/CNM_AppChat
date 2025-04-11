import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export function Register() {
  const navigation = useNavigation();
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [formData, setFormData] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Vui lòng nhập tên")
      .min(3, "Tên phải nhiều hơn 3 kí tự"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^0[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải ít nhất 6 ký tự"),
    dob: Yup.string().required("Vui lòng nhập ngày sinh"),
    gender: Yup.string().required("Vui lòng chọn giới tính"),
  });

  const sendOTP = async (values) => {
    try {
      const res = await axios.post("http://192.168.1.11:3000/send-code", {
        phone: "+84" + values.phone.slice(1),
      });

      if (res.data.success) {
        setOtpSent(true);
        setFormData(values);
        Alert.alert("Thành công", "Mã OTP đã được gửi về điện thoại.");
      } else {
        Alert.alert("Lỗi", "Gửi OTP thất bại.");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      Alert.alert("Lỗi", "Không thể gửi OTP.");
    }
  };

  const verifyAndRegister = async () => {
    if (!otpCode || !formData) return;

    try {
      setVerifying(true);

      const res = await axios.post("http://192.168.1.11:3000/verify-code", {
        phone: "+84" + formData.phone.slice(1),
        code: otpCode,
      });

      if (res.data.success && res.data.status === "approved") {
        // Gửi dữ liệu đăng ký đến backend
        const registerRes = await axios.post("http://192.168.1.11:5000/api/auth/register", formData);

        if (registerRes.data.success) {
          Alert.alert("Thành công", "Tạo tài khoản thành công!", [
            { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
          ]);
        } else {
          Alert.alert("Lỗi", registerRes.data.message || "Đăng ký thất bại.");
        }
      } else {
        Alert.alert("Lỗi", "Mã OTP không đúng!");
      }
    } catch (error) {
      console.error("Register Error:", error);
      Alert.alert("Lỗi", "Xác thực OTP hoặc đăng ký thất bại.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../images/logo.png")}
          style={styles.imageContainer}
        />
        <Text style={styles.title}>Đăng ký</Text>

        <Formik
          initialValues={{
            name: "",
            phone: "",
            email: "",
            password: "",
            dob: "",
            gender: "",
          }}
          
          validationSchema={validationSchema}
          onSubmit={(values) => {
            sendOTP(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Họ và tên"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Ngày sinh (yyyy-mm-dd)"
                onChangeText={handleChange("dob")}
                onBlur={handleBlur("dob")}
                value={values.dob}
              />
              {touched.dob && errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

              <Text style={{ marginTop: 10 }}>Giới tính:</Text>
              <View style={{ flexDirection: "row", marginVertical: 10 }}>
                {["Nam", "Nữ"].map((genderOption) => (
                  <TouchableOpacity
                    key={genderOption}
                    style={{
                      padding: 10,
                      borderWidth: 1,
                      borderColor: values.gender === genderOption ? "#4A00E0" : "#aaa",
                      borderRadius: 10,
                      marginRight: 10,
                      backgroundColor: values.gender === genderOption ? "#e0e0ff" : "#fff",
                    }}
                    onPress={() => setFieldValue("gender", genderOption)}
                  >
                    <Text>{genderOption}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {touched.gender && errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Gửi mã OTP</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {otpSent && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nhập mã OTP"
              keyboardType="number-pad"
              value={otpCode}
              onChangeText={setOtpCode}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={verifyAndRegister}
              disabled={verifying}
            >
              <Text style={styles.buttonText}>
                {verifying ? "Đang xác thực..." : "Xác thực & Đăng ký"}
              </Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.agreementText}>
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <Text style={styles.link}>Điều khoản</Text> &{" "}
          <Text style={styles.link}>Chính sách</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  formContainer:{
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Cho A
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  imageContainer: { width: 120, height: 120, marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4A00E0",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  agreementText: {
    color: "#555",
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 15,
    lineHeight: 18,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
    marginTop: -10,
  },
});
