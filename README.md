# Task Manager Backend

This is the **backend service** for the Task Manager application.  
It is built with **Node.js** and **Express**, bundled using **Webpack**, and uses **Babel** for modern JavaScript support.  

---

## 🚀 Features
- 🌐 **Express.js API** for handling task management requests  
- 🔄 **Nodemon** for development hot reloading  
- 🏗️ **Babel** for modern JavaScript (ES6+) transpilation  
- 📦 **Webpack** for production bundling  
- 📝 **Morgan** for request logging  
- 🔑 **UUID** for generating unique task IDs  
- 🔒 **CORS** enabled for cross-origin access  

---

## 📂 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/Gourav-99/Task-Management-BE.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run in development mode
```bash
npm run dev
```

### 4. Build the project
```bash
npm run build
```

### 5. Run Test Cases
```bash
npm run test
```

### 6. Run production build
```bash
npm start
```
---

## 🛠️ Tech Stack
- **Node.js**  
- **Express.js 5**  
- **Babel 7**  
- **Webpack 5**  
- **Nodemon**  

---

## 📖 Folder Structure
```
task-manager-backend/
├── src/             # Source code
│   ├── server.js    # Main entry point for Express server
│   ├── routes/      # API routes
│   ├── controllers/ # Request handlers
│   ├── db/          # Data
│   └── middleware/  # Custom middlewares
|   └── tests/       # Unit test cases
├── dist/            # Production build (output from Webpack)
├── package.json     # Dependencies and scripts
├── webpack.config.js # Webpack configuration
└── README.md        # Project documentation
```

---

## 📜 API Endpoints (Example)
> You can extend as needed.  

- `GET /tasks` → Get all tasks  
- `POST /tasks` → Create a new task  
- `PUT /tasks/:id` → Update a task  
- `DELETE /tasks/:id` → Delete a task  

---

## 🤝 Contributing
1. Fork the repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m "Added new feature"`)  
4. Push to your branch (`git push origin feature-name`)  
5. Create a Pull Request  

---
