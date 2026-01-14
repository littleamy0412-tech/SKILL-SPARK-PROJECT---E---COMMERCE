import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast, Toaster } from "sonner";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { useAuth } from "../front-end/src/datas/Authentications";

const POST_LOGIN = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.clear();
      console.log(data);
      const { username, email, password } = data;
      const result = { password };
      if (username) result.username = username;
      else if (email) result.email = email;

      if (!result.username && !result.email) {
        reject({
          success: 0,
          code: 400,
          message: "Username or Email required",
        });
      }

      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(result),
      });

      const res = await response.json();
      if (res.code === 404) reject(res);
      if (!res.success) reject({ ...res, code: 400 });
      resolve(res);
    } catch (err) {
      reject({ success: 0, code: 500, message: "Internal Server Error", err });
    }
  });

function Login() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const put = (value) => t(`page.account.login.${value}`);
  const [isUsername, setIsUsername] = useState(true);

  const { __, setToken, toggleLog, saveState } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ username: "", email: "", password: "" });

  const onSubmit = (data) =>
    POST_LOGIN(data)
      .then((report) => {
        toast.success(report.message);
        setToken(report.token);
        toggleLog(true);
        saveState();
        reset({ username: "", email: "", password: "" });
        setTimeout(() => navigate("/account"), 2000);
      })
      .catch((err) => {
        switch (err.code) {
          case 400:
          case 404:
            toast.warning(err.message);
            break;
          case 500:
            console.log(err);
            toast.error(err.message);
        }
      });

  return (
    <>
      <Toaster richColors />
      <div className="h-svh flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-300 rounded-md shadow-2xl min-h-[600px] w-full max-w-[600px] flex flex-col justify-center px-6 gap-4"
        >
          <h1 className="text-4xl font-bold text-center">{put("title")}</h1>
          <p className="text-center text-sm">{put("description_1")}</p>

          <div className="flex relative overflow-hidden rounded">
            {isUsername ? (
              <>
                <input
                  className="border border-gray-300 border-r-0 outline-0 py-4 px-9 text-xl flex-1"
                  placeholder={put("username")}
                  type="text"
                  name="username"
                  id="username"
                  {...register("username", {
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Username can only contain letters, numbers, and underscores",
                    },
                  })}
                />
                <i className="absolute right-[70px] text-pink-500 top-[50%] transform translate-y-[-50%] text-xl">
                  <IoPersonSharp />
                </i>
              </>
            ) : (
              <>
                <input
                  className="border border-gray-300 border-r-0 outline-0 py-4 px-9 text-xl flex-1"
                  placeholder={put("email")}
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                <i className="absolute right-[70px] text-pink-500 top-[50%] transform translate-y-[-50%] text-xl">
                  <MdOutlineMailOutline />
                </i>
              </>
            )}

            <button
              className="bg-pink-500 w-[60px] flex items-center justify-center text-white text-3xl transition duration-200 cursor-pointer hover:bg-pink-600"
              onClick={() => {
                setIsUsername((prev) => !prev);
                reset({ username: "", email: "" });
              }}
              type="button"
            >
              <HiOutlineSwitchHorizontal />
            </button>
          </div>

          <input
            className="outline-0 border border-gray-300 rounded py-4 px-6 text-xl"
            placeholder={put("password")}
            type="password"
            name="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <p className="text-red-500 text-sm text-center">
            {errors.password?.message}
          </p>

          <p>{put("forgot_password")}</p>
          <button
            type="submit"
            className="bg-pink-500 text-white text-xl font-bold py-4 rounded cursor-pointer transition duration-200 hover:bg-pink-600"
          >
            {put("submit")}
          </button>
          <p className="text-center">
            {put("description_2")}{" "}
            <span
              className="font-bold text-pink-500 transition duration-200 hover:text-pink-400 cursor-pointer"
              onClick={() => navigate("/account/register")}
            >
              {put("register")}
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
