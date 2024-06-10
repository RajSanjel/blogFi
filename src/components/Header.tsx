// import bgImage from "./images/finance.jpg"

const Header = () => {
  return (
    <div className="md:max-w-[1600px] mx-auto p-20">
      <div className="flex items-center h-[31rem] w-full font-semibold bg-[url('/src/components/images/bg.jpg')] bg-no-repeat bg-right bg-contain">
        <h1 className="text-5xl md:text-7xl pr-6">
          Finance <br />
          Stories & Tips
          <i className="text-sm block">By Experts</i>
        </h1>
      </div>
    </div>
  );
};

export default Header;
