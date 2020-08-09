import React from "react";

import Home from "./views/Home";
import SignIn from "./views/SignIn";
import Callback from "./views/Callback";

export default function App() {
  if (window.localStorage.getItem("token") !== null) return <Home />;
  if (window.location.pathname.startsWith("/callback")) return <Callback />;
  return <SignIn />;
}
