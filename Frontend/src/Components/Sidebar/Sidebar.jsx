import { useDispatch, useSelector } from "react-redux"
import BoardSlice from "../../redux/BoardSlice"
import { useState } from "react";
import AddEditBoardModal from "../../Modals/AddEditBoardModal";

export default function Sidebar () {
    const board = useSelector((state) => state.board)
    const dispatch = useDispatch()
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)

    return(
        <div className="bg-[#2F2F2F] flex flex-col justify-between w-72 h-full items-center">
            <div className="w-full py-4">
                <div className="text-gray-300 text-lg font-Medium px-6 pb-8 ">
                    All Boards ({board?.length})
                </div>
                <div className="flex flex-col">
                    {board.map((board, index) => (
                        <div 
                            className={`flex px-5 mr-12 rounded-r-md duration-500 ease-in-out py-2 my-1 cursor-pointer hover:bg-[#c7c55f1a] hover:text-[#FDFF83]  
                            ${board.isActive 
                                ? 'bg-[#FDFF83] text-[#2F2F2F] rounded-r-md' 
                                : 'text-white'
                            }`}
                            key={index}
                            onClick={() => {
                                dispatch(BoardSlice.actions.setBoardActive({ index }))
                            }}
                        >
                            <p className="text-lg font-bold">
                                {board.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="bg-transparent border-[#FDFF83] duration-500 ease-in-out cursor-pointer text-[#FDFF83] mb-8 p-4 rounded-md font-bold flex justify-center border-2 hover:bg-[#FDFF83] hover:text-[#2F2F2F]"
                onClick={() => setIsBoardModalOpen(true)}
            >
                Create New Board
            </div>
            {isBoardModalOpen && (
                <AddEditBoardModal
                    type="add"
                    setIsBoardModalOpen={setIsBoardModalOpen}
                />
            )}
        </div>
    )
} 