import { useTranslation } from "react-i18next";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../datas/Authentications";

const POST_REGISTER = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      resolve({
        res,
        response,
      });
    } catch (err) {
      reject({
        err,
      });
    }
  });

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

function Register() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const put = (value) => t(`page.account.register.${value}`);
  const { __, setToken, toggleLog } = useAuth();

  console.clear();
  console.log(__);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ username: "", email: "", password: "" });

  const onSubmit = (data) =>
    POST_REGISTER(data)
      .then((result) => {
        if (result.res.success) {
          toast.success(result.res.message);
          POST_LOGIN(data)
            .then((report) => {
              toast.success(report.message);
              setToken(report.token);
              toggleLog(true);
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
        }
        if (result.res?.message?.startsWith("Duplicate")) {
          const message = result.res.duplicate_key[0];
          toast.warning(
            message.charAt(0).toUpperCase() +
              message.slice(1) +
              " already in use."
          );
        }
      })
      .catch((err) => {
        toast.error("Internal Server Error");
        console.error("FAILED:", err.err);
      });

  return (
    <>
      <Toaster richColors />
      <div className="border h-svh flex flex-col justify-center items-center py-30">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-4 px-8 border border-gray-300 shadow-2xl w-full max-w-[600px] min-h-[700px] rounded-md"
        >
          <h1 className="text-4xl font-bold text-center">{put("title")}</h1>
          <p className="text-center text-sm">{put("description_1")}</p>

          <input
            className="outline-0 border border-gray-400 rounded py-4 px-6 text-xl"
            placeholder={put("username")}
            type="text"
            name="username"
            id="username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username must be less than 20 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers, and underscores",
              },
            })}
          />
          <p className="text-red-500 text-sm text-center">
            {errors.username?.message}
          </p>

          <input
            className="outline-0 border border-gray-400 rounded py-4 px-6 text-xl"
            placeholder={put("email")}
            type="email"
            name="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
          />
          <p className="text-red-500 text-sm text-center">
            {errors.email?.message}
          </p>

          <input
            className="outline-0 border border-gray-400 rounded py-4 px-6 text-xl"
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
              //   pattern: {
              //     value:
              //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              //     message:
              //       "Password must contain uppercase, lowercase, number, and special character",
              //   },
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
              onClick={() => navigate("/account/login")}
              className="font-bold text-pink-500 transition duration-200 hover:text-pink-400 cursor-pointer"
            >
              {put("login")}
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
