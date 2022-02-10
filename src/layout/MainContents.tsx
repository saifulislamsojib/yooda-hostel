import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes/routes";
import Sidebar from "./Sidebar/Sidebar";

const MainContents = () => {
  return (
    <Sidebar>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Sidebar>
  );
};

export default MainContents;
