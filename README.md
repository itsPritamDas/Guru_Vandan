# Guru Vandan

**Student–Teacher Booking Appointment System**

A web-based application to simplify and streamline scheduling academic appointments. The system enables students and teachers to efficiently manage meeting requests online, replacing manual coordination with a fast, easy, and secure digital workflow.

---

## 🛠️ Features

- Student registration, login, and profile management  
- Teacher registration/login (or teacher profile management)  
- Admin interface to manage users and appointments  
- Students can search for teachers and request appointments  
- Teachers can approve or reject requests  
- Real-time updates using Firebase  
- Secure authentication and role-based access  

---

## 📂 Tech Stack

| Component | Technology |
|-----------|-------------|
| Frontend | HTML, CSS, JavaScript |
| Backend & Database | Firebase Authentication & Firestore (or Realtime Database) |
| Hosting / Deployment | Firebase Hosting (or any static host) |
| Version Control | Git / GitHub |

---

## 📁 Project Structure

Guru_Vandan/
├── index.html # Landing / home page
├── register.html # Registration page for students/teachers
├── admin.html # Admin dashboard / controls
├── teacher.html # Teacher dashboard
├── student.html # Student dashboard
├── firebase.js # Firebase config & initialization
├── script.js # Main JS – handles booking, approvals, UI logic
├── style.css # Styling for pages
└── README.md # Project overview & instructions

yaml
Copy code

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/itsPritamDas/Guru_Vandan.git
   cd Guru_Vandan
Set up Firebase

Create a Firebase project via Firebase Console.

Enable Authentication (Email/Password).

Create Firestore (or Realtime Database).

Copy your Firebase config (API key, project ID, etc.) into firebase.js.

Serve the files

Since it's static pages (HTML, JS, CSS), you can use any static server or just open index.html in a browser.

For example, using VS Code Live Server or Node’s http-server:

bash
Copy code
# If using http-server
npm install -g http-server
http-server .
Use the application

Register as a student or teacher.

As a student, find teacher and request an appointment.

As a teacher, log in and approve/reject appointments.

As admin, manage users and appointments.

✅ Usage / Workflow
User registers (student or teacher)

User logs in

Student views list of teachers and requests appointment

Teacher receives request, approves or rejects

System updates appointment status, shows to student

Admin monitors and manages all users & appointments

🔐 Security & Roles
Authentication via Firebase ensures only valid users can log in

Roles (student, teacher, admin) determine what each user can see/do

Data validation on frontend & backend

💡 Future Enhancements
Email / SMS notifications for appointment reminders

Integration of video meeting links (Zoom, Google Meet)

Calendar view for teachers & students

Mobile-friendly UI or a native mobile app

Allow scheduling of recurring appointments

Improvement in UI/UX (design, responsiveness, themes)

📄 License
(@Pritam Das 2025 )

📌 Contact
If you have questions, feel free to reach out:

Owner: Pritam Das

GitHub: itsPritamDas
