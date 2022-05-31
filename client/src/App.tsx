import React, { Fragment } from "react";
import { SignIn } from "./components/auth/signIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/home";
import { SignUp } from "./components/auth/signUp";
import { Layout } from "./components/layout";
import { Tasks } from "./components/tasks/tasks";
import { Create } from "./components/tasks/create";
const App: React.FC = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};
export { App };
