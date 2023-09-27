import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BoardSlice from "../../redux/BoardSlice"
import Task from "../Task/Task"

export default function Column({ colIndex }) {

    const dispatch = useDispatch()
    const boards = useSelector((state) => state.board)
    const board = boards.find((board) => board.isActive === true)
    const col = board.columns.find((col, i) => i === colIndex)
    

    const handleOnDrop = (e) => {
        const { prevColIndex, taskIndex } = JSON.parse(
            e.dataTransfer.getData("text")
        )

        if (colIndex !== prevColIndex) {
            dispatch(
                BoardSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
            )
        }
    }

    const handleOnDragOver = (e) => {
        e.preventDefault();
    }

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="mx-4 pt-6 min-w-[280px]"
    >
        <div className="font-bold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-gray-700">
            <div className="rounded-full w-4 h-4" />
            {col.name} ({col.tasks.length})
        </div>

        {col.tasks.map((task, index) => (
            <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))}
    </div>
  )
}
