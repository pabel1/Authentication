import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import illus from "../Assests/image/regi.png";
import { useUserRegistrationMutation } from "../Redux/Services/userAuthApi";
import { storeToken } from "../Redux/Services/localStorage";
const Registration = () => {
  let navigate = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    msg: " ",
    type: " ",
  });
  const [newData, setNewData] = useState({
    firstname: " ",
    lastname: " ",
    email: " ",
    password: " ",
    trams: " ",
  });
  const [userRegistration, resInfo] = useUserRegistrationMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      newData.firstname &&
      newData.lastname &&
      newData.email &&
      newData.password &&
      newData.confirmPassword &&
      newData.trams
    ) {
      if (newData.password === newData.confirmPassword) {
        const res = await userRegistration(newData);
        console.log(res.data);
        console.log(resInfo);
        if (res.data) {
          setAlert({
            status: true,
            msg: res.data.message,
            type: "success",
          });
          storeToken(res.data.access_token);
          navigate("/dashboard");
        } 
        else if(!res.data) {
          setAlert({
            status: true,
            msg: res.error.data.message,
            type: "danger",
          });
        }
      } else {
        setAlert({
          status: true,
          msg: "Same Password are Required!",
          type: "danger",
        });
      }
    } else {
      setAlert({
        status: true,
        msg: "All Fields are Required!",
        type: "danger",
      });
    }
  };
  return (
    <div>
      <div className="registration__bg flex items-center justify-center gap-14">
        <div className="w-[30%] bg-transparent">
          <img className="  text-transparent" src={illus} alt="" />
        </div>
        <form
          className=" bg-transparent p-12 my-24 rounded-lg w-[50%]  items-center justify-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-left font-bold text-[#0052cc]">
            Create Account
          </h1>
          <p className="text-sm text-left my-5">
            Fill in the details below to create an account
          </p>
          <div className="my-5 w-[100%]">
            <input
              className=" py-3 px-5 border-2 w-full rounded-md  focus:outline-none mt-4"
              type="text"
              name="firstName"
              id=""
              required
              placeholder="Enter Your First Name"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  firstname: e.target.value,
                })
              }
            />
            <input
              className=" py-3 px-5 border-2 w-full rounded-md focus:outline-none mt-4"
              type="text"
              name="lastName"
              id=""
              required
              placeholder="Enter Your Last Name"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  lastname: e.target.value,
                })
              }
            />

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
            <input
              className=" py-3 px-5 border-2 w-full rounded-md focus:outline-none mt-4"
              type="password"
              name="confirmpassword"
              id=""
              required
              placeholder="Confirm Password"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  confirmPassword: e.target.value,
                })
              }
            />
            <div className=" flex items-center text-zinc-700 gap-5 my-3 text-[18px]">
              <input
                className=" m-3 p-3 placeholder:text-[18px] focus:outline-none border rounded-md border-gray-300 text-[16px] font-medium "
                type="checkbox"
                required
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    trams: e.target.checked,
                  })
                }
              />
              <p>
                I read and agree to the{" "}
                <span className=" text-blue-800">Terms</span> &{" "}
                <span className=" text-blue-800">Conditions</span>{" "}
              </p>
            </div>
          </div>
          <button
            // type="submit"
            className="singin__btn my-2 w-[100%] px-5 py-3 rounded text-md text-white hover:bg-[#0052cccc] bg-[#0052cc] cursor-pointer"
            value="Create Account"
          >
            Create Account
          </button>
          {alert.status ? <Alert variant={alert.type}>{alert.msg}</Alert> : " "}
          <p className="text-center my-8">
            Already have an account?{" "}
            <Link
              className="text-[#0052cc] cursor-pointer no-underline"
              to="/login"
            >
              Sign in
            </Link>
          </p>
          <Link
            className="text-[#0052cc] cursor-pointer no-underline"
            to="/forgotpassword"
          >
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Registration;
