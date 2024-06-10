const Header = () => {
    return (
        <div className="md:max-w-[1600px] mx-auto md:p-20 p-5">
            <div className="flex items-center h-[25rem] w-full font-semibold md:bg-[url('/src/components/images/bg.jpg')] xl:bg-[length:600px] md:bg-[length:280px] lg:bg-[length:450px] bg-no-repeat bg-right bg-contain">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl pr-6">
                    Finance <br />
                    Stories & Tips
                    <i className="text-sm block">By Experts</i>
                </h1>
            </div>
        </div>
    );
};

export default Header;
