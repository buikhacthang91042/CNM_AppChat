// Config/FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// (nếu cần) import thêm các service khác, ví dụ Storage:
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAgwUI1kQ7sN1r9cOaBizajEET7aTHUItI",
  authDomain: "fooddeliverytt-cef6b.firebaseapp.com",
  projectId: "fooddeliverytt-cef6b",
  storageBucket: "fooddeliverytt-cef6b.firebasestorage.app",
  messagingSenderId: "181896806972",
  appId: "1:181896806972:web:97b0de26f15df92e4fb939",
  measurementId: "G-55SKS3TB0V"
};

// Khởi tạo app
const app = initializeApp(firebaseConfig);

// Export các instance
export const auth = getAuth(app);
export const firestore = getFirestore(app);
// (nếu cần) export const storage = getStorage(app);
