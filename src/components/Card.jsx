import {
  TrendingDown,
  Trash2,
  PencilLine,
  CircleAlert,
  TrendingUp,
} from "lucide-react";
import { useDeleteTask, useUpdateStatus, useEditTask } from "../hooks/useTasks";
import { useState } from "react";

const Card = ({ bgColor, data, editingIndex, setEditingIndex }) => {
  const { _id, task, description, priority, createdAt, completed } = data;
  const { mutate: deleteTask} = useDeleteTask();
  const { mutate: editStatus } = useUpdateStatus();
  const { mutate: editTask } = useEditTask();

  // editing values
  const [selectedTask, setSelectedTask] = useState(task);
  const [selectedDesc, setSelectedDesc] = useState(description);
  const [selectedPriority, setSelectedPriority] = useState(priority);

  //Delete Function :-
  const handleDelete = (id) => {
    console.log(id);
    deleteTask(id);
  };

  //Handle complete :-
  const handleComplete = async (id) => {
    console.log(id);
    const editedtask = { id: id, completed: true };
    editStatus(editedtask);
  };

  //Handle edit :-

  let isEditing = editingIndex === _id;

  const handleEdit = (_id) => {
    if (isEditing) {
      setEditingIndex(null);
    } else {
      setEditingIndex(_id);
    }
  };

  const handleEditSubmit = (id) => {
    const newEditedTask = {
      id,
      task: selectedTask,
      description: selectedDesc,
      priority: selectedPriority,
    };
    console.log(newEditedTask);
    editTask(newEditedTask);
    setEditingIndex(null);
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
  };

  return (
    <div
      className={`w-[340px] sm:w-[370px] relative flex flex-col shadow-lg border-2 border-white ${bgColor} ${"black"} h-[300px] sm:h-[320px] rounded-xl`}
    >
      {/* completed blurness */}
      <div
        className="flex flex-col h-[300px] sm:h-[320px] w-[340px] sm:w-[370px] absolute z-20 top-0 left-0 right-0 flex justify-center items-center backdrop-blur-md rounded-xl"
        style={{ display: completed ? "flex" : "none" }}
      >
        <div>
          <p className="text-[28px] font-bold rotate-45">Completed</p>
        </div>
        <div className="absolute bottom-8 left-8">
          <button
            className="py-2 px-2 bg-white/50 backdrop-blur-sm text-red-400 shadow-sm border border-white/30 border-none rounded-md"
            onClick={(e) => {
              handleDelete(_id);
            }}
          >
            <Trash2 size={"20px"} />
          </button>
        </div>
      </div>

      {/* Tared Tape */}
      <div className="absolute top-[-15px] left-[20px] w-[80px] h-[25px] bg-yellow-300 rotate-[-3deg] shadow-md z-30 rounded-sm"></div>
      <div className="absolute top-[-15px] right-[30px] w-[80px] h-[25px] bg-yellow-300 rotate-[5deg] shadow-md z-30 rounded-sm"></div>

      {/* Priority and Dates div */}
      <div className="flex justify-between px-5 h-[58px] py-3 text-red-600">
        {isEditing ? (
          <select
            className="rounded-md cursor-pointer outline-none"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="medium">medium</option>
            <option value="low">low</option>
            <option value="high">high</option>
          </select>
        ) : (
          <div className="flex text-[16px] bg-white/50 backdrop-blur-sm shadow-sm border border-white/30 justify-center h-[32px] py-1 px-4 rounded-2xl">
            <span
              className={`mr-2 font-bold ${
                priority == "high"
                  ? "text-green-500"
                  : priority == "low"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {priority === "high" ? (
                <TrendingUp />
              ) : priority == "low" ? (
                <TrendingDown />
              ) : (
                <CircleAlert />
              )}
            </span>
            <p className="font-bold">{priority}</p>
          </div>
        )}
        <div className="flex bg-white/50 backdrop-blur-sm shadow-sm border border-white/30 items-center h-[32px] justify-center py-1 px-4 rounded-2xl">
          <p className="font-bold text-[14px]">{createdAt.split("T")[0]}</p>
        </div>
      </div>

      {/* Second Contents div */}
      <div className="px-5 h-[200px]">
        <div className="py-1">
          {isEditing ? (
            <input
              type="text"
              value={selectedTask}
              className="py-2 ps-2 pe-3 w-[328px] rounded-md"
              onChange={(e) => {
                setSelectedTask(e.target.value);
              }}
            />
          ) : (
            <p className="text-[20px] font-bold">{task}</p>
          )}
          {/* <p className="text-[20px] font-bold">{task}</p> */}
        </div>
        <div className="py-1 h-[150px] flex justify-center overflow-hidden">
          {isEditing ? (
            <input
              type="text"
              value={selectedDesc}
              className="py-2 ps-2 pe-3 w-[320px] rounded-md"
              onChange={(e) => setSelectedDesc(e.target.value)}
            />
          ) : (
            <p className="font-medium text-[16px]">{description}</p>
          )}
        </div>
      </div>

      {/* options Div -edit , delete , done */}
      <div className="flex items-center px-7 text-red-600 justify-between h-[55px]">
        {isEditing ? (
          <div className="flex justify-between w-full">
            <button
              className="py-2 px-4 w-[100px] bg-red-300 text-black border-2 border-white font-semibold rounded-md"
              onClick={handleEditCancel}
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 w-[100px] bg-green-300 text-black border-2 border-white font-semibold rounded-md"
              onClick={() => handleEditSubmit(_id)}
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <div>
              <button
                className="py-2 px-2 bg-white/50 backdrop-blur-sm shadow-sm border border-white/30 border-none rounded-md mr-2"
                onClick={() => handleEdit(_id)}
              >
                <PencilLine size={"20px"} />
              </button>
              <button
                className="py-2 px-2 bg-white/50 backdrop-blur-sm shadow-sm border border-white/30 border-none rounded-md"
                onClick={(e) => {
                  handleDelete(_id);
                }}
              >
                <Trash2 size={"20px"} />
              </button>
            </div>
            <div
              className="flex items-center py-2 bg-white/50 backdrop-blur-sm shadow-sm font-semibold border border-white/30 px-3 rounded-md cursor-pointer"
              onClick={() => handleComplete(_id)}
            >
              ✅ Mark Done
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
