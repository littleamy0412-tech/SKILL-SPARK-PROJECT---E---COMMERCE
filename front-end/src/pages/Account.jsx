import { Navigate, useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Account_Data from "./datas/Account_datas";
import { FiEdit } from "react-icons/fi";
import { BsFillXDiamondFill } from "react-icons/bs";

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
      <div id="imager091992u3">
        <div className="py-20 pt-30 max-w-[1000px] m-auto flex flex-col items-center gap-7">
          {/* profile picture --- start */}
          <div className="border-10 border-[rgba(200,200,200,.6)] h-[260px] w-[260px] rounded-full shadow-lg">
            <img
              src="/default.png"
              alt="picture"
              className="h-full w-full object-center object-cover"
            />
          </div>
          {/* profile picture --- end */}

          <p className="border border-[rgba(255,255,255,.6)] rounded shadow-lg cursor-pointer min-w-40 px-10 text-white font-bold text-center py-3 bg-[rgba(0,0,0,.5)]">
            {user.username || "undefined"}
          </p>

          {/* Lines! -- start */}
          <hr className="border-[rgba(255,255,255,.7)] rounded-full border-3 w-[80%]" />
          <hr className="border-[rgba(255,255,255,.7)] rounded-full border-3 w-[60%]" />
          <hr className="border-[rgba(255,255,255,.7)] rounded-full border-3 w-[40%]" />
          {/* Lines! -- end */}

          <div className="w-full flex gap-2 px-6 max-[930px]:flex-col">
            <div className="flex-1 flex flex-col">
              <h1 className="bg-pink-400 text-white font-bold text-2xl py-3 px-6 rounded-[4px] flex justify-between items-center">
                {put("account_info")}
                <button className="cursor-pointer">
                  <FiEdit />
                </button>
              </h1>
              <div className="max-[400px]:text-[12px] bg-[rgba(255,255,255,.7)] mx-2 flex flex-col gap-3 p-10 rounded-b-[10px] text-gray-800">
                <p>
                  <span className="font-bold min-w-[150px] inline-block">
                    <b className="flex items-center gap-3">
                      <BsFillXDiamondFill className="text-purple-400" />
                      {putInfo("full_name")}:
                    </b>
                  </span>{" "}
                  {user.info?.full_name || put("not_set")}
                </p>
                <p>
                  <span className="font-bold min-w-[150px] inline-block">
                    <b className="flex items-center gap-3">
                      <BsFillXDiamondFill className="text-purple-400" />
                      {putInfo("email")}:
                    </b>
                  </span>
                  {user.email || put("not_set")}
                </p>
                <p>
                  <span className="font-bold min-w-[150px] inline-block">
                    <b className="flex items-center gap-3">
                      <BsFillXDiamondFill className="text-purple-400" />
                      {putInfo("phone_no")}:
                    </b>
                  </span>{" "}
                  {user.info?.phone_no || put("not_set")}
                </p>
                <p>
                  <span className="font-bold min-w-[150px] inline-block">
                    <b className="flex items-center gap-3">
                      <BsFillXDiamondFill className="text-purple-400" />
                      {putInfo("DOB")}:
                    </b>
                  </span>{" "}
                  {user.info?.date_of_birth || put("not_set")}
                </p>
                <p>
                  <span className="font-bold min-w-[150px] inline-block">
                    <b className="flex items-center gap-3">
                      <BsFillXDiamondFill className="text-purple-400" />
                      {putInfo("gender")}:
                    </b>
                  </span>{" "}
                  {user.info?.gender || put("not_set")}
                </p>
                <p>
                  <span className="font-bold min-w-[150px] inline-block">
                    <b className="flex items-center gap-3">
                      <BsFillXDiamondFill className="text-purple-400" />
                      {putInfo("role")}:
                    </b>
                  </span>{" "}
                  {user.role || put("not_set")}
                </p>
              </div>
            </div>

            {/* address -- start */}
            <div className="w-[300px] max-[930px]:w-full flex flex-col gap-3 text-gray-600">
              <h1 className="bg-purple-500 text-white py-3 px-6 font-bold text-2xl rounded-[4px] flex justify-between">
                {put("address")}
                <button className="cursor-pointer">
                  <FiEdit />
                </button>
              </h1>
              <div className="bg-[rgba(255,255,255,.8)] py-3 px-6 rounded-[4px] flex justify-between">
                <span className="font-bold">{put("country")}:</span>
                {user.details?.address?.country || put("not_set")}
              </div>
              <div className="bg-[rgba(255,255,255,.8)] py-3 px-6 rounded-[4px] flex justify-between">
                <span className="font-bold">{put("city")}:</span>
                {user.details?.address?.city || put("not_set")}
              </div>
              <div className="bg-[rgba(255,255,255,.8)] py-3 px-6 rounded-[4px] flex justify-between">
                <span className="font-bold">{put("street")}:</span>
                {user.details?.address?.street || put("not_set")}
              </div>
              <div className="bg-[rgba(255,255,255,.8)] py-3 px-6 rounded-[4px] flex justify-between">
                <span className="font-bold">{put("zip_code")}:</span>
                {user.details?.address?.zipCode || put("not_set")}
              </div>
            </div>
            {/* address -- end */}
          </div>
        </div>
      </div>

      <div className="py-10 bg-gray-200">
        <h1 className="text-center max-w-[1700px] border-b-3 border-gray-300 m-auto py-5 mb-5 font-bold text-3xl text-blue-950">
          {put("your_account")}
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

export default Account;
