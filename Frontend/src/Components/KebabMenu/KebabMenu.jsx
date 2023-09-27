export default function KebabMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div className="absolute top-16 right-6">
      <div className="flex justify-end items-center">
        <div className="text-sm font-medium shadow-md shadow-[#364e7e1a] bg-white space-y-4 py-2 px-4 rounded-lg h-auto">
          <div
            onClick={() => {
              setOpenEditModal();
            }}
            className="cursor-pointer text-gray-700"
          >
            Edit {type}
          </div>

          <div
            onClick={() => setOpenDeleteModal()}
            className="cursor-pointer text-red-500"
          >
            Delete {type}
          </div>
        </div>
      </div>
    </div>
  )
}
