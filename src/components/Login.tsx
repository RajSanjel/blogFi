import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

const Login = () => {
    return (
        <Dialog>
            <DialogTrigger className="py-2  px-3 border-2 rounded-lg text-slate-900">Login</DialogTrigger>
            <DialogContent className="w-3/4 rounded-lg md:w-1/2 lg:w-3/12">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center mb-3">Log In</DialogTitle>
                    <form>
                        <DialogDescription>
                            <span className="grid gap-3 text-lg text-slate-950">

                                <label htmlFor="email">
                                    Email/Username
                                    <Input type="email" id="email" placeholder="Email/Username" autoComplete="username" />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <Input type="password" id="password" placeholder="Password" autoComplete="current-password" />
                                </label>
                                <Button type="submit">Login</Button>
                            </span>
                        </DialogDescription>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog >
    );
}

export default Login;
