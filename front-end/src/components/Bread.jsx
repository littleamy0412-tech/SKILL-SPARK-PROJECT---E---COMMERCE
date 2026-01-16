import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

function Bread() {
  const { t } = useTranslation();

  const location = useLocation().pathname;
  const [contents, setContents] = useState({
    title : '',
    loc: []
  });
  const [hide, setHide] = useState(false);

  function put(value) {
    return t(`bread.${value}`);
  }

  function putLoc(value) {
    return t(`bread.loc.${value}`);
  }

  useEffect(() => {
    switch (location) {
      case "/":
        setHide(true);
        break;
      case "/account":
      case '/account/':
        setContents(() => ({
          title: "my_account",
          loc: "home pages my_account".split(" "),
        }));
        break;
    }
  }, [location]);

  if (hide) return <></>;

  return (
    <>
      <div className="bg-gray-100">
        <div className="max-w-[1700px] m-auto border-b border-gray-200 h-[250px] flex flex-col justify-center gap-2 px-8">
          <h1 className="text-3xl font-bold">{put(contents.title)}</h1>
          <p>
            {contents.loc?.map((el, i) => {
              return i === contents.loc.length - 1 ? (
                <>
                  <span className="text-pink-500">{putLoc(el)}</span>
                </>
              ) : (
                putLoc(el) + "/ "
              );
            })}
          </p>
        </div>
      </div>
    </>
  );
}

export default Bread;
