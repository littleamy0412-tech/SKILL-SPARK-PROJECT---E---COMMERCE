import language from "./data/language.json";
import currency from "./data/currency.json";

import { IoMdPerson } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsCart, BsCartFill } from "react-icons/bs";

class Button {
  constructor(_id, text, icon_p, icon_s = "", hide = false) {
    this._id = _id;
    this.text = text;
    this.icon_p = icon_p;
    this.icon_s = icon_s;
    this.hide = hide;
  }
}

export default function () {
  return {
    top: {
      select: [
        {
          _id: "language",
          content: JSON.parse(language),
        },
        {
          _id: "currency",
          content: JSON.parse(currency),
        },
      ],
      button: [
        new Button("login-btnPopup", "login", <IoMdPerson />),
        new Button("wishlist-btn", "wishlist", <FaRegHeart />, <FaHeart />),
        new Button("cart-btn", "", <BsCart />, <BsCartFill />),
      ],
    },
  };
}
