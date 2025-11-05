☕ CoffeeApp

A modern Coffee Ordering App built using React Native (Expo) and Node.js with MongoDB.
This app shows how frontend and backend work together — displaying menu items, categories, and a surprise drink feature.

🚀 Features

📱 Frontend built with Expo + React Native

⚙️ Backend powered by Node.js + Express + MongoDB

☕ Menu with Categories (like Coffee, Drinks, Snacks, Desserts)

🎲 Surprise Menu for random item suggestion

💾 Database seeding with sample data using seed.js

🌐 API routes to fetch menu and surprise items

🛠️ Technologies Used

Frontend: React Native (Expo SDK 52)

Backend: Node.js + Express

Database: MongoDB (Mongoose)

Styling: React Native Paper & custom styles

⚙️ How to Run
🖥️ Backend

Open terminal inside backend folder

Run:

npm install
node seed.js
npx nodemon server.js


Backend will run on http://localhost:3000

📱 Frontend

From root folder, run:

npx expo start


Open app on Expo Go (Android) or Web preview

🗂️ Folder Structure
CoffeeApp/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   ├── server.js
│   └── .env
│
├── App.tsx
├── package.json
└── README.md
screenshots added in separate folder.

🧩 API Endpoints

/api/menu → Get all menu items

/api/surprise → Get one random menu item

🧠 Notes

No login/signup — focus is on menu and category display

Works with both local MongoDB and MongoDB Atlas

Simple, lightweight, and exam-ready project

✨ Author

👨‍💻 Umair Ahmed Reg: 8292
📅 Midterm Practical Exam — 2025
