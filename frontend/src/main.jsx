
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import "../src/style/style.css"
import { AuthProvider } from './context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
    <App />
  </BrowserRouter>,
  </AuthProvider>
)
