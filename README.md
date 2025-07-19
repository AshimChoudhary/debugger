# 🐛 AI Debug Assistant

A full-stack debugging assistant web app that helps developers debug their code using AI-powered analysis.

## ✨ Features

- **🔐 Authentication System**: JWT-based authentication with secure cookie storage
- **💻 Code Editor**: Paste and analyze your source code with syntax highlighting
- **📄 Log Upload**: Upload log files or paste logs manually
- **📸 Screenshot Support**: Upload screenshots for visual context
- **🤖 AI Analysis**: Get detailed debug analysis using Google's Gemini AI
- **🎨 Modern UI**: Beautiful interface with Tailwind CSS and DaisyUI
- **🌙 Theme Support**: Multiple themes including dark mode
- **📱 Responsive Design**: Works on desktop and mobile devices

## 🛠 Tech Stack

### Frontend

- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **DaisyUI** - Component library
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Zustand** - State management

### Backend

- **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage
- **Google Gemini AI** - AI analysis

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Google Gemini API key
- Cloudinary account (for image uploads)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chat-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/debug-assistant
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GEMINI_API_KEY=your-gemini-api-key-here

CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Start the Application

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## 📋 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Debug Analysis

- `POST /api/debug/analyze` - Analyze code with AI

## 🎯 Usage

1. **Sign Up/Login**: Create an account or sign in
2. **Navigate to Debug**: Click "Debug Now!" from the home page
3. **Paste Code**: Enter your code in the code editor
4. **Add Context**: Optionally upload logs or screenshots
5. **Analyze**: Click "Analyze Now!" to get AI-powered insights
6. **Review Results**: View detailed analysis and suggestions

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

- `PORT` - Server port (default: 5001)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GEMINI_API_KEY` - Google Gemini API key
- `CLOUDINARY_*` - Cloudinary configuration (optional)

### Getting API Keys

#### MONGO db

1. Go to MONGODB
2. And add the server details

#### Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret
3. Add them to your `.env` file

## 🏗 Project Structure

```
chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── lib/            # Database, utilities
│   │   ├── middlewares/    # Authentication middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Helper functions
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── component/      # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand stores
│   │   └── lib/            # Utilities
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the existing issues
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce
