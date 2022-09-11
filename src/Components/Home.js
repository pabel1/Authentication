import React from "react";
import homeImg from "../Assests/image/home.png";
const Home = () => {
  return (
    <div className=" mx-auto text-center">
      <h1 className=" mt-3">
        For Feel All Authentication you should Login or Registration.....{" "}
      </h1>
      <div className=" flex items-center justify-center mt-4">
        <img
          
          src={homeImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
