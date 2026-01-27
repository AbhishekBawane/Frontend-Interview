import { useState } from "react";
import logo from '@/assets/logo.png'
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/lib/AuthContext";



export default function Navbar() {
  const [open, setOpen] = useState(false);


  const {user} = useAuth();


  const navigate= useNavigate();

  const handleAuthClick =() =>{
    navigate(user? '/profile': '/auth')
  }

  return (
    <nav className="w-full bg-white">
            <div className="flex items-center justify-between h-16 px-4">
                     <div className="flex items-center gap-2 cursor-pointer" onClickCapture={()=>navigate('/')}>
                            <img src={logo} className="object-contain h-10"/>
                            <span className="font-bold text-xl font-md">CA Monk</span>
                     </div>
                     <div className=" flex item-center justify-between gap-4 px-4 py-4 bg-gray-50 max-[820px]:hidden">
                                  <a className="hover:bg-gray-400 p-2 cursor-pointer" onClick={()=> navigate('')}>Tools</a>
                                  <a className="hover:bg-gray-400 p-2 cursor-pointer">Practice</a>
                                  <a className="hover:bg-gray-400 p-2 cursor-pointer">Events</a>
                                  <a className="hover:bg-gray-400 p-2 cursor-pointer">Job Board</a>
                                  <a className="hover:bg-gray-400 p-2 cursor-pointer">Points</a>
                                  <Button className="hover:bg-gray-400 p-2 cursor-pointer" onClick={()=>navigate('/add-blog')}>Add Blog</Button>
                     </div>
                     <div className="flex items-center gap-2">
                           <Button className="bg-blue-700 p-2 cursor-pointer text-white hover:bg-blue-900 rounded-md" onClick={handleAuthClick}>{user? "Profile" : "Login"}</Button>
                           <Button className="bg-blue-700 p-2 cursor-pointer text-white hover:bg-blue-900 rounded-md min-[820px]:hidden" onClick={() => setOpen(!open)}>
                                   <Menu />
                            </Button>
                     </div>
            </div>

             {open && (
                     <div className="min-[821px]:hidden flex flex-col gap-4 px-4 py-4 bg-gray-50 text-center border-b">
                         <a className="hover:bg-gray-400 p-2 cursor-pointer" onClick={()=>navigate('/tools')}>Tools</a>
                         <a className="hover:bg-gray-400 p-2 cursor-pointer">Practice</a>
                         <a className="hover:bg-gray-400 p-2 cursor-pointer">Events</a>
                         <a className="hover:bg-gray-400 p-2 cursor-pointer">Job Board</a>
                         <a className="hover:bg-gray-400 p-2 cursor-pointer">Points</a>
                         <Button className="hover:bg-gray-400 p-2" onClick={()=>navigate('/add-blog')}>Add Blog</Button>  
                      </div>
                )}

    </nav>

  );
}
