import React from "react";

import Home from "./views/Home";
import SignIn from "./views/SignIn";
import Callback from "./views/Callback";
import { getToken } from "./services/token";

export default function App() {
  if (getToken() !== null) return <Home />;
  if (window.location.pathname.startsWith("/callback")) return <Callback />;
  return <SignIn />;
}
