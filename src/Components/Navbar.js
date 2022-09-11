import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { removeToken } from "../Redux/Services/localStorage";
import { removeUserToken } from "../Redux/State/authSlice";
import { removeUserInfo } from "../Redux/State/userSlice";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUserToken({ token: null }));
    dispatch(removeUserInfo({ firstname: " ", lastname: " ", email: " " }));
    removeToken("token");
    navigate("/login");
  };

  const activeNavLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#7cbcea72" : " ",
    };
  };
  return (
    <div className=" bg-blue-900 text-white p-8 flex items-center justify-around">
      <div>
        <h1 className=" text-2xl font-bold tracking-wider">Authentication</h1>
      </div>
      <div className=" flex justify-around gap-14">
        <ul className=" flex items-center gap-5 text-[18px]">
          <li>
            <NavLink
              className=" hover:text-blue-200  px-4 py-2 rounded-md text no-underline
              text-white "
              to="/"
              style={activeNavLink}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className=" hover:text-blue-200 px-4 py-2 rounded-md no-underline text-white"
              to="/contact"
              style={activeNavLink}
            >
              Contact
            </NavLink>
          </li>
        </ul>
        {token ? (
          <div>
            <NavLink
              className=" py-3 px-8 border-none  text-[#fff]
             rounded-lg mr-4 font-semibold hover:shadow-[1px_1px_10px_1px_#0052cc] no-underline"
              to="/dashboard"
              style={activeNavLink}
            >
              Dashboard
            </NavLink>
            <button
              className=" py-3 px-8 border-none  text-[#fff]
             rounded-lg mr-4 font-semibold hover:shadow-[1px_1px_10px_1px_#0052cc] no-underline"
              onClick={handleLogout}
            >
              Logout
            </button>

            <NavLink
              className="py-3 px-8 border-[1.5px] border-[#0052cc] 
           text-white font-semibold shadow-[1px_1px_1px_1px_#0052cc] rounded-lg
            hover:shadow-[3px_2px_3px_0px_#0052cc] no-underline "
              style={activeNavLink}
              to="/changepasword"
            >
              Change Password
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink
              className=" py-3 px-8 border-none  text-[#fff]
           rounded-lg mr-4 font-semibold hover:shadow-[1px_1px_10px_1px_#0052cc] no-underline"
              to="/login"
              style={activeNavLink}
            >
              Login
            </NavLink>

            <NavLink
              className="py-3 px-8 border-[1.5px] border-[#0052cc] 
         text-white font-semibold shadow-[1px_1px_1px_1px_#0052cc] rounded-lg
          hover:shadow-[3px_2px_3px_0px_#0052cc] no-underline "
              style={activeNavLink}
              to="/registration"
            >
              Registration
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
