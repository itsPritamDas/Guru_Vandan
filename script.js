// script.js
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where, addDoc, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { app } from './firebase.js';


import { app, auth, db } from './firebase.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, getDocs, query, where, addDoc, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


const auth = getAuth(app);
const db = getFirestore(app);

export const App = {

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')) || null;
  },

  requireRole(role) {
    const user = this.getCurrentUser();
    if (!user || user.role !== role) {
      alert('Access denied!');
      window.location.href = 'index.html';
    }
  },

  async logout() {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      console.log('Logout successful');
      return true;
    } catch (err) {
      console.error('Logout failed:', err);
      alert('Logout failed. Try again.');
      return false;
    }
  },

  initAuthListener() {
    onAuthStateChanged(auth, user => {
      if (user) {
        getDocs(query(collection(db, 'users'), where('uid', '==', user.uid)))
          .then(snapshot => {
            if (!snapshot.empty) localStorage.setItem('user', JSON.stringify(snapshot.docs[0].data()));
          });
      } else {
        localStorage.removeItem('user');
      }
    });
  },

  async searchTeachers(keyword) {
    keyword = keyword.toLowerCase();
    const snapshot = await getDocs(collection(db, 'teachers'));
    const results = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (
        (data.name && data.name.toLowerCase().includes(keyword)) ||
        (data.department && data.department.toLowerCase().includes(keyword)) ||
        (data.subject && data.subject.toLowerCase().includes(keyword))
      ) {
        results.push({ uid: doc.id, ...data });
      }
    });
    return results;
  },

  renderSearchResults(containerSelector, teachers) {
    const container = document.querySelector(containerSelector);
    if (!teachers.length) {
      container.innerHTML = '<p>No teachers found.</p>';
      return;
    }
    container.innerHTML = teachers.map(t => `
      <div class="teacher-card" data-uid="${t.uid}">
        <p><strong>Name:</strong> ${t.name}</p>
        <p><strong>Department:</strong> ${t.department}</p>
        <p><strong>Subject:</strong> ${t.subject}</p>
      </div>
    `).join('');

    container.querySelectorAll('.teacher-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.teacher-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        document.getElementById('selectedTeacherUid').value = card.dataset.uid;
      });
    });
  },

  async renderAppointmentsForStudent(containerSelector, studentUid) {
    const q = query(collection(db, 'appointments'), where('studentUid', '==', studentUid), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const container = document.querySelector(containerSelector);
    if (snapshot.empty) {
      container.innerHTML = '<p>No appointments yet.</p>';
      return;
    }
    container.innerHTML = snapshot.docs.map(doc => {
      const data = doc.data();
      return `
        <div class="appointment-card">
          <p><strong>Teacher:</strong> ${data.teacherName}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Status:</strong> ${data.status}</p>
        </div>
      `;
    }).join('');
  },

  async renderMessagesForUser(containerSelector, userUid) {
    const q = query(collection(db, 'messages'), where('participants', 'array-contains', userUid), orderBy('timestamp', 'asc'));
    const snapshot = await getDocs(q);
    const container = document.querySelector(containerSelector);
    if (snapshot.empty) {
      container.innerHTML = '<p>No messages yet.</p>';
      return;
    }
    container.innerHTML = snapshot.docs.map(doc => {
      const data = doc.data();
      const sender = data.senderName;
      const text = data.text;
      const time = new Date(data.timestamp?.seconds * 1000).toLocaleString();
      return `
        <div class="message-card">
          <p><strong>${sender}:</strong> ${text}</p>
          <p class="time">${time}</p>
        </div>
      `;
    }).join('');
  },

  async sendMessage(toUid, text) {
    const user = this.getCurrentUser();
    await addDoc(collection(db, 'messages'), {
      senderUid: user.uid,
      senderName: user.name,
      recipients: [toUid],
      participants: [user.uid, toUid],
      text,
      timestamp: serverTimestamp()
    });
  }
};

App.initAuthListener();
