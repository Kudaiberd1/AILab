import { useContext, useState } from "react";
import icon from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { Authorized, UserContext } from "../App";

const Header = () => {
  const navigate = useNavigate();
  const { authorized } = useContext(Authorized);
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed flex top-0 z-50 w-full bg-white border-b border-gray-100">
        <div className="p-3 flex items-center w-full justify-between">
          {/* Menu bar */}
          <div className="flex">
            <img src={icon} height={30} width={50} />
            <h1
              className="[font-family:'Poppins',sans-serif] text-blue-500 text-2xl my-auto cursor-pointer"
              onClick={() => navigate("/")}
            >
              AI
              <span className="[font-family:'Pacifico',cursive] my-auto">
                lab
              </span>
            </h1>
          </div>
          {/* Search and login bar */}
          <div className="flex mr-5 space-x-2">
            <input
              className="border border-gray-200 rounded px-3 py-1"
              placeholder="Search for projects..."
            />
            <div className="space-x-2">
              {authorized ? (
                <>
                  <div className="flex space-x-2">
                    <p
                      className="py-auto my-auto text-lg font-semibold cursor-pointer"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {user.username}
                    </p>
                  </div>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-sm shadow-sm">
                      <div className="px-4 py-3">
                        <p className="text-sm">
                          {user?.first_name ? user.first_name : user.username}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.email}
                        </p>
                      </div>
                      <hr className="border-t border-gray-200" />

                      <ul className="py-1">
                        {user.is_staff && (
                          <li>
                            <Link
                              to="/setting"
                              className="block px-4 py-2 text-sm hover:bg-gray-100 "
                            >
                              Settings
                            </Link>
                          </li>
                        )}
                        {user.is_staff && (
                          <li>
                            <Link
                              to="/add"
                              className="block px-4 py-2 text-sm hover:bg-gray-100 "
                            >
                              Add Project
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link
                            to="/logout"
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Log out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="border border-gray-200 rounded px-3 py-1 cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </button>
                  <button
                    className="bg-blue-600 rounded px-4 py-1 text-white cursor-pointer"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
