import React, {  useState } from "react";

import Alert from "react-bootstrap/Alert";
import { useResetPasswordMutation } from "../Redux/Services/userAuthApi";

const ForgotePassword = () => {
  const [resetPassword, resInfo] = useResetPasswordMutation();
  // let navigate = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    msg: " ",
    type: " ",
  });

  const [newData, setNewData] = useState({
    email: " ",
  });

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (newData.email !== null && newData.email.length > 0) {
      const res = await resetPassword(newData);
      // document.getElementById("formId").reset();
      if (res.data) {
        console.log(res);
        console.log(resInfo);
        
        setAlert({
          status: true,
          msg: res.data.message,
          type: "success",
        });
        
      }
      else if (!res.data) {
        setAlert({
          status: true,
          msg: res.error.data.message,
          type: "danger",
        });
      }
    } else {
      setAlert({
        status: true,
        msg: "Enter Valid Email First!",
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
          <p className="text-sm text-left my-2">Please Enter your Email</p>
          <div className="my-3 w-[100%]">
            <input
              className=" py-3 px-5 border-2 w-full rounded-md focus:outline-none mt-4"
              type="text"
              name="email"
              // required
              placeholder="Enter Your Email"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  email: e.target.value,
                })
              }
            />
          </div>
          <input
            type="submit"
            className="singin__btn my-2 w-[20%] px-5 py-3 rounded text-md text-white hover:bg-[#0052cccc] bg-[#0052cc] cursor-pointer"
            value="Next"
          />
          {alert.status ? <Alert variant={alert.type}>{alert.msg}</Alert> : " "}
        </form>
      </div>
    </div>
  );
};

export default ForgotePassword;
