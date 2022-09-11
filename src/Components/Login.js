import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import login_illus from "../Assests/image/login.png";
import { useUserLoginMutation } from "../Redux/Services/userAuthApi";
import { getToken, storeToken } from "../Redux/Services/localStorage";
import { useDispatch } from "react-redux";
import { setUserToken } from "../Redux/State/authSlice";
const Login = () => {
  let navigate = useNavigate();
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const [alert, setAlert] = useState({
    status: false,
    msg: " ",
    type: " ",
  });

  const [newData, setNewData] = useState({
    email: " ",
    password: " ",
  });

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (newData.email && newData.password) {
      const res = await userLogin(newData);
      console.log(res);
      if (res.data) {
          setAlert({
            status: true,
            msg: "Login Success!",
            type: "success",
          });
          storeToken(res.data.access_token)
          navigate("/dashboard")
      }
      else if(!res.data){
        setAlert({
          status: true,
          msg: res.error.data.message,
          type: "danger",
        });

      }
    } else {
      setAlert({
        status: true,
        msg: "All fields Are Required!",
        type: "danger",
      });
    }
  };

  let token=getToken('token');
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(setUserToken({token:token}))
    
  }, [token,dispatch])
  

  return (
    <div>
      <div className="registration__bg flex items-center justify-center gap-14">
        <div className="w-[30%] bg-transparent">
          <img className="  text-transparent" src={login_illus} alt="" />
        </div>
        <form
          className=" bg-transparent p-12 my-24 rounded-lg w-[50%] 
         items-center justify-center"
          id="formId"
          onSubmit={loginSubmit}
        >
          <h1 className="text-3xl text-left font-bold text-[#0052cc]">
            Welcome Back!
          </h1>
          <p className="text-sm text-left my-5">Please login to your account</p>
          <div className="my-5 w-[100%]">
            <input
              className=" py-3 px-5 border-2 w-full rounded-md focus:outline-none mt-4"
              type="text"
              name="email"
              required
              placeholder="Enter Your Email"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  email: e.target.value,
                })
              }
            />

            <input
              className=" py-3 px-5 border-2 w-full rounded-md focus:outline-none mt-4"
              type="password"
              name="password"
              id=""
              required
              placeholder="Password"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  password: e.target.value,
                })
              }
            />
          </div>
          <input
            type="submit"
            className="singin__btn my-5 w-[100%] px-5 py-3 rounded text-md text-white hover:bg-[#0052cccc] bg-[#0052cc] cursor-pointer"
            value="Sign in"
          />
          {alert.status ? <Alert variant={alert.type}>{alert.msg}</Alert> : " "}

          <p className="text-center my-8">
            Don't have any account?{" "}
            <Link
              className="text-[#0052cc] cursor-pointer no-underline"
              to="/registration"
            >
              Sign Up
            </Link>
          </p>
          <Link
            className="text-[#0052cc] cursor-pointer no-underline"
            to="/forgotpassword"
          >
            Forget Password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
