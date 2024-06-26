import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { UserDataDropDown } from "./UserDataDropDown";

type MenuItemsProps = {
    title: string,
    path?: string,
    isButton?: boolean
    isOutline?: boolean
}[]

const Navbar = () => {
    const { isAuth } = useAuth();

    const menuItems: MenuItemsProps = [
        ...(isAuth ?
            [{
                title: "Create",
                path: "/create"
            }] : []
        ),
        {
            title: "Blogs",
            path: "/blogs"
        }]
    const [isHamburger, setIsHamburger] = useState(false)
    return (
        < nav className="bg-white w-full border-gray border-b-2 shadow-md mb-8 " >
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-20 md:max-w-[1600px] ">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link to="/" className="text-2xl font-bold text-slate-900">BlogFi</Link>
                    <div className="md:hidden">
                        <button
                            className="text-gray-900 outline-none p-2 rounded-md focus:border-gray-600 focus:border"
                            onClick={() => setIsHamburger(!isHamburger)}
                        >
                            <Menu />
                        </button>
                    </div>
                </div>
                <div
                    className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${isHamburger ? "block" : "hidden"
                        }`}
                >
                    <ul className="justify-end items-center space-y-8 md:flex md:space-x-8 md:space-y-0">
                        {menuItems.map((item, idx) => (
                            <li key={idx} className="text-slate-900 hover:text-slate-600">
                                <Link to={item.path || "/"} onClick={() => setIsHamburger(false)}>{item.title}</Link>
                            </li>
                        ))}
                        {
                            isAuth ?
                                <>
                                    <li>
                                        <UserDataDropDown />
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <Login />
                                    </li>
                                    <li><Signup /></li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav >);
}

export default Navbar;
