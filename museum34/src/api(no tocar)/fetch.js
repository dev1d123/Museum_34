const API_BASE = 'http://127.0.0.1:8000/api/';

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