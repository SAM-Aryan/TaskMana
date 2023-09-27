import { useSelector } from "react-redux";
import TaskModal from "../../Modals/TaskModal";
import { useState } from "react";

export default function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.board);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true)
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 rounded-lg  bg-[#2F2F2F] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#FDFF83] text-white cursor-pointer"
      >
        <p className=" font-bold tracking-wide ">{task.title}</p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-300">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  )
}
