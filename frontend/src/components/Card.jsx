import { useState } from "react";

function Card({ title, description, complete, priority, id }) {
  const [input, setInput] = useState({ complete });
  console.log("card", input.complete);
  return (
    <div className="bg-white w-full sm:max-w-[700px] my-6  px-4 py-6 rounded flex items-center flex-col sm:flex-row shadow border-bg-gray-200">
      <div className=" sm:max-w-[306px] w-full">
        <h1 className="font-medium text-xl mb-2">{title} </h1>
        <p className="text-xs text-[#AFAFAF] max-w-[306px] ">{description}</p>
      </div>
      <div className=" h-full w-full mt-4 sm:mt-0 flex sm:items-center sm:justify-around flex-col sm:flex-row">
        <div className="">
          <h2 className="text-[#AFAFAF] font-bold">Priority</h2>
          <h3 className="font-bold low">{priority}</h3>
        </div>
        <div className="mt-4 flex gap-x-10 items-center pb-4">
          <input
            onChange={(e) =>
              setInput((prevInput) => ({
                ...prevInput,
                completed: e.target.checked,
              }))
            }
            type="checkbox"
            checked={input.complete}
            className="border-2 rounded-full w-8 h-8 border-[#CBCBCB]"
          />
          <img src="/edit.png" alt="" />
          <img src="/trash.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Card;
