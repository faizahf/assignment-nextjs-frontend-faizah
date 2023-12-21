import { SignupForm } from "@/types";
import { UseFormWatch } from 'react-hook-form';

export const loginOptions = {
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

export const registerOptions = (watch: UseFormWatch<SignupForm>) => {
    return  {

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
        }
    }
};
