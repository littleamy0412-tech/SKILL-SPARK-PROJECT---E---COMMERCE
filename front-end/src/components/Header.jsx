import Header_Data from "./header/Header_Data";

function Header() {
  const user = {}
  return (
    <>
      <div className="">
        <div id="fixer" className="bg-purple-500 text-white">
          <div className="border max-w-[1200px] m-auto h-[70px] flex gap-2 p-1">
            <div id="contact-section" className="flex border">
              <div
                className="border min-w-[220px] flex items-center px-4 font-bold flex-1"
                id="email"
              >
                {user.email || "Undefined"}
              </div>
              <div
                className="border min-w-[220px] flex items-center px-4 font-bold flex-1"
                id="phone"
              >
                {user.details?.phoneNo || "Not Setted"}
              </div>
            </div>
            <div className="border flex-1 flex justify-right"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
