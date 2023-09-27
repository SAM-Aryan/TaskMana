import { useDispatch, useSelector } from "react-redux";
import BoardSlice from "../../redux/BoardSlice";

export default function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.board)
  const board = boards.find((board) => board.isActive)
  const col = board.columns.find((col, i) => i === colIndex)
  const task = col.tasks.find((task, i) => i === taskIndex)
  const subtask = task.subtasks.find((subtask, i) => i === index)
  const checked = subtask.isCompleted

  const onChange = (e) => {
    dispatch(
      BoardSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    )
  }

  return (
    <div className="text-[#2F2F2F] w-full flex rounded-md relative items-center justify-start bg-[#FDFF83DF] p-3 gap-4">
      <input
        className="w-4 h-4 accent-[#2F2F2F] cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className={checked ? "line-through opacity-30" : ""}>
        {subtask.title}
      </div>
    </div>
  )
}
