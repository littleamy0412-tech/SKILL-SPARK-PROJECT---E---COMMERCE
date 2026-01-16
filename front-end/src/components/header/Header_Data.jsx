import language from "./data/language.json";
import currency from "./data/currency.json";

import { IoMdPerson } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsCart, BsCartFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

import logo from "/logo.png";

class Button {
  constructor(_id, text, icon_p, icon_s = "", path, img = false) {
    this._id = _id;
    this.text = text;
    this.icon_p = icon_p;
    this.icon_s = icon_s;
    this.img = img;
    this.path = path
  }
}

export default function Header_Data() {
  return {
    top: {
      select: [
        {
          _id: "language",
          content: language,
        },
        {
          _id: "currency",
          content: currency,
        },
      ],
      button: [
        new Button("login-btnPopup", "login", <IoMdPerson />, "", '/login'),
        new Button("account-btn", "", "", "", '/account', true),
        new Button("wishlist-btn", "wishlist", <FaRegHeart />, <FaHeart />, '/wishlist'),
        new Button("cart-btn", "", <BsCart />, <BsCartFill />, '/cart'),
      ],
    },
    bottom: {
      logo,
      nav: "home blog shop contact about-us".split(" "),
      search: <BiSearch />,
    },
  };
}
