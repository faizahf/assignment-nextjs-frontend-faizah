import { ProfileForm } from "@/types";
import { UseFormWatch } from "react-hook-form";

export const profileOptions = (watch: UseFormWatch<ProfileForm>) => {
    return {
        name: {
            required: false,
            minLength: {
              value: 3,
              message: "Name must have at least 3 characters",
            },
            pattern: {
              value: /^(?=\S)(.{3,})$/,
              message: "Input can't only contains or starts with blank space",
            },
        },
        email: {
            required: false,
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid"
            }
        },
        password: {
            required: false,
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
        },
        confirmPassword: {
            required: false,
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
}