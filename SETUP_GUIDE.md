# Hemanth Challa Portfolio - Setup Guide

## 🚀 How to Run Your Portfolio Locally

### Prerequisites
Before starting, make sure you have installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Python** (version 3.8 or higher) - [Download here](https://www.python.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

---

## Step 1: Download the Code

### Option A: From Current Environment
Copy these folders from the current development environment:
```
/app/frontend/  → Copy to your local machine
/app/backend/   → Copy to your local machine
```

### Option B: From GitHub (after uploading)
```bash
git clone https://github.com/YOUR_USERNAME/hemanth-portfolio.git
cd hemanth-portfolio
```

---

## Step 2: Setup Backend (API Server)

### 2.1 Navigate to Backend Folder
```bash
cd backend
```

### 2.2 Create Python Virtual Environment
```bash
# Create virtual environment
python -m venv portfolio_env

# Activate it (Windows)
portfolio_env\Scripts\activate

# Activate it (Mac/Linux)
source portfolio_env/bin/activate
```

### 2.3 Install Backend Dependencies
```bash
pip install -r requirements.txt
```

### 2.4 Setup Environment Variables
Create a file named `.env` in the backend folder:
```bash
# backend/.env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
```

### 2.5 Start MongoDB Database
Make sure MongoDB is running on your computer:

**Windows:**
```bash
mongod
```

**Mac (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 2.6 Start Backend Server
```bash
python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

✅ **Backend should now be running at:** `http://localhost:8001`

---

## Step 3: Setup Frontend (React App)

### 3.1 Open New Terminal and Navigate to Frontend
```bash
cd frontend
```

### 3.2 Install Frontend Dependencies
```bash
# Install Yarn if you don't have it
npm install -g yarn

# Install dependencies
yarn install
```

### 3.3 Setup Environment Variables
Create a file named `.env` in the frontend folder:
```bash
# frontend/.env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### 3.4 Start Frontend Development Server
```bash
yarn start
```

✅ **Frontend should now be running at:** `http://localhost:3000`

---

## Step 4: Access Your Portfolio

1. **Open your browser** and go to: `http://localhost:3000`
2. **Your portfolio should load** with the colorful design
3. **Test the contact form** - it should successfully submit messages
4. **Check all sections** - Hero, About, Experience, Projects, Contact

---

## 🔧 Troubleshooting

### Backend Issues

**Problem: "ModuleNotFoundError"**
```bash
# Make sure virtual environment is activated
source portfolio_env/bin/activate  # Mac/Linux
portfolio_env\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

**Problem: "Database connection failed"**
```bash
# Check if MongoDB is running
# Windows:
net start MongoDB

# Mac:
brew services list | grep mongodb

# Linux:
sudo systemctl status mongod
```

**Problem: "Port 8001 already in use"**
```bash
# Kill existing process
# Windows:
netstat -ano | findstr :8001
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:8001 | xargs kill -9
```

### Frontend Issues

**Problem: "Command not found: yarn"**
```bash
npm install -g yarn
```

**Problem: "Port 3000 already in use"**
```bash
# The app will automatically suggest port 3001
# Or manually specify:
yarn start --port 3001
```

**Problem: "Backend API not connecting"**
- Check that backend is running on `http://localhost:8001`
- Check the `.env` file in frontend folder
- Verify `REACT_APP_BACKEND_URL=http://localhost:8001`

---

## 📁 Project Structure

```
portfolio/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ColorfulPortfolio.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── data/            # Mock data
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   └── App.js          # Main app component
│   ├── public/             # Static files
│   ├── package.json        # Dependencies
│   └── .env               # Environment variables
│
└── backend/                # FastAPI Python server
    ├── models/             # Data models
    ├── routes/             # API routes
    ├── services/           # Business logic
    ├── server.py          # Main server file
    ├── requirements.txt   # Python dependencies
    └── .env              # Environment variables
```

---

## 🌐 Testing Your Portfolio

### 1. Test Contact Form
- Fill out: Name, Email, Message
- Click "Send Message"
- Should see success notification
- Check browser console for any errors

### 2. Test Navigation
- Click all navigation links (Home, About, Experience, Projects, Contact)
- Should smoothly scroll to each section

### 3. Test Responsive Design
- Resize browser window
- Test on mobile/tablet sizes
- All sections should adapt properly

### 4. Test Projects Toggle
- Click "Show All Projects" button
- Should expand to show academic projects
- Click again to hide them

---

## 🚀 Ready for Deployment?

Once everything works locally, you can deploy to:
- **Frontend:** Vercel, Netlify, or GitHub Pages
- **Backend:** Railway, Heroku, or Digital Ocean
- **Database:** MongoDB Atlas (cloud)

Need help with deployment? Let me know!

---

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Make sure both servers are running simultaneously
4. Check browser console for JavaScript errors
5. Check terminal for server errors

**Your portfolio includes:**
- ✅ Professional project showcase
- ✅ Skills categorization  
- ✅ Working contact form with database
- ✅ Responsive design
- ✅ Smooth animations and interactions
- ✅ Modern colorful design

Happy coding! 🎉