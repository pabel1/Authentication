import React, { useState } from "react";

import Alert from "react-bootstrap/Alert";
import { useChangePasswordMutation } from "../Redux/Services/userAuthApi";
import { getToken } from "../Redux/Services/localStorage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ChangePassword = () => {

  const selector= useSelector(state=>state.user);
  console.log(selector);
    const token=getToken();
  const [changePassword] = useChangePasswordMutation();
  
  const [alert, setAlert] = useState({
    status: false,
    msg: " ",
    type: " ",
  });

  const [newData, setNewData] = useState({
    newPassword: " ",
    confirmNewPassword: "",
  });
  let navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (newData.newPassword === newData.confirmNewPassword) {
      const res = await changePassword({ newData, token });
      if (res.data) {
        setAlert({
          status: true,
          msg: res.data.message,
          type: "success",
        });
        navigate("/dashboard");
      } else if (!res.data) {
        setAlert({
          status: true,
          msg: res.error.data.message,
          type: "danger",
        });
      }
    } else {
      setAlert({
        status: true,
        msg: "Same Password Are Required!",
        type: "danger",
      });
    }
  };
  return (
    <div className="  ">
      <div className=" flex items-center justify-center gap-14">
        <form
          className=" bg-transparent p-8 mt-8 rounded-lg w-[50%] 
         items-center justify-center shadow-lg"
          id="formId"
          onSubmit={loginSubmit}
        >
          <p className="text-sm text-left my-2">Reset Password </p>
          <div className="my-3 w-[100%]">
            <input
              className=" py-3 px-5 border-2 w-full rounded-md focus:outline-none mt-4"
              type="password"
              name="newpassword"
              required
              placeholder="Enter New Password"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  newPassword: e.target.value,
                })
              }
            />
            <input
              className=" py-3 px-5 border-2 w-full rounded-md focus:outline-none mt-4"
              type="password"
              name="confirmpassword"
              required
              placeholder="Confirm Password"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  confirmNewPassword: e.target.value,
                })
              }
            />
          </div>
          <input
            type="submit"
            className="singin__btn my-2 w-[35%] px-5 py-3 rounded text-md text-white hover:bg-[#0052cccc] bg-[#0052cc] cursor-pointer"
            value="Change Password"
          />
          {alert.status ? <Alert variant={alert.type}>{alert.msg}</Alert> : " "}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
