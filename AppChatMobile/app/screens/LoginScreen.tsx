import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import { auth } from '../../Config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
//import {firebase} from '../../Config/FirebaseConfig';
export default function () {
  const navigation = useNavigation();

  const [showPass, setShowPass] = useState(false);

  const email = useRef(1);
  const password = useRef(2);
  
  async function signIn(data) {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // đăng nhập thành công:
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      });
    } catch (error) {
      Alert.alert("Tài khoản hoặc mật khẩu không đúng", "Vui lòng đăng nhập lại");
    }
  }
  
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image
          source={require("../images/HinhDaiDien.png")}
          style={{ height: 150, width: 150 }}
        />
      </View>
      <View style={style.title}>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>
          TT Delivery Food
        </Text>

        <Text style={{ opacity: 0.4 }}>Đăng nhập vào tài khoản của bạn</Text>
      </View>
      <Formik
      initialValues={{email:'', password:''}}
        onSubmit={(value) => {
          signIn(value)

        }}
      >
        { (props) => 
          <View style={{flex:1}}>
            <View style={style.content}>
              <View style={style.content1}>
                <Icon name="mail-outline" size={20}></Icon>
                <TextInput
                  style={style.input}
                  placeholder="Nhập tài khoản của bạn"
                  ref={email}
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                />
              </View>
              <View style={style.content2}>
                <Icon name="lock-closed-outline" size={20}></Icon>
                <TextInput
                  style={style.input}
                  placeholder="Nhập mật khẩu cùa bạn"
                  ref={password}
                   onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  secureTextEntry={!showPass}
                />
                <TouchableOpacity
                  onPress={() => setShowPass(!showPass)}
                  style={style.eyeButton}
                >
                  <Icon name="eye" size={20}></Icon>
                </TouchableOpacity>
              </View>
              <View style={style.content3}>
                
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text style={{ color: "blue" }}>Quên mật khẩu?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={style.button}>
              <TouchableOpacity
                style={style.opacity}
                onPress={props.handleSubmit}
              >
                <Text style={style.buttonContinue}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
          }
      </Formik>

      <View style={style.dangKi}>
        <Text style={{ textAlign: "center" }}>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ color: "#009966" }}>Đăng kí</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={style.line} />
        <Text style={{ fontSize: 20 }}>or</Text>
        <View style={style.line} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <View style={style.fbgg}>
          <View style={[style.iconContainer, { backgroundColor: "#4267B2" }]}>
            <TouchableOpacity style={style.UngDungDangNhap}>
              <Icon name="logo-facebook" size={32} color="white" />
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Tiếp tục với Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[style.iconContainer, { backgroundColor: "#EA4335" }]}>
            <TouchableOpacity style={style.UngDungDangNhap}>
              <Icon name="logo-google" size={32} color="white" />
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                Tiếp tục với Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    flex: 0.7,
    backgroundColor: "white",
    alignItems: "center",
  },
  content: {
    flex: 1.5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: -60,
  },
  content1: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#f9f9f9",
  },
  content2: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#f9f9f9",
  },
  content3: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
    height: 50,
    backgroundColor: "white",
  },
  input: {
    marginLeft: 10,
    width: "100%",
    height: 40,
  },
  button: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -60,
  },
  opacity: {
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "#009966",
    alignItems: "center",
    width: "80%",
    height: 50,
    justifyContent: "center",
  },
  buttonContinue: {
    fontSize: 26,
    color: "white",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000",
    marginHorizontal: 15,
    opacity: 0.2,
  },
  iconContainer: {
    width: 300,
    height: 50,
    borderRadius: 10,

    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  remberMe: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  dangKi: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    backgroundColor: "white",
  },
  fbgg: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  UngDungDangNhap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "70%",
    marginLeft: -80,
  },
});
