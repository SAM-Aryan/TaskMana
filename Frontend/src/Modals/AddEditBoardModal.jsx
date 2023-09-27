import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import BoardSlice from "../redux/BoardSlice";

function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
    { name: "Completed", tasks: [], id: uuidv4() },
  ]);
  const board = useSelector((state) => state.board).find((board) => board.isActive)

  if (type === "Edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    if (!name.trim()) {
      return false;
    }
    for (let i = 0 ; i < newColumns.length ; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    return true
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "Add") {
      dispatch(BoardSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(BoardSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="absolute flex w-screen top-0 right-0 left-0 bottom-0 align-center h-screen justify-center px-6 bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div
        className=" no-scrollbar overflow-y-scroll max-h-[95vh]  bg-[#2F2F2F] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "Edit" ? "Edit" : "Add New"} Board
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Board Name
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Board Columns
          </label>

          {newColumns.map((column, index) => (
            <div key={index} className=" flex items-center w-full ">
                <input
                    className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                    onChange={(e) => {
                    onChange(column.id, e.target.value);
                    }}
                    type="text"
                    value={column.name}
                />
                <div
                    onClick={() => onDelete(column.id)}
                    className="m-4 px-2 py-1 cursor-pointer text-[#2F2F2F] bg-[#FDFF83] rounded-md"
                >
                    X
                </div>
            </div>
          ))}
          <div>
            <button
              className="w-full items-center hover:opacity-70 text-[#2F2F2F] bg-white py-2 rounded-lg"
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
            >
              + Add New Column
            </button>
            <button
              onClick={() => {
                const isValid = validate();
                if (isValid === true) onSubmit(type);
              }}
              className=" w-full items-center hover:opacity-70 mt-8 relative text-[#2F2F2F] bg-[#FDFF83] py-2 rounded-lg"
            >
              {type === "Add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
