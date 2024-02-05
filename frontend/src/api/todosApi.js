import { data } from "autoprefixer";
import axios from "axios";
import { useSelector } from "react-redux";



const todosApi = axios.create({
    baseURL:"http://127.0.0.1:8000"
})



export const getTodos = async (token) => {

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${token}`,
}
    const { data } = await todosApi.get(`/todos/`, { headers });
     return data
}

export const addTodo = async (todo,token) => {
    const headers = {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    return await todosApi.post("/todos",{headers}, todo)
}

export const updateTodo = async (todo) => {
    return await todosApi.patch(`/todos/${todo.id}`, todo)
}



// export const deleteTodo = async ({ id, token }) => {
//   const headers = {
//     accept: "application/json",
//     Authorization: `Bearer ${token}`,
//   };

//   try {
//     const response = await todosApi.delete(`http://127.0.0.1:8000/todos/${id}`, {
//       headers,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting todo:", error.response.data);
//     throw error;
//   }
// };

export const deleteTodo = async ({ id, token }) => {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    };


    try {
      const response = await todosApi.delete(`/todo/${id}`, {
        headers,
      },data);
      return response.data;
    } catch (error) {
      console.error("Error deleting todo:", error.response.data);
      throw error;
    }
  };
  
export default todosApi 