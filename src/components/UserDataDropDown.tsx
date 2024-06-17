import { useAuth } from "@/context/authContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Logout } from "./Logout";

export function UserDataDropDown() {
    const { user } = useAuth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Account</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Name: {user.fullName}</DropdownMenuItem>
                <DropdownMenuItem>Username: {user.username}</DropdownMenuItem>
                <DropdownMenuItem>Email: {user.email}</DropdownMenuItem>
                <div className="bg-red-600 hover:bg-red-500 p-auto text-white m-1 p-2 rounded-sm text-center">
                    <Logout />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>

    )

}