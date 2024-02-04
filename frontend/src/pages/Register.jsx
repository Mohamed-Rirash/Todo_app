import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const URL = "http://127.0.0.1:8000";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    hashed_password: "",
    is_active: true,
  });

  const navigate = useNavigate();

  const onchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { email, username, firstname, lastname, hashed_password } = formData;

  const submit = async (e) => {
    e.preventDefault();
    const response = axios
      .post(`${URL}/auth`, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/login");
        }
      })
      .catch((erro) => {
        console.log(erro);
      });

    return response;
  };
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="bg-blue- flex flex-col px-2 sm:px-4 sm:py-4 w-full max-w-[566px] shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form className="flex flex-col gap-y-4 w-full " onSubmit={submit}>
          {/*  */}
          <div className=" flex flex-col sm:flex-row sm:gap-x-2 w-full gap-y-3">
            <label className="text-gray-500 hidden" htmlFor="firstname">
              firstname
            </label>
            <input
              className="rounded-lg  border-gray-200 py-3 "
              type="text"
              name="firstname"
              onChange={onchange}
              placeholder="firstname"
              value={firstname}
              required
            />{" "}
            {/* <div className=""> */}
            <label className="text-gray-500 hidden" htmlFor="lastname">
              lastname
            </label>
            <input
              className="rounded-lg w-full border-gray-200 py-3 "
              type="text"
              name="lastname"
              onChange={onchange}
              placeholder="lastname"
              value={lastname}
              required
            />
            {/* </div> */}
          </div>

          {/*  */}

          <div className="">
            <label className="text-gray-500 hidden" htmlFor="email">
              email
            </label>
            <input
              className="rounded-lg w-full border-gray-200 py-3 "
              type="email"
              name="email"
              onChange={onchange}
              placeholder="email"
              value={email}
              required
            />
          </div>

          {/*  */}

          <div className="">
            <label className="text-gray-500 hidden" htmlFor="username">
              Username
            </label>
            <input
              className="rounded-lg w-full border-gray-200 py-3 "
              type="text"
              name="username"
              onChange={onchange}
              placeholder="username"
              value={username}
              required
            />
          </div>

          {/*  */}
          <div className="">
            <label className=" text-gray-500 hidden" htmlFor="password">
              Password
            </label>
            <input
              className=" w-full rounded-lg border-gray-200 py-3  "
              type="password"
              name="hashed_password"
              onChange={onchange}
              placeholder="password"
              value={hashed_password}
              required
            />
          </div>
          <button
            className="bg-[#AD28FF] text-2xl font-bold py-2 text-white rounded "
            type="submit"
          >
            login
          </button>
        </form>
        <p className="mt-4 pb-3 text-gray-500 text-center">
          have a account?{" "}
          <Link to="/login" className="underline">
            {" "}
            login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
