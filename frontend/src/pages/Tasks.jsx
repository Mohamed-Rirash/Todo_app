

function Tasks() {


  return (
    <div>
      <div className="flex justify-between sm:px-20 py-6">
        <div className="">
          <h2 className=" text-2xl sm:text-4xl font-bold">Your Tasks</h2>
          <p className="text-[#AFAFAF] text-xs  sm:text-1xl">
            Here you can see <br className=" sm:hidden" /> and create task
          </p>
        </div>
        <div className="">
          <button className="py-2 px-6 bg-[#AD28FF] text-white font-bold  text-sm sm:text-2xl">
            Add Task
          </button>
        </div>
      </div>
      {/* <div className="flex  h-96 flex-col justify-center bg-blue-500 items-center">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-[#AFAFAF] text-3xl pb-4 sm:text-4xl font-bold">
            You Have No Tasks
          </h2>
          <button className="py-2 px-6 bg-[#AD28FF] text-white font-bold text-1xl">
            Add Task
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Tasks;
