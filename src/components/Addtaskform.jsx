import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAddTask } from "../hooks/useTasks";

const Addtaskform = ({ onCloseForm }) => {
  const [newTask, setNewTask] = useState({
    task: "",
    description: "",
    priority: "",
  });
  const [priority, setPriority] = useState("medium");
  const [isClosing, setIsClosing] = useState(false);
  const { mutate: addTask, isSuccess, isError, error ,isPending} = useAddTask();

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { ...newTask, priority: priority };
    addTask(updatedTask);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setNewTask({ task: "", description: "", priority: "" });
      onCloseForm();
    }, 300);
  };

  useEffect(()=>{
    if(isSuccess){
        setTimeout(()=>{
            setNewTask({ task: "", description: "", priority: "" });
            onCloseForm();
        },1500)
    }
  },[isSuccess]);


  return (
    <>
    {isSuccess ? (<div className="h-screen w-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-[320px] h-[230px] sm:w-[400px] sm:h-[300px] bg-green-600 rounded-lg">
            <p className="text-[24px] sm:text-[30px] font-bold text-white">
              Task Added Successfully !
            </p>
            <p className="text-[24px] sm:text-[30px]">🎉🎉✅</p>
          </div>
        </div>):isError?(<div className="h-screen w-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center w-[320px] h-[230px] sm:w-[400px] sm:h-[300px] bg-red-600 rounded-lg">
            <p className="text-[24px] sm:text-[30px] font-bold text-white pb-4">
              Something Went wrong
            </p>
            <p className="text-[24px] sm:text-[30px]">❌❌😞</p>
          </div>
        </div>):(<div
      className={`flex h-screen w-full justify-center items-center transform transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* form container */}
      <form
        className="flex flex-col h-[430px] w-[330px] sm:h-[530px] sm:w-[430px] px-8 py-5 bg-white rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center py-4">
          <p className="text-[22px] font-semibold">Add New Task</p>
          <button
            className="text-[16px] font-bold mr-3 cursor-pointer"
            onClick={handleClose}
            type="button"
          >
            <X />
          </button>
        </div>
        {/* task name */}
        <div className="flex flex-col py-1 mt-1 sm:py-2 sm:mt-2">
          <label
            htmlFor="taskName"
            className="text-[15px] sm:text-[17px] font-semibold py-1 sm:py-2"
          >
            Task Title *
          </label>
          <input
            type="text"
            id="taskName"
            name="task"
            placeholder="Enter the Task ..."
            className="border-2 border-gray-300 py-[6px] pr-6 ps-2 w-[270px] sm:py-[11px] sm:pr-12 sm:ps-3 sm:w-[365px] rounded-md"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* description */}
        <div className="flex flex-col py-2 mt-2">
          <label
            htmlFor="description"
            className="text-[15px] sm:text-[17px] font-semibold py-1 sm:py-2"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter the Description ..."
            className="border-2 border-gray-300 py-[6px] pr-6 ps-2 w-[270px] sm:py-[11px] sm:pr-12 sm:w-[365px] sm:ps-3 rounded-md"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* priority */}
        <div className="flex flex-col my-2">
          <div className="py-1 sm:py-3">
            <p className="text-[15px] sm:text-[17px] font-semibold">Priority</p>
          </div>
          <div className="flex justify-between">
            <div>
              <button
                className={`py-[5px] w-[70px] text-[14px] sm:py-[10px] sm:w-[110px] border-[2px] border-gray-300 rounded-md sm:rounded-lg sm:text-[16px] font-semibold ${
                  priority === "low" ? "bg-red-300" : "bg-transparent"
                }`}
                type="button"
                onClick={() => setPriority("low")}
              >
                Low
              </button>
            </div>
            <div>
              <button
                className={`py-[5px] w-[70px] text-[14px] sm:py-[10px] sm:w-[110px] border-[2px] border-gray-300 rounded-md sm:rounded-lg sm:text-[16px] font-semibold ${
                  priority === "medium" ? "bg-yellow-300" : "bg-transparent"
                }`}
                type="button"
                onClick={() => setPriority("medium")}
              >
                Medium
              </button>
            </div>
            <div>
              <button
                className={`py-[5px] w-[70px] text-[14px] sm:py-[10px] sm:w-[110px] border-[2px] border-gray-300 rounded-md sm:rounded-lg sm:text-[16px] font-semibold ${
                  priority === "high" ? "bg-green-300" : "bg-transparent"
                }`}
                type="button"
                onClick={() => setPriority("high")}
              >
                High
              </button>
            </div>
          </div>
        </div>
        {/* submit button */}
        <div className="flex justify-between my-2 py-5">
          <div>
            <button
              className="py-[7px] text-[14px] w-[120px] rounded-md sm:py-[9px] sm:text-[16px] font-semibold sm:w-[160px] sm:rounded-lg border-none bg-red-500"
              onClick={handleClose}
              type="button"
              disabled={isPending}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              className="py-[7px] text-[14px] w-[120px] rounded-md sm:py-[9px] sm:w-[160px] sm:text-[16px] font-semibold sm:rounded-lg border-none bg-green-500"
              type="submit"
              disabled={isPending}
            >
              {isPending?"Loading ... ":"Add Task"}
            </button>
          </div>
        </div>
      </form>
    </div>)}
    </>
  );
};

export default Addtaskform;
