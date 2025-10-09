import { useState } from "react";
import icon from "../assets/logo.svg";

const Header = () => {
  const [clicked, setClicked] = useState(1);
  return (
    <>
      <nav className="fixed flex top-0 z-50 w-full bg-white border-b border-gray-100">
        <div className="p-3 flex items-center w-full justify-between">
          {/* Menu bar */}
          <div className="flex">
            <img src={icon} height={30} width={50} />
            <h1 className="[font-family:'Poppins',sans-serif] text-blue-500 text-2xl my-auto">
              AI
              <span className="[font-family:'Pacifico',cursive] my-auto">
                lab
              </span>
            </h1>
            <div className="flex space-x-2 ml-3">
              <h1
                className={`${
                  clicked == 1 && "text-blue-500"
                } cursor-pointer my-auto`}
                onClick={() => setClicked(1)}
              >
                {" "}
                Home{" "}
              </h1>
              <h1
                className={`${
                  clicked == 2 && "text-blue-500"
                } cursor-pointer my-auto`}
                onClick={() => setClicked(2)}
              >
                {" "}
                Filter{" "}
              </h1>
            </div>
          </div>
          {/* Search and login bar */}
          <div className="flex mr-5 space-x-2">
            <input
              className="border border-gray-200 rounded px-3 py-1"
              placeholder="Search for projects..."
            />
            <button className="border border-gray-200 rounded px-3 py-1 cursor-pointer">
              Log in
            </button>
            <button className="bg-blue-600 rounded px-4 py-1 text-white cursor-pointer">
              Register
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
