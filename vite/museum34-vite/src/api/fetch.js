const API_BASE = 'https://museum-34-backend-4.onrender.com/api';

export const fetchData = async (endpoint, options = {}) =>{
    const response = await fetch(`${API_BASE}${endpoint}`,{
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });
    if(!response.ok){
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
}