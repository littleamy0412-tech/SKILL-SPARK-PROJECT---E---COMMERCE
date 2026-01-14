import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Bread from "./Bread";

function Layout() {
  return (
    <>
      <Header />
      <Bread/>
      <Outlet />
    </>
  );
}

export default Layout;
