import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./page/Auth";
import Home from "./page/Home";
import Navbar from "./component/Navbar/Navbar";
import { AuthProvider } from "./lib/AuthContext";
import Profile from "./page/Profile";
import AddBlog from './page/AddBlog';


export default function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path ="/profile" element={<Profile/>} />
        <Route path ='/add-blog' element={<AddBlog/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  );
}
