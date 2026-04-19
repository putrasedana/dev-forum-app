import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../states/hooks";
import LoginInput from "../components/LoginInput.js";
import { asyncSetAuthUser } from "../states/authUser/action.js";

type LoginCredentials = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogin = async (credentials: LoginCredentials): Promise<void> => {
    try {
      await dispatch(asyncSetAuthUser(credentials));
      navigate("/");
    } catch (error) {
      console.log("Login failed, staying on login page");
    }
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-4">Login</h2>

      <LoginInput onLogin={onLogin} />
      <p className="text-gray-400">
        Don't have an account?
        <Link to="/register" className="underline mx-1 text-indigo-400 hover:text-indigo-300">
          Sign up here
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
