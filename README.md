# Social Media Poster – Frontend

This is the frontend of the **Social Media Poster** application – a tool for posting updates (including text and media) to LinkedIn and Twitter (X) accounts through a single interface.

## ✨ Features

- 🖼️ Post text and media (images/videos)
- 🔐 OAuth login with Twitter and LinkedIn
- 🔁 Detects authenticated platforms
- 📤 Uploads media using `multipart/form-data`
- ✅ Displays success/failure messages per platform

## 🛠️ Technologies Used

- React (Vite)
- Axios
- CSS Modules
- FormData for file handling

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/vrima1221/social-media-poster.git
cd social-media-poster
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file

```bash
VITE_API_URL=your_api_url
```

### 4. Start the development server

```bash
npm run dev
```

🔐 OAuth Flow
- Login buttons redirect to backend:

  - /auth/linkedin

  - /auth/twitter

- Upon login, the backend redirects back to this frontend.

- Session-based auth is used to persist state.
