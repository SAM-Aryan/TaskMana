import Column from "../../Components/Column/Column";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useState } from "react"
import { useSelector } from "react-redux";

export default function Home () {
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)

    const boards = useSelector((state) => state.board)
    const board = boards.find((board) => board.isActive)
    const columns = board.columns

    return(
        <div className=" overflow-y-scroll no-scrollbar flex flex-row w-screen basis-full bg-[#D9D9D9]">
            <Sidebar />
            <div className="overflow-y-scroll overflow-x-scroll no-scrollbar mx-5">
                {columns.length > 0 ? (
                        <div className="flex">
                            {columns.map((col, index) => (
                                <Column key={index} colIndex={index} />
                            ))}
                            <div
                                onClick={() => {
                                    setIsBoardModalOpen(true)
                                }}
                                className="h-screen bg-[#FDFF83] flex justify-center items-center font-bold text-2xl hover:text-[#2F2F2F] transition duration-300 cursor-pointer mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-16 rounded-lg"
                            >
                                + New Column
                            </div>
                        </div>
                    ) : (
                        <div>
                            <EmptyBoard type="edit" />
                        </div>
                )}
            </div>
        </div>
    )
}