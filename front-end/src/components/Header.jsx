import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { VscMail } from "react-icons/vsc";
import Header_Data from "./header/Header_Data";
import { useTranslation } from "react-i18next";

function Header() {
  const { t, i18n } = useTranslation();

  function put(value) {
    return t(`header.top.${value}`);
  }

  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });

  const headerData = Header_Data();

  function Select_Language({ data }) {
    const { _id, content } = data;
    return (
      <>
        <select
          name={_id}
          id={_id}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          value={i18n.language}
          className="px-4 transition duration-200 hover:bg-purple-400"
        >
          {content.map((el) => {
            return <option value={el.loc}>{el.name}</option>;
          })}
        </select>
      </>
    );
  }

  function Select_Currency({ data }) {
    const { _id, content } = data;
    return (
      <>
        <select
          name={_id}
          id={_id}
          className="px-4 transition duration-200 hover:bg-purple-400"
        >
          {content.map((el) => {
            return (
              <option value={el.code} key={el.name}>
                {el.symbol} {el.code}
              </option>
            );
          })}
        </select>
      </>
    );
  }

  function Button({ data }) {
    const { _id, text, icon_p, icon_s, img: image } = data;
    const [hide] = useState(() => {
      if (localStorage.getItem("token") && _id === "login-btnPopup")
        return true;
      else return false;
    });
    const [isHover, setIsHover] = useState(false);

    return (
      <>
        <button
          id={_id}
          className={`flex gap-2 items-center justify-center text-[18px] px-6 py-2 min-w-[60px] h-full ${
            hide ? "hidden" : ""
          } ${_id === "cart-btn" ? "text-[25px]" : ""}
          transition duration-200 hover:bg-purple-400 cursor-pointer
          `}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {image ? (
            <>
              <img
                src={`${user.details?.profile_pic}` || "#"}
                alt="profile"
                className="h-full w-full object-cover object-center"
              />
            </>
          ) : (
            <>
              {text ? put(text) : ""} {isHover ? icon_s || icon_p : icon_p}
            </>
          )}
        </button>
      </>
    );
  }

  return (
    <header>
      <div id="fixer" className="bg-purple-500 text-white font-bold">
        <div className="h-[65px] w-[80%] m-auto flex">
          {/* top-left -- start */}
          <div id="contact" className="flex">
            <div className="px-4 min-w-[220px] flex items-center gap-2 text-[16px] flex-1">
              <FiPhoneCall />
              {user.email || put("Undefined")}
            </div>
            <div className="px-4 min-w-[220px] flex items-center gap-2 text-[16px] flex-1">
              <VscMail className="text-[20px]" />
              {user.details?.phoneNo || put("not_setted")}
            </div>
          </div>
          {/* top-left -- end*/}

          {/* top-right -- start */}
          <div className="flex-1 flex justify-end">
            <Select_Language data={headerData.top.select[0]} />
            <Select_Currency data={headerData.top.select[1]} />
            {headerData.top.button.map((el) => {
              return <Button data={el} />;
            })}
          </div>
          {/* top-right -- end */}
        </div>
      </div>
    </header>
  );
}

export default Header;
