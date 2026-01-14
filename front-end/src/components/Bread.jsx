import React, { useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";

function Bread() {
  const { t } = useTranslation();
  const location = useLocation().pathname;

  function put(value) {
    return t(`bread.${value}`)
  }

  function putLoc(value) {
    return t(`bread.loc.${value}`)
  }

  const [BODY] = useState(() => {
    switch (location) {
      case "/account":
        return {
          title: "my_account",
          loc: "home pages my_account".split(" "),
        };
      default:
    }
  });

  return (
    <>
    <div className="bg-gray-100">

      <div className="max-w-[1500px] m-auto border-b border-gray-200 h-[250px] flex flex-col justify-center gap-2 px-8">
        <h1 className="text-3xl font-bold">{put(BODY.title)}</h1>
        <p>
          {BODY.loc.map((el, i) => {
            return i === BODY.loc.length - 1 ? (
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
