export default function DeleteModal({ type, title, onDeleteBtnClick, setIsDeleteModalOpen }) {
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return
        }
        setIsDeleteModalOpen(false);
      }}
      className="absolute flex w-screen top-0 align-center h-screen justify-center px-6 bg-[#00000080]"
    >

      <div className="no-scrollbar overflow-y-scroll max-h-[95vh] my-auto bg-[#2F2F2F] text-white font-bold shadow-md shadow-[#364e7e1a] max-w-sm mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className=" font-bold text-red-500 text-xl  ">
          Delete this {type}?
        </h3>
        {type === "Task" ? (
          <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="text-gray-300 font-[600] tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className=" flex w-full mt-4 items-center justify-center space-x-4 ">
          <button
            onClick={onDeleteBtnClick}
            className="w-full items-center text-white hover:opacity-75 bg-red-500 py-2 rounded-full"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setIsDeleteModalOpen(false)
            }}
            className="w-full items-center text-red-500 bg-white hover:opacity-75  py-2 rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}