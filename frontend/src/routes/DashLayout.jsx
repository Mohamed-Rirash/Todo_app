import { useState, useEffect } from "react";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function DashLayout() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = () => {
    console.log("Hello", show);
    setShow((pre) => !pre);
  };

  const logingout = () => {
    console.log("logging out");
    dispatch(logout());
    navigate("/");
    dispatch(reset());
  };

  return (
    <>
      <section className="shadow h-[10vh]  flex items-center">
        <div className="container mx-auto px-8 sm:px-2 flex justify-between items-center">
          <Link to="/">
            {" "}
            <h1 className="text-3xl font-black text-[#AD28FF]"> Tasky</h1>
          </Link>
          <div className=" sm:hidden">
            <i
              onClick={toggle}
              className="bx text-[#AD28FF] text-5xl sm:hidden bx-menu"
            ></i>
          </div>
          <div className="sm:flex items-center sm:gap-x-4 hidden ">
            <div className="">
              <h2 className="text-xl font-bold">Hello, username</h2>
            </div>
            <button
              onClick={logingout}
              className="bg-black py-2 px-4 text-lg text-white font-medium rounded"
            >
              {" "}
              logout{" "}
            </button>
          </div>
        </div>
      </section>

      {/* main */}
      <main className="h-[91vh] w-full flex ">
        <div
          className={`side h-[100vh] w-1/2 sm:h-full sm:w-full sm:max-w-[20vw] bg-black text-white absolute sm:static top-0 left-0 translate-x-[-100%] ${
            show ? "navy" : ""
          } transition transform ease-in-out sm:transform-none   flex flex-col  items-center justify-around sm:justify-center`}
        >
          <div className="text-start sm:hidden  ">
            <div className="absolute top-4 right-4 ">
              {" "}
              <i onClick={toggle} className="bx text-5xl bx-x"></i>
            </div>
            <h3 className="text-xl font-bold pb-1">Username</h3>
            <h4 className="text-sm font-medium">example@gmail.com</h4>
          </div>
          <nav className="flex flex-col gap-y-1 text-lg font-bold">
            <NavLink
              to="/dashboard"
              onClick={toggle}
              className={({ isActive }) =>
                isActive ? "active" : "flex items-center gap-x-1"
              }
              end
            >
              <span>
                <i className="bx bx-home-circle"></i>
              </span>{" "}
              <span>Home</span>
            </NavLink>
            <NavLink
              onClick={toggle}
              className={({ isActive }) =>
                isActive ? "active" : "flex items-center gap-x-1"
              }
              to="/dashboard/tasks"
            >
              <span>
                <i className="bx bx-task"></i>
              </span>{" "}
              <span>Tasks</span>
            </NavLink>
            <NavLink
              onClick={toggle}
              className={({ isActive }) =>
                isActive ? "active" : "flex items-center gap-x-1"
              }
              to="/dashboard/profile"
            >
              <span>
                <i className="bx bx-user-circle"></i>
              </span>{" "}
              <span>Profile</span>
            </NavLink>
            <NavLink
              onClick={toggle}
              className={({ isActive }) =>
                isActive ? "active" : "flex items-center gap-x-1"
              }
              to="/dashboard/setting"
            >
              <span>
                <i className="bx bxs-cog"></i>
              </span>{" "}
              <span>Setting</span>
            </NavLink>
          </nav>
          <button className=" border-2 border-white py-1 px-4 text-lg text-white font-medium rounded sm:hidden">
            {" "}
            logout{" "}
          </button>
        </div>
        <div className="content h-full w-full  p-2">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default DashLayout;
