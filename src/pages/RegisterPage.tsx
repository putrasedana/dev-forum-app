import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../states/hooks";
import RegisterInput from "../components/RegisterInput.js";
import { asyncRegisterUser } from "../states/users/action.js";

type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onRegister = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      await dispatch(asyncRegisterUser(credentials));
      navigate("/login");
    } catch (error) {
      console.log("Register failed, staying on register page");
    }
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-semibold mb-8 border-b border-gray-700 pb-4">Register</h2>

      <RegisterInput onRegister={onRegister} />
      <p className="text-gray-400">
        Already have an account?
        <Link to="/login" className="underline mx-1 text-indigo-400 hover:text-indigo-300">
          Sign in here
        </Link>
      </p>
    </div>
  );
};
export default RegisterPage;
