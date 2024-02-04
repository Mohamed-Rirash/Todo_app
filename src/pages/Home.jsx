function Home() {
  return (
    <>
      <div className=" flex justify-center flex-wrap py-2 gap-4 my-14">
        <div className=" max-w-[331px] w-full   border-8  border-[#afafaf48] rounded flex flex-col justify-around items-center h-[140px] ">
          <h1 className="text-[#AFAFAF] font-semibold text-2xl">All Task</h1>
          <h2 className="text-3xl font-bold ">0</h2>
        </div>
        <div className=" max-w-[331px] w-full   border-8 border-[#afafaf48] rounded flex flex-col justify-around items-center h-[140px] ">
          <h1 className="text-[#AFAFAF] font-semibold text-2xl">
            Completed Task
          </h1>
          <h2 className="text-3xl font-bold ">0</h2>
        </div>
        <div className=" max-w-[331px] w-full   border-8  border-[#afafaf48] rounded-lg flex flex-col justify-around items-center h-[140px] ">
          <h1 className="text-[#AFAFAF] font-semibold text-2xl">
            Un-Completed Task
          </h1>
          <h2 className="text-3xl font-bold ">0</h2>
        </div>
      </div>
      {/*  */}
      <div className=" ">
        <h1 className="text-[#AFAFAF] font-bold text-5xl">Top Priority</h1>
        <div className="flex flex-col items-center justify-center  h-[43vh]">
          <h2 className="text-[#AFAFAF] font-bold text-3xl sm:text-5xl">
            You have no Tasks
          </h2>
          <p className="text-[#AFAFAF] font-semibold text-xl">
            Create new Tasks
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
