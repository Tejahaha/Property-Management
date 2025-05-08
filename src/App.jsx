import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/NavbarDemo"
import Home from "./components/landing/Home"
import Settings from "./pages/Settings"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import Properties from "./pages/Properties"
import AllProperty from "./pages/allproperty"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/sites"
              element={
                <ProtectedRoute>
                  <Properties />
                </ProtectedRoute>
              }
            />
            <Route
              path="/all-properties"
              element={
                <ProtectedRoute>
                  <AllProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
export default App
