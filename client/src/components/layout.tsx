import { Link } from "react-router-dom";

const Layout: React.FC = (props) => {
  return (
    <nav>
      <ul className="flex gap-4 font-sans text-red-700 p-5 ">
        <li>
          <Link to={"/signin"} className="hover:text-blue-500">
            Login
          </Link>
        </li>
        <li>
          <Link to={"/signup"} className="hover:text-blue-500">
            Register
          </Link>
        </li>
        <li>
          <Link
            to={"/signin"}
            onClick={() => {
              localStorage.removeItem("token");
            }}
            className="hover:text-blue-500"
          >
            Logout
          </Link>
        </li>
        <li>
          <Link to={"/tasks"} className="hover:text-blue-500">
            Tasks
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export { Layout };
