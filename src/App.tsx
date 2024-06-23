import './index.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import Blog from "./pages/Blog";
import { BlogProvider } from "./context/blogContext";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <BlogProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/blog/:slug" element={<Blog />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BlogProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
