import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import Categ from './pages/Categ.jsx';
import Submit from './pages/Submit.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:passkey" element={<Categ />} />
          <Route path="/:passkey/submit" element={<Submit />} />
          <Route path="/:passkey/:submit/:value" element={<Submit />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
// fhfgh
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export default App