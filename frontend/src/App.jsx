import { Link } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <main className=" grid place-items-center h-[90vh] p-4">
        <div className="text-center">
          <h2 className="bg-[#686767b4] max-w-[120px] sm:max-w-[176px] mx-auto py-1 rounded-full text-[12px] sm:text-xs font-light text-white">
            Welcome to Tasky
          </h2>
          <h1 className=" text-3xl sm:text-5xl font-black py-4   sm:leading-snug">
            {" "}
            Your All-in-One Todo Management <br className=" inline sm:block" />{" "}
            Solution
          </h1>
          <button className="bg-[#AD28FF] rounded text-white font-semibold text-sm py-2 px-4">
            <Link to="/register"> Get Started Today! </Link>
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
