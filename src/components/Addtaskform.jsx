import { X } from "lucide-react"
import { useState } from "react"
import { useAddTask } from "../hooks/useTasks";

const Addtaskform = ({onCloseForm}) => {

    const [newTask,setNewTask] = useState({task:"",description:"",priority:""});
    const [priority,setPriority] = useState("medium");
    const [isClosing,setIsClosing] = useState(false);
    const {mutate:addTask,isSuccess,isError,error} = useAddTask();

    const handleChange= (e) =>{
        setNewTask({...newTask,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const updatedTask = {...newTask,priority:priority};
        addTask(updatedTask);
    }

    const handleClose = () =>{
        setIsClosing(true);
        setTimeout(()=>{
            setNewTask({task:"",description:"",priority:""});
            onCloseForm();
        },300)
    }

    if(isSuccess){
        alert("Task added successfully !");
    }

  return (
    <div className={`flex h-screen w-full justify-center items-center transform transition-opacity duration-300 ${isClosing?"opacity-0":"opacity-100"}`}>
        {/* form container */}
        <form className="flex flex-col h-[530px] w-[430px] px-8 py-5 bg-white rounded-xl" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center py-4">
                <p className="text-[22px] font-semibold">Add New Task</p>
                <button className="text-[16px] font-bold mr-3 cursor-pointer" onClick={handleClose} type="button"><X/></button>
            </div>
            {/* task name */}
            <div className="flex flex-col py-2 mt-2">
                <label htmlFor="taskName" className="text-[17px] font-semibold py-2">Task Title *</label>
                <input type="text" id='taskName' name="task" placeholder='Enter the Task ...' className="border-2 border-gray-300 py-[11px] pr-12 ps-3  w-[365px] rounded-md" onChange={(e)=>handleChange(e)}/>
            </div>
            {/* description */}
            <div className="flex flex-col py-2 mt-2">   
                <label htmlFor="description" className="text-[17px] font-semibold py-2">Description</label>
                <input type="text" name="description" id="description" placeholder="Enter the Description ..."  className="border-2 border-gray-300 py-[11px] pr-12 w-[365px] ps-3 rounded-md" onChange={(e)=>handleChange(e)}/>
            </div>
            {/* priority */}
            <div className="flex flex-col my-2">
                <div className="py-3">
                    <p className="text-[17px] font-semibold">Priority</p>
                </div>
               <div className="flex justify-between">
                 <div>
                    <button className={`py-[10px] w-[110px] border-[2px] border-gray-300 rounded-lg text-[16px] font-semibold ${priority==="low"?"bg-red-300":"bg-transparent"}`} type="button" onClick={()=>setPriority("low")}>Low</button>
                </div>
                <div>   
                    <button className={`py-[10px] w-[110px] border-[2px] border-gray-300 rounded-lg text-[16px] font-semibold ${priority==="medium"?"bg-yellow-300":"bg-transparent"}`} type="button" onClick={()=>setPriority("medium")}>Medium</button>
                </div>
                <div>
                    <button className={`py-[10px] w-[110px] border-[2px] border-gray-300 rounded-lg text-[16px] font-semibold ${priority==="high"?"bg-green-300":"bg-transparent"}`} type="button" onClick={()=>setPriority("high")}>High</button>
                </div>
               </div>
            </div>
            {/* submit button */}
            <div className="flex justify-between my-2 py-5">
                <div>
                    <button className="py-[9px] text-[16px] font-semibold w-[160px] rounded-lg border-none bg-red-500" onClick={handleClose} type="button">Cancel</button>
                </div>
                <div>
                    <button className="py-[9px] w-[160px] text-[16px] font-semibold rounded-lg border-none bg-red-500" type="submit">Add Task</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Addtaskform