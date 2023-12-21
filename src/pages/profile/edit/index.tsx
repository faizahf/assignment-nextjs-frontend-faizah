import useFetch from '@/hooks/useFetch';
import { updateProfile } from '@/stores/slices/user/userSlice';
import { RootState } from '@/stores/store';
import { ProfileForm, User } from '@/types';
import { profileOptions } from '@/validations/profile';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfilePage() {
    const router = useRouter();
    const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.user.data);
  const { fetchData: updateUser } = useFetch<User>();
  const { data: user, fetchData: fetchUser } = useFetch<ProfileForm>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues
  } = useForm<ProfileForm>({ values: user as ProfileForm });
  const editProfileOptions = profileOptions(watch);

  useEffect(() => {
    if (loggedUser) {
        fetchUser(`users/${loggedUser.id}`, {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}, [])

    const handleEditProfile = () => {
        const data = getValues()
        updateUser(`users/${loggedUser?.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            })
        })

        dispatch(updateProfile({name: data.name, email: data.email, password: data.password}));
        router.push('/profile');
    
        toast.success("Profile updated!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            theme: "light",
            hideProgressBar: true,
        });
      }
  const handleError = (errors: any) => {};


  return (
    <>
      <div className="w-full mx-auto">
        <h1 className="text-[36px] text-dark font-semibold text-center">
          Edit Profile
        </h1>
        <div className='bg-white p-5 rounded-xl'>
            <form onSubmit={handleSubmit(handleEditProfile, handleError)} noValidate>
                    <div className="my-5">
                    <label htmlFor="name" className="mb-2 text-[20px]">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Your full name here.."
                        className="block form-input border rounded w-full p-2.5 placeholder-secondary-text"
                        {...register("name", editProfileOptions.name)}
                    />
                    <small className="text-red-700">
                        {errors.name && errors.name.message}
                    </small>
                    </div>
                    <div className="my-5">
                    <label htmlFor="email" className="mb-2 text-[20px]">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Your email here.."
                        className="block form-input border rounded w-full p-2.5 placeholder-secondary-text"
                        {...register("email", editProfileOptions.email)}
                    />
                    <small className="text-red-700">
                        {errors.email && errors.email.message}
                    </small>
                    </div>
                    <div className="my-5">
                    <label htmlFor="password" className="mb-2 text-[20px]">
                        New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Your password here.."
                        className="block form-input border rounded w-full p-2.5 placeholder-secondary-text"
                        {...register("password", editProfileOptions.password)}
                    />
                    <small className="text-red-700">
                        {errors.password && errors.password.message}
                    </small>
                    </div>
                    <div className="my-5">
                    <label htmlFor="confirmPassword" className="mb-2 text-[20px]">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirmation password.."
                        className="block form-input border rounded w-full p-2.5 placeholder-secondary-text"
                        {...register(
                        "confirmPassword",
                        editProfileOptions.confirmPassword
                        )}
                    />
                        <small className="text-red-700">
                        {errors.confirmPassword && errors.confirmPassword.message}
                        </small>
                    </div>

                    <button
                    type="submit"
                    className="text-white w-full py-2.5 bg-primary rounded font-semibold"
                    >
                    Submit
                    </button>
            </form>
        </div>

        </div>
    </>
  )
}

export default EditProfilePage