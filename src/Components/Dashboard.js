import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getToken } from "../Redux/Services/localStorage";
import { useGetLogedUserQuery } from "../Redux/Services/userAuthApi";
import { setUserInfo } from "../Redux/State/userSlice";

const Dashboard = () => {
  const { data, isSuccess } = useGetLogedUserQuery(getToken());
  console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  return (
    <div className="">
      <div className=" shadow-lg  p-12 mt-8 mx-auto w-[50%] rounded-lg  ">
        {data && (
          <div>
            <h1>{data.user.firstname} {data.user.lastname} </h1>
            <br />
            <h1>{data.user.email} </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
