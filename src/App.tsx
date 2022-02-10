import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainContents from "./layout/MainContents";
import "./styles/global.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <MainContents />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
