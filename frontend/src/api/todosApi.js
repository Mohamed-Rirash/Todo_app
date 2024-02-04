import axios from "axios";

const todosApi = axios.create({
    baseURL:"http://127.0.0.1:8000"
})


export const getTodos = async () => {
    const response = await todosApi.get("/todos")
     return response.data
}

export const addTodo = async (todo) => {
    return await todosApi.post("/todos", todo)
}

export const updateTodo = async (todo) => {
    return await todosApi.patch(`/todos/${todo.id}`, todo)
}

export const deleteTodo = async ({ id }) => {
    return await todosApi.delete(`/todos/${id}`, id)
}

export default todosApi 