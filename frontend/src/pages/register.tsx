import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { register as registerAction } from "../store/authSlice";

interface Inputs {
  name: string;
  email: string;
  password: string;
  role: string;
}

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    email,
    password,
    role,
  }) => {
    try {
      await dispatch(registerAction({ name, email, password, role }));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Register User
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...registerInput("name")}
              id="name"
              placeholder="Name"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...registerInput("email")}
              id="email"
              placeholder="Email"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...registerInput("password")}
              id="password"
              type="password"
              placeholder="Password"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              {...registerInput("role")}
              id="role"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
            {errors.role && (
              <span className="text-xs text-red-500">
                {errors.role.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
