import React from "react";
import spinner from "../assets/gif/spinner-black.gif";

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
      <img src={spinner} alt="로딩중" className="w-24" />
      <span className="text-black text-2xl ml-2"></span>
    </div>
  );
};

export default Spinner;
