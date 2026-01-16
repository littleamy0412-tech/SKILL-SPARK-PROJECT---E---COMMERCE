import logo from "/logo.png";
import Footer_Data from "./data/Footer_Data";

import { useTranslation } from "react-i18next";

function Footer() {
  const footer_data = Footer_Data();
  const { t } = useTranslation();

  function putTitle(value) {
    return t(`footer.titles.${value}`);
  }

  function putSection(value) {
    return t(`footer.sections.${value}`);
  }
  return (
    <>
      <div className="bg-gray-300">
        <div className="flex gap-2 max-w-[1300px] m-auto p-10 max-[1336px]:flex-col max-[1336px]:items-center max-[1336px]:gap-10">
          <div className="flex flex-col gap-3 max-[650px]:items-center">
            <img src={logo} alt="image" className="w-[100px]" />
            <div className="w-[360px] text-[13px] text-gray-600 flex flex-col max-[650px]:mt-3 max-[650px]:items-center">
              <h3 className="text-md">{t("footer.Contact Info")}</h3>
              <p>17 Pricess Road, London, Greater London, NW1 8JR UK</p>
            </div>
          </div>
          <div className="flex-1 flex gap-2 max-[650px]:flex-col max-[650px]:w-full max-[650px]:items-center max-[650px]:gap-10">
            {footer_data.map((el) => (
              <>
                <div className="flex-1 min-w-[200px] text-[16px] text-gray-700 px-2 flex flex-col gap-2 max-[650px]:items-center">
                  <h1 className="font-bold mb-6 text-[20px] text-blue-950">
                    {putTitle(el.title)}
                  </h1>
                  {el.items.map((i) => (
                    <>
                      <p>{putSection(i)}</p>
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
