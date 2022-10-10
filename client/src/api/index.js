import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
      req.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});


export const sendSignUp = async (form) => {
    try {
        const response = await API.post('/user/signup', form);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('usertype', response.data.type)
        window.location.reload()
    }
    catch (error) {
        return error.response.data.message
    }
}


export const sendSignIn = async (form) => {
    try {
        const response = await API.post('/user/signin', form);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('usertype', response.data.type)
        window.location.reload()
    }
    catch (error) {
        return error.response.data.message
    }
}


export const sendAddEmployee = async (form) => {
    try {
        const response = await API.post('/employee/add', form);
        alert(response.data.message)
    }
    catch (error) {
        return error.response.data.message
    }
} 


export const getAllEmployees = async () => {
    try {
        const response = await API.get('/employee/getall');
        return response.data.employees
    }
    catch (error) {
        return []
    }
} 


export const sendAddTask = async (form) => {
    try {
        const response = await API.post('/task/add', form);
        alert(response.data.message)
    }
    catch (error) {
        return error.response.data.message
    }
}


export const getEmployeeTask = async (username) => {
    try {
        const response = await API.post('/employee/tasks', {username});
        return response.data
    }
    catch (error) {
        return {}
    }
} 


export const getMyTasks = async () => {
    try {
        const response = await API.get('/employee/mytasks');
        return response.data
    }
    catch (error) {
        return {}
    }
} 


export const getTasksByDate = async (username, date) => {
    try {
        const response = await API.post('/employee/tasksbydate', {username: username,date: date});
        return response.data
    }
    catch (error) {
        return {}
    }
} 

export const getMyTasksByDate = async (date) => {
    try {
        const response = await API.post('/employee/mytasksbydate', {date: date});
        return response.data
    }
    catch (error) {
        return {}
    }
} 

export const sendDeactivateEmployee = async (username) => {
    try {
        const response = await API.post('/employee/deactivate', {username: username});
        alert(response.data.message)
    }
    catch (error) {
        alert(error.response.data.message)
    }
} 

export const sendEditProfile = async (form) => {
    try {
        const response = await API.post('/employee/edit', form);
        alert(response.data.message)
    }
    catch (error) {
        return error.response.data.message
    }
}

export const getCurrentProfile = async () => {
    try {
        const response = await API.get('/employee');
        return response.data.profile
    }
    catch (error) {
        return null
    }
}
