import { Routes, Route } from "react-router-dom/dist";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import { AuthProvider } from "./context/authContext";
import Blog from "./pages/Blog";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/blogs/blog/:slug" element={<Blog />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ div>
    </AuthProvider>
  )
}

export default App
