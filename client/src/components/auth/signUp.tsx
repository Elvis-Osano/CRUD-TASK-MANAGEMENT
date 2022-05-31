import { useContext, useRef } from "react";
import { storeContext } from "../../store.context";
import { AuthStore } from "../../store/auth.store";

const SignUp: React.FC = () => {
  const { authStore } = useContext(storeContext);
  const isAuth = authStore.isAuthenticated();
  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let username = usernameRef.current.value;
    const password = passwordRef.current.value;
    authStore.signup({ username, password });
  };
  return (
    <div>
      <form
        action=""
        method="post"
        className="flex flex-col gap-2 w-96 mx-auto "
        onSubmit={handleSubmit}
      >
        <h4 className="text-3xl">SIGNUP</h4>
        <label htmlFor="UserName" className="flex flex-col">
          Username
          <input
            type="text"
            name="username"
            ref={usernameRef}
            className="h-8"
            required
          />
        </label>
        <label htmlFor="Password" className="flex flex-col">
          Password
          <input
            type="password"
            name="password"
            ref={passwordRef}
            className="h-8"
            required
          />
        </label>
        <button type="submit" className="w-48 bg-red-500 text-white">
          Sign Up
        </button>
      </form>
    </div>
  );
};
export { SignUp };
