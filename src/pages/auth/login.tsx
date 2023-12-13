import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { setAuthToken } from "@/utils/cookie";
import { useDispatch } from "react-redux";
import { saveUser } from "@/stores/slices/user/userSlice";


function Login() {
  const { data: users, fetchData: fetchUsers } = useFetch<User[]>();
  const [errorLogin, setErrorLogin] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchUsers("users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const handleLogin = (data) => {
    const registeredUser = checkUser(data);
    if (registeredUser) {
      setAuthToken("token", `skillup-${uuidv4()}`);
      setAuthToken("role", registeredUser.role);
      if (registeredUser.role === "admin") {
        router.push("/admin");
      } else {
        dispatch(saveUser(registeredUser));
        router.push("/");
      }
    } else {
      setErrorLogin("Email or password is invalid!");
    }
  };

  const handleError = (errors) => {};
  const router = useRouter();

  const checkUser = (data): User | null => {
    if (users !== null) {
      for (const user of users) {
        if (user.email === data.email && user.password === data.password) {
          return user;
        }
      }
    }
    return null;
  };

  const registerOptions = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        message: "Email is not valid",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
      <div className="h-screen w-full">
        <div className="block md:flex">
          <div className="w-full md:w-1/2">
            <img
              src="/img/login.png"
              className="w-full h-screen object-cover hidden md:block"
              alt="cooking-workshop"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <div className="self-end m-10">
              <h1 className="text-primary text-[40px] font-semibold">SkillUp</h1>
            </div>
            <div className="w-full h-full px-5 lg:px-36">
              <h1 className="text-[40px] font-semibold">Log In</h1>
              {errorLogin !== "" && (
                <div role="alert" className="alert alert-error my-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{errorLogin}</span>
                </div>
              )}
              <form onSubmit={handleSubmit(handleLogin, handleError)} noValidate>
                <div className="mb-10">
                  <label htmlFor="email" className="mb-2 font-medium text-[20px]">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email here.."
                    className="block form-input border rounded w-full p-2.5 placeholder-[#666666]"
                    {...register("email", registerOptions.email)}
                  />
                  <small className="text-red-700">
                    {errors?.email && errors.email.message}
                  </small>
                </div>
                <div className="my-5">
                  <label
                    htmlFor="password"
                    className="mb-2 font-medium text-[20px]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your password here.."
                    className="block form-input border rounded w-full p-2.5 placeholder-secondary-text"
                    {...register("password", registerOptions.password)}
                  />
                  <small className="text-red-700">
                    {errors?.password && errors.password.message}
                  </small>
                </div>

                <div className="my-5 flex justify-between">
                  <div>
                    <input type="checkbox" />
                    <span className="ml-4">Remember me</span>
                  </div>
                  <a href="#" className="flex flex-right underline text-primary">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary text-white rounded font-semibold"
                >
                  <Link href={"/"}></Link>
                  Log In
                </button>
              </form>

              <p className="mt-10">
                Don’t have an account?{" "}
                <Link
                  className="font-semibold cursor-pointer text-primary"
                  href="/auth/signup"
                >
                  Sign Up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
