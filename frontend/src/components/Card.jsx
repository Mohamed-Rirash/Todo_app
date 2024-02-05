import { useState } from "react";
import { deleteTodo } from "../api/todosApi";
import { updateTodo } from "../api/todosApi";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";

function Card({ title, description, complete, priority, id }) {
  //
  const token = useSelector((state) => state.auth.token);
  const [input, setInput] = useState({ complete });
  console.log("card", input.complete);
  const queryClient = useQueryClient();
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const deletePost = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://127.0.0.1:8000/todo/${id}`, {
        headers,
        data: {
          title: title,
          description: description,
          priority: priority,
          complete: complete,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const delet = () => {
    console.log("card", id);
    deletePost.mutate(id);
  };

  //

  const updateTodoMutation = useMutation({
    mutationFn: async (id, input) => {
      await axios.delete(`http://127.0.0.1:8000/todo/${id}`, {
        headers,
        input,
      });
    },
  });

  const handleCheckboxChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      complete: e.target.checked,
    }));

    if (e.target.checked) {
      // Trigger the mutation when the checkbox is checked
      updateTodoMutation.mutate({
        input,
        id,
      });
    }
  };
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
            onChange={handleCheckboxChange}
            type="checkbox"
            checked={input.complete}
            className="border-2 rounded-full w-8 h-8 border-[#CBCBCB]"
          />
          <img src="/edit.png" alt="" />
          <img onClick={delet} src="/trash.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Card;
