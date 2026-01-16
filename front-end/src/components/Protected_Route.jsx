import { Navigate, Outlet } from "react-router";
function Protected_Route() {
  if (!localStorage.getItem("token"))
    return <Navigate to={"/login"} replace />;
  return (
    <>
      <Outlet />
    </>
  );
}

export default Protected_Route;
