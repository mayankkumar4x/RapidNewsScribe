# 🗞️ RapidNewsScribe

**RapidNewsScribe** is a full-stack news web application built using the **MERN Stack**, integrated with **Azure Cognitive Services** and **GNews API** to deliver real-time, multilingual, and interactive news reading experiences.

---

## 🚀 Features

### 1. 🔍 News Exploration
- Fetches real-time news using **GNews API**.
- Each news article displays:
  - Image  
  - Title  
  - Description  
  - Publisher Name  
  - Published Date & Time  
  - Source (e.g., BBC News)  
- Interactive actions:  
  - **Listen** (Text-to-Speech)  
  - **Translate**  
  - **Read More**  
  - **Save Article**

### 2. 🎯 Filtering Options
- Filter news by:
  - **Domain** (e.g., Technology, Health)
  - **Country**
- Ensures targeted and relevant content delivery.

### 3. 🔊 Text-to-Speech
- Powered by **Azure Text-to-Speech API**.
- Supports **multi-language** article narration.
- User controls:
  - **Listen**
  - **Stop**

### 4. 🌐 Language Translation
- Utilizes **Azure Translation** and **Language Detection APIs**.
- Users can:
  - Detect source language
  - Translate content into any supported target language

### 5. 🔐 User Authentication
- Secure Sign-up with **Email OTP Verification** using **Nodemailer**.
- Features:
  - Login
  - Logout
  - Forgot Password
- Authentication & user protection via **JWT** and **Bcrypt**.

### 6. 💾 Save News with Notes
- Save articles for future reading.
- Each saved article retains the **original source URL**.

### 7. 📝 Notes Management
- Link personal notes to saved articles.
- Notes include:
  - Title  
  - Description  
  - Associated News Link  
- Actions:
  - **View**, **Edit**, **Delete**

### 8. 📊 User Dashboard
- Quick access to saved articles, notes, and preferences.

### 9. 🌙 UI/UX Enhancements
- Toggle between **Light** and **Dark** themes.
- Clean, intuitive, and responsive interface.

### 10. 📄 Additional Pages
- **About Us**  
- **Contact Us**

---

## 🧰 Tech Stack

### Frontend
- **React.js** with Axios  
- **Tailwind CSS / CSS3**  

### Backend
- **Node.js** & **Express.js**  
- **MongoDB** with Mongoose

### External Services
- **GNews API** – Real-time news articles  
- **Azure Text-to-Speech API**  
- **Azure Translator API**  
- **Nodemailer** – OTP Verification via Email

### Authentication
- **JWT** – Token-based authentication  
- **Bcrypt** – Password hashing

---







# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
