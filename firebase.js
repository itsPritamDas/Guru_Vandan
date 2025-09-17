// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// ====== Firebase Config ======
const firebaseConfig = {
  apiKey: "AIzaSyBBhGPM46kUg1exY-000CttB8cjAegeCaQ",
  authDomain: "guruvandan-d4dc0.firebaseapp.com",
  projectId: "guruvandan-d4dc0",
  storageBucket: "guruvandan-d4dc0.firebasestorage.app",
  messagingSenderId: "547247846451",
  appId: "1:547247846451:web:9bf630619fe89e5d21df46",
  measurementId: "G-5DT4H1SK83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ====== Authentication ======
export async function registerStudentFirebase({ name, email, password, role, department }) {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add additional info in Firestore under "students" collection
    await setDoc(doc(db, "students", user.uid), {
      name,
      email,
      role,
      department,
      approved: false, // Admin must approve
      createdAt: new Date()
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function loginFirebase(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export function logoutFirebase() {
  return signOut(auth);
}

// ====== Admin Functions ======
export async function addTeacherFirebase({ name, email, department, subject }) {
  try {
    const docRef = await addDoc(collection(db, "teachers"), {
      name,
      email,
      department,
      subject,
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function listTeachersFirebase() {
  const snapshot = await getDocs(collection(db, "teachers"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function listPendingStudentsFirebase() {
  const q = query(collection(db, "students"), where("approved", "==", false));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ====== Teacher Functions ======
export async function addScheduleSlotFirebase({ teacherId, date, time, duration }) {
  try {
    const docRef = await addDoc(collection(db, "scheduleSlots"), {
      teacherId,
      date,
      time,
      duration,
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function listScheduleForTeacherFirebase(teacherId) {
  const q = query(collection(db, "scheduleSlots"), where("teacherId", "==", teacherId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function listAppointmentsForTeacherFirebase(teacherId) {
  const q = query(collection(db, "appointments"), where("teacherId", "==", teacherId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ====== Student Functions ======
export async function listAppointmentsForStudentFirebase(studentId) {
  const q = query(collection(db, "appointments"), where("studentId", "==", studentId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ====== Messaging Functions ======
export async function listMessagesForUserFirebase(userId) {
  const q = query(collection(db, "messages"), where("to", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ====== Export Firestore & Auth (if needed in script.js) ======
export { auth, db };
