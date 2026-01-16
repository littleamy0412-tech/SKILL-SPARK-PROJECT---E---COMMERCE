import { useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { VscMail } from "react-icons/vsc";
import Header_Data from "./header/Header_Data";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language") || "en");
  }, []);

  function putTop(value) {
    return t(`header.top.${value}`);
  }

  function putBottom(value) {
    return t(`header.bottom.nav.${value}`);
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
          onChange={(e) => {
            i18n.changeLanguage(e.target.value);
            localStorage.setItem("language", e.target.value);
          }}
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
    const { _id, text, icon_p, icon_s, path, img: image } = data;
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
          onClick={() => navigate(path)}
        >
          {image ? (
            <>
              <img
                src={`${
                  (user.details?.profile_pic === "false"
                    ? "/default.png"
                    : user.details?.profile_pic) || "/default.png"
                }`}
                alt="profile"
                className="h-full w-full object-cover object-center"
              />
            </>
          ) : (
            <>
              {text ? putTop(text) : ""} {isHover ? icon_s || icon_p : icon_p}
            </>
          )}
        </button>
      </>
    );
  }

  return (
    <header>
      <div
        id="fixer"
        className="hidden min-[1446px]:flex bg-purple-500 text-white font-bold"
      >
        <div className="h-[65px] w-[80%] max-w-[1700px] m-auto flex">
          {/* top-left -- start */}
          <div id="contact" className="flex">
            <div className="px-4 min-w-[220px] flex items-center gap-2 text-[16px] flex-1">
              <FiPhoneCall />
              {user.email || putTop("Undefined")}
            </div>
            <div className="px-4 min-w-[220px] flex items-center gap-2 text-[16px] flex-1">
              <VscMail className="text-[20px]" />
              {user.details?.phoneNo || putTop("not_setted")}
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
      <div id="fixer" className="bg-white border-b border-gray-200">
        <div className="h-20 max-w-[1700px] m-auto flex justify-between">
          <div className="w-[130px] flex items-center justify-center px-3">
            <img
              src={headerData.bottom.logo}
              alt="logo"
              className="w-full object-cover"
            />
          </div>
          <nav
            id="navigation"
            className="text-gray-500 hidden min-[1082px]:flex"
          >
            {headerData.bottom.nav.map((el) => {
              return (
                <>
                  <Link
                    className="flex items-center px-6 text-[16px] transition duration-200 hover:text-pink-500 hover:bg-gray-100"
                    to={el === "home" ? "/" : "/" + el}
                  >
                    {putBottom(el)}
                  </Link>
                </>
              );
            })}
          </nav>
          <div className="flex-1 max-w-[400px] m-2 overflow-hidden rounded-[4px] hidden min-[560px]:flex">
            <input
              type="text"
              placeholder={t("header.bottom.search")}
              className="flex-1 px-7 border border-r-0 border-gray-200"
            />
            <button className="bg-pink-500 px-5 text-[30px] text-white cursor-pointer transition duration-200 hover:bg-pink-400">
              {headerData.bottom.search}
            </button>
          </div>
          <div className="w-[80px] justify-center cursor-pointer items-center text-[40px] transition duration-200 hover:bg-gray-100 hidden max-[1446px]:flex">
            <RxHamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
