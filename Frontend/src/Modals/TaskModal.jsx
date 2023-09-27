import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import KebabMenu from "../Components/KebabMenu/KebabMenu"
import BoardSlice from "../redux/BoardSlice"
import Subtask from "../Components/Task/SubTask"
import AddEditTaskModal from "./AddEditTaskModal"
import DeleteModal from "./DeleteModal"

function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {

    const dispatch = useDispatch();
    const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const boards = useSelector((state) => state.board)
    const board = boards.find((board) => board.isActive)
    const columns = board.columns
    const col = columns.find((col, i) => i === colIndex)
    const task = col.tasks.find((task, i) => i === taskIndex)
    const subtasks = task.subtasks
    const [boardType, setBoardType] = useState("Add");

    let completed = 0;
    subtasks.forEach((subtask) => {
        if (subtask.isCompleted) {
            completed++;
        }
    }
)

const [status, setStatus] = useState(task.status);
const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
const onChange = (e) => {
    setStatus(e.target.value)
    setNewColIndex(e.target.selectedIndex)
}

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return
    }
    dispatch(
      BoardSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(BoardSlice.actions.deleteTask({ taskIndex, colIndex }))
      setIsTaskModalOpen(false)
      setIsDeleteModalOpen(false)
    } else {
      setIsDeleteModalOpen(false)
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true)
    setIsKebabMenuOpen(false)
  };

  const setOpenDeleteModal = () => {
    setIsKebabMenuOpen(false)
    setIsDeleteModalOpen(true)
  };

  return (
    <div
      onClick={onClose}
      className=" fixed right-0 top-0 px-2 py-4 overflow-scroll no-scrollbar  z-50 left-0 bottom-0 justify-center items-center flex bg-[#00000080]"
    >

      <div className="no-scrollbar overflow-y-scroll max-h-[95vh]  my-auto  bg-[#2F2F2F] text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <div className=" relative flex justify-between w-full items-center">
          <h1 className=" text-lg">{task.title}</h1>
          <div 
                className="mx-4 p-4 text-lg font-bold cursor-pointer"
                onClick={() => {
                    setBoardType("edit");
                    setIsKebabMenuOpen((prevState) => !prevState);
                }}
            >
                ⋮
            </div>
            {isKebabMenuOpen && (
                <KebabMenu
                    type="Task"
                    setOpenEditModal={setOpenEditModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                />
            )}
        </div>
        <p className=" text-gray-300 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>

        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        <div className=" mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            return (
              <Subtask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
              />
            );
          })}
        </div>


        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm text-gray-300">
            Current Status
          </label>
          <select
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-[#2F2F2F] focus:border-0 border-[1px] border-gray-300 focus:outline-[#FDFF83] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="Task"
          title={task.title}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="Edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
