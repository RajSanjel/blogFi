import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Input } from "./ui/input";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useAuth } from "@/context/authContext";

const Signup = () => {
    const { signup } = useAuth();
    const signupSchema = z.object({
        email: z.string().email("Invalid Email"),
        username: z.string().min(3, { message: "Username should be atleast 3 characters" }),
        name: z.string().min(3, { message: "Name should be atleast 3 characters" }),
        confirmPassword: z.string().min(8, { message: "Confirm password cannot be empty" }),
        password: z.string().min(8, { message: "Password should be atleast 8 characters" }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ["confirmPassword"],
    })

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [error, setError] = useState<string | undefined>();

    const signupData = {
        email,
        username,
        name,
        password,
        confirmPassword
    }

    const handleSignup = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const validate = signupSchema.safeParse(signupData)
        if (!validate.success) {
            const errors = validate?.error?.format()
            console.log(errors)
            setEmailError(errors?.email?._errors[0] || "")
            setNameError(errors?.name?._errors[0] || "")
            setUsernameError(errors?.username?._errors[0] || "")
            setPasswordError(errors?.password?._errors[0] || "")
            setConfirmPasswordError(errors?.confirmPassword?._errors[0] || "")
            return;
        }
        try {
            const res = await signup(signupData);
            if (res.status == 200) {
                setUsername("")
                setPassword("");
                setConfirmPassword("")
                setName("")
                setEmail("")
                setError(undefined)
                setEmailError("")
                setNameError("")
                setUsernameError("")
                setPasswordError("")
                setConfirmPasswordError("")
                return;
            }

        } catch (err: any) {
            const error = await err?.response?.data?.msg;
            setError(error)
            return;
        }

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="py-2  px-3 bg-slate-950 rounded-lg text-white hover:bg-slate-900">Signup</AlertDialogTrigger>
            <AlertDialogContent className="w-3/4 rounded-lg md:w-1/2 lg:w-3/12">
                <AlertDialogHeader>
                    {
                        error &&
                        <Alert variant="destructive" className="grid items-center text-left">
                            <AlertTitle>
                                Error
                            </AlertTitle>
                            <AlertDescription>
                                {error}
                            </AlertDescription>
                        </Alert>
                    }
                    <AlertDialogTitle className={"text-2xl text-center"}>Sign Up</AlertDialogTitle>
                    <form >
                        <AlertDialogDescription className="text-left">
                            <span className="grid gap-3 text-lg text-slate-950">
                                <label htmlFor="fullName">
                                    Full Name
                                    <span className="text-xs text-red-700 block">{nameError}</span>
                                    <Input
                                        type="text"
                                        id="fullName"
                                        placeholder="Full Name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={(e) => (setName(e.target.value))}
                                    />
                                </label>
                                <label htmlFor="username">
                                    Username
                                    <span className="text-xs text-red-700 block">{usernameError}</span>
                                    <Input
                                        type="text"
                                        id="username"
                                        placeholder="Username"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="email">
                                    Email
                                    <span className="text-xs text-red-700 block">{emailError}</span>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <span className="text-xs text-red-700 block">{passwordError}</span>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="cpassword">
                                    Confirm Password
                                    <span className="text-xs text-red-700 block">{confirmPasswordError}</span>
                                    <Input
                                        type="password"
                                        id="cpassword"
                                        placeholder="Confirm Password"
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </label>
                                <div className="grid grid-flow-col gap-3 items-end">
                                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                                    <AlertDialogAction type="submit" onClick={handleSignup}>Sign up</AlertDialogAction>
                                </div>
                            </span>
                        </AlertDialogDescription>
                    </form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default Signup;
