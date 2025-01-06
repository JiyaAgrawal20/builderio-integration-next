"use client";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false)
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="h-40 w-80 p-10">
      
      <input
        className="py-2 px-2 mb-3 border border-black rounded-md w-80 cursor-pointer"
          value={inputValue}
          onChange={handleInput}
          placeholder="Name"
        />
       <Link href="/upload-image" className="p-2 mb-5 w-max rounded-md text-white bg-[#ff3f33] block cursor-pointer hover:opacity-85 " onClick={()=>setShowInput(!showInput)}>Next</Link>
       
    </div>
  );
};

export default Page;
