import { useDispatch, useSelector } from "react-redux"
import BoardSlice from "../../redux/BoardSlice"
import AddEditTaskModal from "../../Modals/AddEditTaskModal"
import AddEditBoardModal from "../../Modals/AddEditBoardModal"
import { useState } from "react"
import KebabMenu from "../KebabMenu/KebabMenu"
import DeleteModal from "../../Modals/DeleteModal"

export default function Header ({ setIsBoardModalOpen, isBoardModalOpen }) {
    const dispatch = useDispatch()
    const boards = useSelector((state) => state.board)
    const board = boards.find((board) => board.isActive)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
    const [boardType, setBoardType] = useState("Add");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const setOpenEditModal = () => {
        setIsBoardModalOpen(true);
        setIsKebabMenuOpen(false);
    }
    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
        setIsKebabMenuOpen(false);
    }

    const onDeleteBtnClick = (e) => {
        if (e.target.textContent === "Delete") {
          dispatch(BoardSlice.actions.deleteBoard())
          dispatch(BoardSlice.actions.setBoardActive({ index: 0 }))
          setIsDeleteModalOpen(false)
        } else {
          setIsDeleteModalOpen(false)
        }
    }
   
    return(
        <div className="bg-[#FDFF83] w-screen h-16 drop-shadow-lg">
            <div className="flex items-center justify-between px-4">
                <div className="px-2 py-4 font-black text-2xl text-[#2F2F2F]">
                    TASKMANA
                </div>
                <div className="font-bold text-xl text-[#2F2F2F]">
                    {board.name}
                </div>
                <div className="flex items-center">
                    <div 
                        className="bg-[#2F2F2F] text-white cursor-pointer rounded-md p-2 hover:bg-[#2f2f2fec]"
                        onClick={() => setIsTaskModalOpen(true)}
                    >
                        + Add New Task
                    </div>
                    <div 
                        className="mx-4 p-4 text-lg font-bold cursor-pointer"
                        onClick={() => {
                            setBoardType("Edit");
                            setIsKebabMenuOpen((prevState) => !prevState);
                        }}
                    >
                    ⋮
                    </div>
                    {isKebabMenuOpen && (
                        <KebabMenu
                        type="Board"
                        setOpenEditModal={setOpenEditModal}
                        setOpenDeleteModal={setOpenDeleteModal}
                        />
                    )}
                </div>
            </div>
            {isTaskModalOpen && (
                <AddEditTaskModal
                    setIsAddTaskModalOpen={setIsTaskModalOpen}
                    type="Add"
                />
            )}
            {isBoardModalOpen && (
                <AddEditBoardModal
                    setBoardType={setBoardType}
                    type={boardType}
                    setIsBoardModalOpen={setIsBoardModalOpen}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteModal
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    type="board"
                    title={board.name}
                    onDeleteBtnClick={onDeleteBtnClick}
                />
            )}
        </div>
    )
}