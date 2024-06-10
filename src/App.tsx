import { Routes, Route } from "react-router-dom/dist";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </ div>
  )
}

export default App
