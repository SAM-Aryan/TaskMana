import Header from "../../Components/Header/Header.jsx"
import { useState } from "react"
import Home from "../Home/Home.jsx"
import BoardSlice from "../../redux/BoardSlice.js"
import { useDispatch, useSelector } from "react-redux"

export default function Dashboard () {
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
    const dispatch = useDispatch()
    const boards = useSelector((state) => state.board)
    const board = boards.find((board) => board.isActive)
    if (!board && boards.length > 0) {
        dispatch(BoardSlice.actions.setBoardActive({ index: 0 }))
    }

    return(
        <div className="h-screen flex flex-col">
            <Header
                setIsBoardModalOpen={setIsBoardModalOpen}
                isBoardModalOpen={isBoardModalOpen}
            />
            <Home
                setIsBoardModalOpen={setIsBoardModalOpen}
                isBoardModalOpen={isBoardModalOpen}
            />
        </div>
    )
}