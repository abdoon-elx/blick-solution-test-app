# 🛒 Shopping List App


---

## Localhost Setup Instructions

### 1. Clone the Repository install

```bash
git clone https://github.com/abdoon-elx/blick-solution-test-app.git
cd blick-solution-test-app/backend
npm install

```
### 2. Install MongoDB and Create a .env file in backend/:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopping-list

```
### 3. Build & Run the backend:

```
npm run build    # Compiles TypeScript
npm start        # Runs compiled JavaScript

Or during development:

npm run dev
```
### 4. Setup Frontend
```
cd ../frontend
npm install
```
### 5. Create a .env file in frontend/ to point the backend url:
```
VITE_API_URL=http://localhost:5000
```

### 5. Run the frontend

```
npm run dev
```
---

## 🚀 Tech Stack used

- **Frontend:** React + TypeScript + Bootstrap (for UI/ UX) 
- **Backend:** Express.js + TypeScript
- **Database:** MongoDB with Mongoose
- **API Design:** RESTful
- **State Management:** React useState + useEffect
- **UI Toolkit:** Bootstrap (v5+)



