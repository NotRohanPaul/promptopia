
const DialogBox = ({ task, setConfirmDelete, handleDelete }) => {
    return (
        <section className="fixed z-10 inset-0 -top-10 flex-center bg-gray-500/50" >
            <div className='bg-white rounded-md p-3'>
                <h1 className="text-4xl blue_gradient font-black h-[60px]">Dialog Box</h1>
                <p className="text-center px-5">
                    Are you sure you want to
                    <span className="font-bold"> {task.toLowerCase()} </span>?
                </p>
                <div className="mt-5 flex gap-5 justify-end">
                    <button className="text-black hover:bg-gray-500 hover:text-white transition-all duration-300 ease-in-out px-5 py-1.5 rounded-full"
                        onClick={() => setConfirmDelete('')}
                    >No</button>
                    <button className="px-5 py-1.5 hover:bg-white hover:text-primary-orange bg-primary-orange rounded-full transition-all duration-300 ease-in-out text-white"
                        onClick={() => {
                            setConfirmDelete('');
                            handleDelete()
                        }}
                    >Yes</button>
                </div>
            </div>
        </section >
    )
}

export default DialogBox