import { Navigate, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Account_Data from "./datas/Account_datas";

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

function Account_v1() {
  const { t } = useTranslation();

  const account_data = Account_Data();

  console.clear();
  console.log(account_data);

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

  console.log(user);

  useEffect(() => {
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
      });
  }, []);

  return (
    <>
      <Toaster richColors />
      {/* profile block - start */}
      {/* ------------------------------ */}
      <div className="pt-[200px] flex items-center" id="imager091992u3">
        {/* profile block - body - start */}
        {/* ------------------------------ */}
        <div className="h-170 w-full flex justify-center items-start gap-5 py-10 max-w-[1250px] m-auto rounded-[20px] px-[50px]">
          {/* Adress block - start */}
          {/* ------------------------------ */}
          <div className="flex-1 border border-gray-300 max-w-[300px] px-4 py-10 rounded shadow-lg bg-[rgba(255,255,255,.8)]">
            <h1 className="text-[25px] font-bold text-purple-600">
              {put("address")}:
            </h1>
            <ul className="list-disc flex flex-col gap-5 text-black px-3 mt-4">
              <p className="flex justify-between">
                <span className="font-bold flex gap-3">
                  <span>{">"}</span>
                  {put("country")}:
                </span>
                {user.details?.address?.country || ""}
              </p>
              <p className="flex justify-between">
                <span className="font-bold flex gap-3">
                  <span>{">"}</span>
                  {put("city")}:
                </span>
                {user.details?.address?.city || ""}
              </p>
              <p className="flex justify-between">
                <span className="font-bold flex gap-3">
                  <span>{">"}</span>
                  {put("street")}:
                </span>
                {user.details?.address?.street || ""}
              </p>
              <p className="flex justify-between">
                <span className="font-bold flex gap-3">
                  <span>{">"}</span>
                  {put("zip_code")}:
                </span>
                {user.details?.address?.zipCode || ""}
              </p>
            </ul>
          </div>
          {/* Adress block - end */}
          {/* ------------------------------ */}
          {/* user pic block - start */}
          {/* ------------------------------ */}
          <div className="border border-gray-300 rounded-[10px] bg-gray-200 overflow-hidden shadow-2xl mt-[80px] h-[450px] w-[300px] flex flex-col justify-start pt-10 items-center gap-2">
            <div className="w-[250px] h-[250px]">
              <img
                src={
                  user.details?.profile_pic === "false"
                    ? "/default.png"
                    : user.details.profile_pic
                }
                alt="profile"
                className="h-full w-full object-cover object-center rounded-full"
              />
            </div>
            <p className="text-[18px] py-2 font-bold text-gray-600">
              {user.username || ""}
            </p>
            <button className="bg-pink-500 text-white font-bold px-6 py-3 rounded cursor-pointer transition duration-200 hover:bg-pink-400">
              {put("change_picture")}
            </button>
          </div>
          {/* user pic block - end */}
          {/* ------------------------------ */}
          {/* detail block - start */}
          {/* ------------------------------ */}
          <div className="flex-1 h-[500px] max-w-[500px]">
            <h1 className="font-bold text-white text-[28px] px-7 py-4 bg-purple-800 rounded">
              {put("account_info")}:
            </h1>

            <div className="flex flex-col py-10 items-center gap-3">
              <div
                id="item"
                className="bg-[rgba(255,255,255,.8)] rounded border border-gray-500 text-xl h-20 w-full flex items-center px-10 text-gray-800 gap-3"
              >
                <span className="font-bold text-blue-950">
                  <span className="text-xl">{">>"}</span> {putInfo("full_name")}
                  :
                </span>
                {user.details?.fullName || ""}
              </div>
              <div
                id="item"
                className="bg-[rgba(255,255,255,.8)] rounded border border-gray-500 text-xl h-20 w-full flex items-center px-10 text-gray-800 gap-3"
              >
                <span className="font-bold text-blue-950">
                  <span className="text-xl">{">>"}</span> {putInfo("email")}:
                </span>
                {user.email || ""}
              </div>
              <div
                id="item"
                className="bg-[rgba(255,255,255,.8)] rounded border border-gray-500 text-xl h-20 w-full flex items-center justify-between  px-10 text-gray-800 mt-20"
              >
                <span className="font-bold flex gap-3">
                  <span className="text-xl">{"||"}</span> {putInfo("edit_bio")}:
                </span>
                <button className="bg-pink-500 text-white px-10 py-2 rounded font-bold text-[18px] transition duration-200 hover:bg-pink-400 cursor-pointer">
                  {putInfo("edit")}
                </button>
              </div>
            </div>
          </div>
          {/* detail block - end */}
          {/* ------------------------------ */}
        </div>
        {/* profile block - body - end */}
        {/* ------------------------------ */}
      </div>
      {/* profile block - start */}
      <div className="py-10 bg-gray-200">
        <h1 className="text-center max-w-[1700px] border-b-3 border-gray-300 m-auto py-5 mb-5 font-bold text-3xl text-blue-950">
          Your Account_v1
        </h1>
        <div className="py-10 grid grid-cols-4 max-[1388px]:grid-cols-3 max-[1078px]:grid-cols-2 max-[700px]:grid-cols-1 max-w-[1700px] m-auto auto-rows-auto px-10 gap-4">
          {account_data.map((el) => (
            <>
              <div
                id="item"
                className="cursor-pointer transition duration-200 transform hover:translate-y-[-10px] shadow-lg bg-white hover:bg-gray-300 hover:brightness-110 border border-gray-300 overflow-hidden rounded-[4px] p-10 flex flex-col items-start gap-2"
              >
                <div className="border border-gray-100 overflow-hidden h-[60px] w-[60px] rounded-full">
                  <img src={el.icon} alt="picture" />
                </div>
                <h1 className="text-xl pb-[10px] font-bold text-blue-950 border-b-4 border-pink-400 inline w-full">
                  {t(`page.account.list.titles.${el.title}`)}
                </h1>
                <hr className="border-2 border-pink-400 w-[75%]" />
                <hr className="border-2 w-[50%] border-pink-400" />
                <p className="text-gray-500 mt-[10px]">
                  {t(`page.account.list.descriptions.${el.description}`)}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Account_v1;
