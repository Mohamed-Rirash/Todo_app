import axios from 'axios'

const API_KEY = "http://127.0.0.1:8000";


// Get user goals
const getTodos = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(API_KEY, config);
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        throw error; // Re-throw the error to propagate it to the Redux thunk
    }
};



  const todoService = {
    getTodos
  }

  export default todoService