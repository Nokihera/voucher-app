import React from "react";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const BreadCrumb = ({ title }) => {
  return (
    <div className=" flex items-center gap-2 px-7">
      <Link to="/" className="text-gray-700 font-bold flex items-center gap-1">
      <IoHome className="text-gray-700 font-bold" /> Home 
      </Link>
      <span>/</span>
       <Link to={"#"} className="text-gray-500 font-semibold">{title}</Link>
    </div>
  );
};

export default BreadCrumb;
