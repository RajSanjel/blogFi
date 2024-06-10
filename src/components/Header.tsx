// import bgImage from "./images/finance.jpg"


const Header = () => {
    return (
        <div className={`h-[31rem] bg-white w-full p-20 bg-[url('/src/components/images/bg.jpg')] bg-no-repeat bg-right bg-contain font-semibold flex items-center`}>
            <h1 className="text-5xl md:text-7xl">
                Finance <br />
                Stories & Tips
                <i className="text-sm block">By Experts</i>
            </h1>

        </div>
    );
}

export default Header;
