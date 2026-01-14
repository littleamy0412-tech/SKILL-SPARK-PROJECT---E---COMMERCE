import { Navigate, useNavigate } from "react-router";
import default_pic from "/default.png";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const POST_GET = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/api/user/get", {
        method: "GET",
        headers: {
          authorization: token ? `Bearer ${token}` : "",
          "content-type": "application/json",
        },
      });

      const res = await response.json();

      if (!res.success) reject({ success: 0, message: res.message, code: 400 });

      const { data } = res;
      delete data._id;
      delete data.createdAt;
      delete data.iat;

      res.data = { ...data };
      resolve(res);
    } catch (err) {
      console.log(err);
      reject({ success: 0, message: "Internal Server Error", code: 500 });
    }
  });
};

function Account() {
  const { t } = useTranslation();

  function put(value) {
    return t(`page.account.${value}`);
  }

  function putInfo(value) {
    return t(`page.account.info.${value}`);
  }

  const navigate = useNavigate();
  let user;
  try {
    user = JSON.parse(localStorage.getItem("user")) || { details: null };
  } catch {
    user = { details: null };
  }

  const token = localStorage.getItem("token");

  if (!token) return <Navigate to={"/login"} />;

  useEffect(() => {
    console.clear();
    POST_GET(token)
      .then((res) => {
        if (res.data) {
          user = { ...res.data };
          toast.success(res.message);
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
      .catch((err) => {
        if (err.code === 400) navigate("/login");
        else toast.error(err.message);
      })
      .finally(() => {
        console.log(user);
      });
  }, []);

  return (
    <>
      <Toaster richColors />
      <div id="imager091992u3">
        <div className="min-h-[600px] p-1 flex gap-5 px-10 py-10 max-w-[1200px] m-auto">
          <div className="min-w-[300px] flex flex-col gap-5">
            <div className="border rounded-[10px] border-white shadow-lg bg-[rgba(200,200,200,.3)] backdrop-blur-sm min-h-[400px] py-10">
              <div className="h-[300px] m-2 rounded-full">
                <img
                  src={user.details?.profile_pic || default_pic}
                  alt="profile"
                  className="h-full w-full object-center object-cover"
                />
              </div>
              <div className="flex justify-center items-center min-h-[50px] font-bold">
                {user.username || ""}
              </div>
              <div className="flex justify-center items-center min-h-[50px]">
                <button className="bg-pink-400 text-white font-bold rounded cursor-pointer px-5 py-2 hover:bg-pink-500 transition duration-200">
                  {put("change_picture")}
                </button>
              </div>
            </div>
            <div className="border border-white shadow-lg bg-[rgba(200,200,200,.3)] backdrop-blur-sm min-h-[200px] border-b-6 flex flex-col text-[14px] pb-3">
              <h1 className="font-bold text-[18px] px-10 pt-3 pb-2 border-b">
                {put("address")}:
              </h1>
              <div className="flex justify-between px-10 py-3">
                <span className="font-bold">{put("country")}:</span>
                {user.details?.address?.country || ""}
              </div>
              <div className="flex justify-between px-10 py-3">
                <span className="font-bold">{put("city")}:</span>
                {user.details?.address?.city || ""}
              </div>
              <div className="flex justify-between px-10 py-3">
                <span className="font-bold">{put("street")}:</span>
                {user.details?.address?.street || ""}
              </div>
              <div className="flex justify-between px-10 py-3">
                <span className="font-bold">{put("zip_code")}:</span>
                {user.details?.address?.zipCode || ""}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div
              id="title"
              className="border border-white shadow-lg bg-[rgba(0,0,0,.3)] text-white backdrop-blur-sm px-10 py-2 border-b-6 font-bold"
            >
              {put("account_info")}:
            </div>
            <div className="border border-white shadow-lg bg-[rgba(200,200,200,.3)] backdrop-blur-sm  border-b-6 flex items-center justify-between px-10 py-2 min-h-[50px]">
              <span className="font-bold">{putInfo("full_name")}:</span>{" "}
              {user.details?.fullName || ""}
            </div>
            <div className="border border-white shadow-lg bg-[rgba(200,200,200,.3)] backdrop-blur-sm  border-b-6 flex items-center justify-between px-10 py-2 min-h-[50px]">
              <span className="font-bold">{putInfo("email")}:</span>{" "}
              {user.email || ""}
            </div>
            <div className="border border-white shadow-lg bg-[rgba(0,0,0,.3)] text-white backdrop-blur-sm  border-b-6 flex gap-5 px-10 py-5 flex-1">
              <span className="font-bold">{putInfo("bio")}:</span>{" "}
              {user.details?.bio || ""}
            </div>
            <div className="border border-white shadow-lg bg-[rgba(200,200,200,.3)] backdrop-blur-sm  border-b-6 flex items-center justify-between px-10 py-2 min-h-[50px]">
              <span className="font-bold">{putInfo("edit_bio")}</span>{" "}
              <button className="bg-pink-400 text-white px-6 py-2 rounded font-bold cursor-pointer hover:bg-pink-500 transition duration-200">
                {putInfo("edit")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="fixer" className="bg-gray-100">
        <div className="min-h-[50svh] bg-gray-100 grid grid-cols-2 auto-rows-[100px] gap-5 px-5 py-10  max-w-[1200px] m-auto">
          <div
            id="item"
            className="text-gray-600 border border-gray-300 shadow-lg rounded flex items-center px-6 transform transition duration-200 hover:-translate-y-2 brightness-95 hover:brightness-100 cursor-pointer"
          >
            <div className="border border-gray-300 w-[70px] h-[70px] rounded-full overflow-hidden"></div>
            <div className="flex-1 px-5 h-full flex flex-col justify-center">
              <h1 className="font-bold">title</h1>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
