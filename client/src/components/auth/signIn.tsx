import { observer } from "mobx-react-lite";
import React, { useRef } from "react";

import { storeContext } from "../../store.context";

const AuthView: React.FC = () => {
  const { authStore } = React.useContext(storeContext);
  const isAuth = authStore.isAuthenticated();
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  //   const [username, setUsername] = React.useState("");
  //   const [password, setpassword] = React.useState("");
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let username = usernameRef.current.value;
    const password = passwordRef.current.value;
    authStore.login({ username, password });
  };

  return (
    <div>
      <form
        action=""
        method="post"
        className="flex flex-col gap-2 w-96 mx-auto "
        onSubmit={handleSubmit}
      >
        <h4 className="text-3xl">LOGIN</h4>
        <label htmlFor="UserName" className="flex flex-col">
          Username
          <input
            type="text"
            className="h-8"
            name="username"
            ref={usernameRef}
            required
          />
        </label>
        <label htmlFor="Password" className="flex flex-col">
          Password
          <input
            type="password"
            name="password"
            className="h-8"
            ref={passwordRef}
            required
          />
        </label>
        <button type="submit" className="w-48 bg-green-500 text-white">
          Login
        </button>
      </form>
    </div>
  );
};
const SignIn = observer(AuthView);
export { SignIn };
