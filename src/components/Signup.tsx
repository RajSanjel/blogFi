import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

const Signup = () => {
    return (
        <Dialog>
            <DialogTrigger className="py-2  px-3 bg-slate-950 rounded-lg text-white hover:bg-slate-900">Signup</DialogTrigger>
            <DialogContent className="w-3/4 rounded-lg md:w-1/2 lg:w-3/12">
                <DialogHeader>
                    <DialogTitle className={"text-2xl text-center"}>Sign Up</DialogTitle>
                    <form >
                        <DialogDescription>

                            <span className="grid gap-3 text-lg text-slate-950">
                                <label htmlFor="username">
                                    Username
                                    <Input type="text" id="username" placeholder="Username" autoComplete="username" />
                                </label>
                                <label htmlFor="email">
                                    Email
                                    <Input type="email" id="email" placeholder="Email" />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <Input type="password" id="password" placeholder="Password" autoComplete="new-password" />
                                </label>
                                <label htmlFor="cpassword">
                                    Confirm Password
                                    <Input type="password" id="cpassword" placeholder="Confirm Password" autoComplete="new-password" />
                                </label>
                                <Button type="submit">Login</Button>
                            </span>
                        </DialogDescription>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    );
}

export default Signup;
