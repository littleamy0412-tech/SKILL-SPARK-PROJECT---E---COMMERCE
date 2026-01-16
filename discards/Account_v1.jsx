import { useEffect, useState } from "react";
import { useAuth } from "../front-end/src/datas/Authentications";
import { useNavigate } from "react-router";
import default_image from "/default.png";
import { toast, Toaster } from "sonner";

const POST_GET = (token) =>
  new Promise(async (resolve, reject) => {
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

      const data = res.data;
      delete data._id;
      delete data.createdAt;
      delete data.iat;

      res.data = {
        ...data,
      };
      resolve(res);
    } catch (err) {
      console.log(err);
      reject({ success: 0, message: "Internal Server Error", code: 500 });
    }
  });

function Account() {
  const { __ } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    
    POST_GET(__.__t)
      .then((res) => {
        setUser(() => res.data);
        toast.success(res.message);
        console.log(user);
      })
      .catch((err) => {
        if (err.code === 400) {
          navigate("/login");
        }
        toast.error(err.message);
      });
  }, []);

  return (
    <>
      <Toaster richColors />
      <div className="min-h-svh" id="imager091992u3">
        <h1 className="text-3xl font-bold text-center py-4 shadow-lg bg-[rgba(0,0,0,.2)] text-white mb-10">
          Your Account
        </h1>
        <div className="min-h-50 p-1">
          <div className="min-h-50 flex justify-center gap-3">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center justify-start py-10 border transition duration-200 transform hover:translate-y-[-5px] border-gray-100 rounded-[20px] bg-[rgba(200,200,200,.3)] shadow-lg w-[300px] h-[400px] border-b-6 gap-3">
                <img
                  src={user.details?.profile_pic || default_image}
                  className="h-50 w-50 rounded-full object-center object-cover"
                  alt="image"
                />
                <p className="text-white font-bold">
                  {user.username || "undefined"}
                </p>
                <button className="bg-pink-3  00 text-white font-bold px-5 py-2 rounded border-pink-600 cursor-pointer transition duration-200 hover:bg-pink-600">
                  Change Picture
                </button>
              </div>
              <div className="flex flex-col items-center justify-start py-10 border transition duration-200 transform hover:translate-y-[-5px] border-gray-100 rounded-[20px] bg-[rgba(200,200,200,.6)] backdrop-blur-md shadow-lg min-h-[200px] border-b-6 gap-3 px-10">
                <p className="text-left text-[14px] flex justify-between border-b border-gray-200 pb-2 text-white w-full">
                  <span className="font-bold text-[16px]">Country:</span>
                  {user.details?.address?.country || "not setted"}
                </p>
                <p className="text-left text-[14px] flex justify-between border-b border-gray-200 pb-2 text-white w-full">
                  <span className="font-bold text-[16px]">City:</span>
                  {user.details?.address?.country || "not setted"}
                </p>
                <p className="text-left text-[14px] flex justify-between border-b border-gray-200 pb-2 text-white w-full">
                  <span className="font-bold text-[16px]">Street:</span>
                  {user.details?.address?.country || "not setted"}
                </p>
                <p className="text-left text-[14px] flex justify-between border-b border-gray-200 pb-2 text-white w-full">
                  <span className="font-bold text-[16px]">Zipcode:</span>
                  {user.details?.address?.country || "not setted"}
                </p>
              </div>
            </div>

            <div className="text-white leading-7 tracking-wide font-mono flex flex-col justify-start gap-4 max-w-[600px] flex-1">
              <div className="border transition duration-200 transform hover:translate-y-[-5px] border-gray-100 min-h-50 rounded-[10px] bg-[rgba(150,150,150,.6)] backdrop-blur-md shadow-lg border-b-6 flex flex-col gap-2 pb-10">
                <h3 className=" text-2xl font-bold border-b px-10 py-4 mb-4 border-gray-300 bg-[rgba(200,200,200,.6)]">
                  Details:
                </h3>
                <p className="px-10">
                  <span className="font-bold">Full Name: </span>{" "}
                  {user.details?.fullName || "Not Set"}
                </p>
                <p className="px-10">
                  <span className="font-bold">Email: </span>{" "}
                  {user.email || "undefined"}
                </p>
                <p className="px-10">
                  <span className="font-bold">Bio: </span>{" "}
                  {user.details?.bio || ""}
                </p>
              </div>
              <div className="flex  items-center  justify-between px-10 border transition duration-200 transform hover:translate-y-[-5px] border-gray-100 h-20 rounded-[10px] bg-[rgba(200,200,200,.6)] shadow-lg border-b-6">
                Edit Bio Details{" "}
                <button className="bg-pink-3  00 text-white font-bold px-6 py-2 rounded cursor-pointer transition duration-200 hover:bg-pink-600">
                  Edit
                </button>
              </div>
              <div className="flex  items-center  justify-between px-10 border transition duration-200 transform hover:translate-y-[-5px] border-gray-100 h-20 rounded-[10px] bg-[rgba(200,200,200,.6)] shadow-lg border-b-6">
                Change Password{" "}
                <button className="bg-pink-3  00 text-white font-bold px-6 py-2 rounded cursor-pointer transition duration-200 hover:bg-pink-600">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className="px-4 border-gray-200 my-10" />

        <div className="px-6 min-h-[400px] grid grid-cols-2 min-[1000px]:grid-cols-3 auto-rows-[100px] gap-6 max-w-[1000px] m-auto">
          <div
            id="item"
            className="flex flex-col items-center justify-start py-10 border transition duration-200 transform hover:translate-y-[-5px] border-gray-100 rounded-[20px] bg-[rgba(200,200,200,.3)] shadow-lg border-b-6 gap-3 over"
          >
            Hello
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
