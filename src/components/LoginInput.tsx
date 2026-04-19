import useInput from "../hooks/useInput";

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginInputProps = {
  onLogin: (credentials: LoginCredentials) => void;
};

const LoginInput = ({ onLogin }: LoginInputProps) => {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-100">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-100">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          className="w-full px-3 py-2 border border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500"
      >
        Login
      </button>
    </form>
  );
};

export default LoginInput;
