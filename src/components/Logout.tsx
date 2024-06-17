
import { useAuth } from "@/context/authContext";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function Logout() {
    const { logout } = useAuth();
    return (
        <Dialog>
            <DialogTrigger>Logout</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to logout?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" onClick={logout}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}