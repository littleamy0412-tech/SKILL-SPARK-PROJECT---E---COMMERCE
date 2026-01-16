import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Bread from "./Bread";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header />
      <Bread/>
      <Outlet />
      <Footer/>
    </>
  );
}

export default Layout;
