import { Button } from "./ui/button";

const Navbar = () => {
    return (
        <nav className="w-full h-20 bg-white shadow-md flex justify-between items-center p-8 sticky top-0 pl-20">
            <div>
                <span className="text-3xl font-semibold">
                    BlogFi
                </span>
            </div>
            <div className="grid gap-3 grid-flow-col" >
                <Button variant={"outline"}>
                    Login
                </Button>
                <Button>
                    SignUp
                </Button>
            </div>
        </nav>

    );
}

export default Navbar;
