import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types";

function Signup() {
  const router = useRouter();
  const { data: users, fetchData: fetchUsers } = useFetch<User[]>();
  const [errorSignup, setErrorSignup] = useState('');

  useEffect(() => {
    fetchUsers('users', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      },
    })
  }, [])

  const isUserRegistered = (data: any): boolean => {
    if (users) {
      for (const user of users) {
        if (user.email === data.email) {
          return true;
        }
      }
    }
    return false;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleRegistration = (data: any) => {
    if (isUserRegistered(data)) {
      setErrorSignup("Email address you've entered has been registered!");
      return;
    }

    fetchUsers("users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        role: "user",
        membership: "silver",
        balance: 0,
        image: "",
        bookmarks: [],
        events: []
    }),
    });
    router.push("/auth/login");
  };
  const handleError = (errors) => {};

  const registerOptions = {
    name: { required: "Name is required" },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        message: "Email is not valid"
      }
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
    confirmPassword: {
      required: "Confirm password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
      validate: (val: string) => {
        if (watch("password") != val) {
          return "Your passwords do no match";
        }
      },
    },
  };

  return (
    <>
      <div className="h-screen w-full">
        <div className="block md:flex">
          <div className="w-full md:w-1/2">
            <img
              src="/img/signup.png"
              className="w-full h-screen object-cover hidden md:block"
              alt="coffee-workshop"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <div className="self-end m-10">
              <h1 className="text-primary text-[40px] font-semibold">
                SkillUp
              </h1>
            </div>
            <div className="w-full h-full px-5 lg:px-36">
              <h1 className="text-[40px] font-semibold">Sign Up</h1>
              {errorSignup !== "" && (
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
                <span>{errorSignup}</span>
              </div>
            )}
              <form onSubmit={handleSubmit(handleRegistration, handleError)} noValidate>
                <div className="mb-10">
                  <label htmlFor="name" className="mb-2 text-[20px]">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name here.."
                    className="block form-input border rounded w-full p-2.5 placeholder-secondary-text"
                    {...register("name", registerOptions.name)}
                    // value={data.fullname}
                    // onChange={changeHandler}
                  />
                  <small className="text-red-700">
                    {errors?.name && errors.name.message}
                  </small>
                </div>
                <div className="my-10">
                  <label htmlFor="email" className="mb-2 text-[20px]">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email here.."
                    className="block form-input border rounded w-full p-2.5 placeholder-secondary-text"
                    {...register("email", registerOptions.email)}
                    // value={data.email}
                    // onChange={changeHandler}
                  />
                  <small className="text-red-700">
                    {errors?.email && errors.email.message}
                  </small>
                </div>
                <div className="my-10">
                  <label htmlFor="password" className="mb-2 text-[20px]">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Your password here.."
                    className="block form-input border rounded w-full p-2.5 placeholder-secondary-text"
                    {...register("password", registerOptions.password)}
                    // value={data.password}
                    // onChange={changeHandler}
                  />
                  <small className="text-red-700">
                    {errors?.password && errors.password.message}
                  </small>
                </div>
                <div className="my-10">
                  <label htmlFor="confirmPassword" className="mb-2 text-[20px]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirmation password.."
                    className="block form-input border rounded w-full p-2.5 placeholder-secondary-text"
                    {...register(
                      "confirmPassword",
                      registerOptions.confirmPassword
                    )}
                    // value={data.confirmPassword}
                    // onChange={changeHandler}
                  />
                  <small className="text-red-700">
                    {errors?.confirmPassword && errors.confirmPassword.message}
                  </small>
                </div>

                <button
                  type="submit"
                  className="text-white w-full py-2.5 bg-primary rounded font-semibold"
                >
                  Sign Up
                </button>
              </form>

              <p className="mt-10">
                Have an account?{" "}
                <Link
                  className="font-semibold cursor-pointer text-primary"
                  href={"/auth/login"}
                >
                  Log In here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
