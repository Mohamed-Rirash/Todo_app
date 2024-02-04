import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [eror, setEror] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const onchange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    setFormData({ username: "", password: "" });
  };

  useEffect(() => {
    if (isError && message) {
      setEror(message.detail);
      console.log(message.detail);
    }
    if (token) {
      console.log("HEEELLOO");
      navigate("/dashboard");
    } else {
      console.log("fuck");
    }
  }, [token, navigate, isError, message]);

  // useEffect(() => {
  //   if (isError && message) {
  //     // Show error message
  //     console.log(message.detail);
  //   }

  //   if (isSuccess || token) {
  //     navigate("/dashboard");
  //   }
  // }, [token, isError, isSuccess, message, navigate, dispatch]);

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="bg-blue- flex flex-col sm:px-4 sm:py-4 w-full max-w-[566px] shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form className="flex flex-col gap-y-4 w-full " onSubmit={submit}>
          <label className="text-gray-500 hidden" htmlFor="username">
            Username
          </label>
          <input
            className="rounded-lg w-full border-gray-200 py-3 "
            type="text"
            name="username"
            onChange={onchange}
            placeholder="username"
            value={formData.username}
            required
          />
          <label className=" text-gray-500 hidden" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-lg border-gray-200 py-3  "
            type="password"
            name="password"
            onChange={onchange}
            placeholder="password"
            value={formData.password}
            required
          />
          <button
            className="bg-[#AD28FF] text-2xl font-bold py-2 text-white rounded "
            type="submit"
          >
            login
          </button>
          {eror ? (
            <p className="text-center py-2 text-red-400 font-bold">
              {eror}
            </p>
          ) : (
            ""
          )}
        </form>
        <p className="mt-4 pb-3 text-gray-500 text-center">
          No account?{" "}
          <Link to="/register" className="underline">
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
