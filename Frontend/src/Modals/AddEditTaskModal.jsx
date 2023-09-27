import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import BoardSlice from "../redux/BoardSlice";
import { useState } from "react";

export default function AddEditTaskModal ({type, setIsTaskModalOpen, setIsAddTaskModalOpen, taskIndex, prevColIndex = 0}) {
    const dispatch = useDispatch()
    const board = useSelector((state) => state.board).find((board) => board.isActive)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const columns = board.columns;
    const col = columns.find((col, index) => index === prevColIndex);
    const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
    const [status, setStatus] = useState(columns[prevColIndex].name);
    const [newColIndex, setNewColIndex] = useState(prevColIndex);
    const [subtasks, setSubtasks] = useState([{ title: "", isCompleted: false, id: uuidv4() }])

    const onChangeSubtasks = (id, newValue) => {
        setSubtasks((prevState) => {
          const newState = [...prevState]
          const subtask = newState.find((subtask) => subtask.id === id)
          subtask.title = newValue
          return newState
        })
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }

    const validate = () => {
        if (!title.trim()) {
          return false
        }
        for (let i = 0; i < subtasks.length; i++) {
          if (!subtasks[i].title.trim()) {
            return false
          }
        }
        return true
      }
    
    if (type === "Edit" && isFirstLoad) {
    setSubtasks(
        task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() }
        })
    )
    setTitle(task.title)
    setDescription(task.description)
    setIsFirstLoad(false)
    }
    
    const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
    };

    const onSubmit = (type) => {
        if (type === "Add") {
          dispatch(
            BoardSlice.actions.addTask({
              title,
              description,
              subtasks,
              status,
              newColIndex,
            })
          )
        } 
        else {
          dispatch(
            BoardSlice.actions.editTask({
              title,
              description,
              subtasks,
              status,
              taskIndex,
              prevColIndex,
              newColIndex,
            })
          )
        }
    }

    return(
        <div 
            className="absolute flex w-screen top-0 align-center h-screen justify-center px-6 bg-[#00000080]"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return
                }
                setIsAddTaskModalOpen(false)
            }}
        >
            <div className="h-[85vh] mb-8 my-auto overflow-y-scroll no-scrollbar bg-[#2F2F2F] text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
                <div className="text-lg">
                    {type === "Edit" ? "Edit" : "Add New"} Task
                </div>
                <div className="mt-8 flex flex-col space-y-1">
                    <label className="text-sm text-gray-300">
                        Task Name
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="task-name-input"
                        type="text"
                        className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#FDFF83] outline-1 ring-0"
                        placeholder="Write your task here"
                    />
                </div>
                <div className="mt-8 flex flex-col space-y-1">
                    <label className="text-sm text-gray-300">
                        Description
                    </label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="task-description-input"
                        className="bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#FDFF83] outline-[1px]"
                        placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                    />
                </div>
                <div className="mt-8 flex flex-col space-y-3">
                    <label className="text-sm text-gray-300">
                        Subtasks
                    </label>
                    {
                        subtasks.map((subtask, index) => (
                            <div key={index} className="flex items-center w-full">
                                <input
                                    onChange={(e) => {
                                        onChangeSubtasks(subtask.id, e.target.value)
                                    }}
                                    type="text"
                                    value={subtask.value}
                                    className="bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#FDFF83] outline-[1px]"
                                    placeholder=" e.g Take coffee break"
                                />
                                <div
                                    onClick={() => onDelete(subtask.id)}
                                    className="m-4 px-2 py-1 cursor-pointer text-[#2F2F2F] bg-[#FDFF83] rounded-md"
                                >
                                    X
                                </div>
                            </div>
                        ))
                    }
                    <div
                        className="hover:opacity-70 cursor-pointer w-full flex justify-center items-center text-[#2F2F2F] bg-[#FDFF83] rounded-lg py-2"
                        onClick={() => {
                            setSubtasks((state) => [
                                ...state,
                                {title: "", isCompleted: false, id: uuidv4()}
                            ])
                        }}
                    >
                        + Add New Subtask
                    </div>
                    <div className="mt-8 flex flex-col space-y-3">
                        <label className="  text-sm dark:text-white text-gray-500">
                            Current Status
                        </label>
                        <select
                            value={status}
                            onChange={onChangeStatus}
                            className="mx-1 select-status flex-grow px-4 py-2 rounded-md text-sm bg-[#2F2F2F] focus:border-0 border-[1px] border-gray-300 focus:outline-[#FDFF83] outline-none"
                        >
                            {columns.map((column, index) => (
                            <option key={index}>{column.name}</option>
                            ))}
                        </select>
                        <div
                            onClick={() => {
                            const isValid = validate();
                            if (isValid) {
                                onSubmit(type);
                                setIsAddTaskModalOpen(false);
                                type === "Edit" && setIsTaskModalOpen(false);
                            }
                            }}
                            className="hover:opacity-70 cursor-pointer w-full flex justify-center items-center text-[#2F2F2F] bg-[#FDFF83] py-2 rounded-lg"
                        >
                            {type === "Edit" ? "Save Edit" : "Create Task"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}