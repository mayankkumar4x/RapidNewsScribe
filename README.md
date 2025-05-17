# **RapidNewsScribe**

**RapidNewsScribe** is a dynamic, feature-rich news application that allows users to explore, filter, read, listen to, and translate news articles from various domains and countries. Authenticated users can save news articles with personalized notes and manage them through a user-friendly dashboard.

---

## 🚀 **Key Features**

### 📰 News Exploration
- Fetches real-time news articles using the **GNews API**.
- Each article includes:
  - Image
  - Title
  - Description
  - Publisher name
  - Published date and time
  - Source (e.g., BBC News)
  - Options: **Listen**, **Translate**, **Read More**, **Save**

### 🔍 Filtering Options
- Filter news based on **domain** and **country**.

### 🗣️ Text-to-Speech
- Powered by **Azure TTS services**.
- Users can listen to articles in **multiple languages**.
- Includes **Listen** and **Stop** buttons.

### 🌐 Language Translation
- Translate article content from one language to another.
- Language options available for user selection.
- Uses **Azure Translation & Language Detection Services**.

### 🔐 User Authentication
- **Sign up** with **Email OTP verification** (via **Nodemailer**).
- **Login**, **Logout**, and **Forgot Password** features.
- Secure access with **JWT** and **Bcrypt**.

### 💾 Save News with Notes
- Save articles for future reference.
- Each saved article stores the **news URL** automatically.

### 📝 Notes Management
- Notes are linked to the saved news articles.
- Each note includes:
  - Title
  - Description
  - Associated news link
  - **Edit**, **Delete**, and **View** options

### 📊 Dashboard
- Provides an overview of all application features.
- Central hub for managing saved articles and notes.

### 🎨 UI/UX Features
- **Light/Dark mode toggle**
- Fully responsive design using **Bootstrap**
- Intuitive and user-friendly interface

### 📞 Additional Pages
- **Contact Us** and **About** sections for user support and app info

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Bcrypt, Nodemailer (for OTP)
- **APIs/Services**:
  - GNews API – News fetching
  - Azure Cognitive Services – Text-to-Speech, Language Detection, Translation

---

## 📌 How to Use

1. **Sign up** with your email (OTP required for verification).
2. **Login** and start exploring news articles.
3. Use filters to narrow results based on **domain** or **country**.
4. Click on **Read More** to view full articles on the source site.
5. Use **Text-to-Speech** or **Translate** options as needed.
6. **Save** important articles and add **personal notes**.
7. Manage your saved content and notes in the **Dashboard**.

---

## 📷 Screenshots *(Optional section – add if you have visuals)*

