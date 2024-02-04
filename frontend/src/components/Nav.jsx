import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [show, setShow] = useState(false);

  const toggle = () => {
    console.log("Hello", show);
    setShow((pre) => !pre);
  };
  return (
    <section className="h-16  shadow">
      <div className="container mx-auto  flex items-center justify-between px-10 py-4">
        <div className="">
          {" "}
          <h1 className="text-3xl font-black text-[#AD28FF]">
            {" "}
            <Link to="/">Tasky </Link>
          </h1>
        </div>
        <div className="sm:hidden">
          <i
            onClick={toggle}
            className="bx text-[#AD28FF] text-5xl sm:hidden bx-menu"
          ></i>
        </div>
        <nav
          className={` transition transform ease-in-out translate-x-full ${
            show ? "navy" : ""
          }  sm:transform-none justify-center items-center fixed sm:static top-0 right-0 w-80 h-screen sm:h-0 flex`}
        >
          <div className=" bg-slate-100 w-full h-full flex justify-center relative flex-col ">
            <button
              className="sm:hidden absolute top-8 left-4"
              onClick={toggle}
            >
              <i className="bx text-5xl bx-x"></i>
            </button>
            <ul className="flex  py-8 flex-col sm:flex-row gap-y-8  items-center gap-x-4">
              <li>
                <Link
                  to="/login"
                  className=" rounded font-medium text-[#3A4F39]  border-2 border-[#3A4F39] py-2  px-6"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-black text-white font-medium rounded py-3  px-6"
                  href=""
                >
                  Sing up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Nav;
