import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Input } from "./ui/input";
import z from "zod";
import axios from "axios";
import API_CONFIG from "@/config";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
const Login = () => {
    const loginSchema = z.object(
        {
            emailOrUsername: z.string().min(3, { message: "Email or Username invalid" }),
            password: z.string().min(8, { message: "Passowrd must be atleast 8 characters" })
        }
    )
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [error, setError] = useState<string | undefined>();
    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const loginData = {
            emailOrUsername,
            password
        }
        const validate = loginSchema.safeParse(loginData)
        if (!validate.success) {
            const errors = validate?.error?.format()
            setEmailError(errors?.emailOrUsername?._errors[0] || "")
            setPasswordError(errors?.password?._errors[0] || "")
            return;
        }
        try {
            await axios.post(`${API_CONFIG.login}`, loginData).then(res => {
                if (res.status == 200) {
                    setEmailOrUsername("");
                    setPassword("");
                    setError(undefined)
                    return;
                }
            }
            )
        } catch (err: any) {
            const error = await err?.response?.data?.msg;
            setError(error)
            return;
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="py-2  px-3 border-2 rounded-lg text-slate-900">Login</AlertDialogTrigger>
            <AlertDialogContent className="w-3/4 rounded-lg md:w-1/2 lg:w-3/12">
                {
                    error &&
                    <Alert variant="destructive" className="grid items-center">
                        <AlertTitle>
                            Error
                        </AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                }
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl text-center mb-3">Log In</AlertDialogTitle>
                    <form>
                        <AlertDialogDescription className="text-left">
                            <div className="grid gap-3 text-lg text-slate-950">
                                <label htmlFor="email">
                                    Email/Username
                                    <span className="text-xs text-red-700 block">{emailError}</span>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Email/Username"
                                        autoComplete="username"
                                        value={emailOrUsername}
                                        onChange={(e) => setEmailOrUsername(e.target.value)} />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <span className="text-xs text-red-700 block">{passwordError}</span>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </label>
                                <span className="grid grid-flow-col gap-3 items-end">
                                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                                    <AlertDialogAction type="submit" onClick={handleLogin}>Login</AlertDialogAction>
                                </span>
                            </div>
                        </AlertDialogDescription>
                    </form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog >
    );
}

export default Login;
