import axios from "./axiosintance"

export const getTasks = ()=> axios.get("/get-allTasks");
export const addTask = (newTask)=> axios.post("/add-task",newTask);
export const deleteTask = (id)=> axios.delete(`/delete-task/${id}`);
export const editTask = (editedTask)=> axios.put("/edit-task",editedTask);
export const editStatus = (editedTask)=> axios.put("/edit-status",editedTask);