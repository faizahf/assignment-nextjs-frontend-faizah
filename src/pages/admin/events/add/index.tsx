import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function AddEventPage() {
    const router = useRouter();
    const { fetchData: postEvent } = useFetch<Event>();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const [ image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");

    const uploadImage = async () => {
      const data = new FormData()
  
      if (image) {
        data.append("file", image)
      }
      data.append("upload_preset", "skillup")
      data.append("cloud_name","dpwb7bjzp")
      data.append("api_key", "841675276915747")
  
      const response = await fetch("https://api.cloudinary.com/v1_1/dpwb7bjzp/image/upload",{
        method:"POST",
        body: data
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data.url);
          setUrl(data.url)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
      uploadImage();
    }, [image])

    const handleAddEvent = async (data: any) => {
        postEvent("events", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              date: data.date,
              startTime: data.startTime,
              duration: data.duration,
              price: Number(data.price),
              image: url,
              description: data.description,
              location: data.location,
              capacity: {total: Number(data.capacity), booked: 0},
          }),
        })
        router.push('/admin/events');
    }
    const handleError = (errors: any) => {};

    const addEventOptions = {
        name: {
            required: "Event name is required",
            minLength: {
                value: 5,
                message: "Event name must have at least 5 characters",
            },
            pattern: {
                value: /^(?=\S)(.{5,})$/,
                message: "Input can't only contains or starts with blank space"
            },
        },
        location: { 
            required: "Event location is required",
            minLength: {
                value: 5,
                message: "Event location must have at least 5 characters",
            },
            pattern: {
                value: /^(?=\S)(.{5,})$/,
                message: "Input can't only contains or starts with blank space"
            },
        },
        price: {
          required: "Price is required",
          type: Number,
          min: {
            value: 100,
            message: "Minimum price is Rp 100",
        },
          max: {
            value: 999999999,
            message: "Maximum price is Rp 999,999,999"
        }
        },
        capacity: {
          required: "Capacity is required",
          type: Number,
          min: {
            value: 1,
            message: "Minimum capacity is 1",
        },
          max: {
            value: 999,
            message: "Maximum capacity is 999",
        }
        },
        date: {
            required: "Date is required",
        },
        startTime: {
            required: "Event date is required",
        },
        duration: {
            required: "Duration is required",
        },
        image: {
            required: "Image is required",
        },
        description: {
            required: "Description is required",
            minLength: {
                value: 5,
                message: "Description must have at least 5 characters",
            },
            maxLength: {
                value: 500,
                message: "Description must have maximum 500 characters",
            },
            pattern: {
                value: /^(?=\S)(.{5,})$/,
                message: "Input can't only contains or starts with blank space"
            },
        },
        
        
      };

  return (
    <>
      <h1 className="text-2xl font-semibold mx-5">Add Event</h1>

      <form className="m-5" onSubmit={handleSubmit(handleAddEvent, handleError)}>
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-3">
            <label htmlFor="name" className="mb-2">
              Event Name
            </label>
            <input
              type="text"
              placeholder="Enter event name"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("name", addEventOptions.name)}
            />
            <small className="text-red-700">
                {errors.name && errors.name.message}
            </small>
          </div>
          <div className="col-span-3">
            <label htmlFor="location" className="mb-2">
                Location
            </label>
            <input
              type="text"
              placeholder="Enter event location"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("location", addEventOptions.location)}
            />
            <small className="text-red-700">
                {errors.location && errors.location.message}
            </small>
          </div>
          <div className="col-span-3 row-start-2">
            <label htmlFor="price" className="mb-2">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("price", addEventOptions.price)}
            />
            <small className="text-red-700">
                {errors.price && errors.price.message}
            </small>
          </div>
          <div className="col-span-3 col-start-4 row-start-2">
            <label htmlFor="capacity" className="mb-2">
              Capacity
            </label>
            <input
              type="number"
              placeholder="Enter total capacity"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("capacity", addEventOptions.capacity)}
            />
            <small className="text-red-700">
                {errors.capacity && errors.capacity.message}
            </small>
          </div>
          <div className="col-span-2 row-start-3">
            <label htmlFor="date" className="mb-2">
              Date
            </label>
            <input
              type="text"
              placeholder="Enter event date"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("date", addEventOptions.date)}
            />
            <small className="text-red-700">
                {errors.date && errors.date.message}
            </small>
          </div>
          <div className="col-span-2 col-start-3 row-start-3">
            <label htmlFor="startTime" className="mb-2">
              Start Time
            </label>
            <input
              type="text"
              placeholder="Enter start time"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("startTime", addEventOptions.startTime)}
            />
            <small className="text-red-700">
                {errors.startTime && errors.startTime.message}
            </small>
          </div>
          <div className="col-span-2 col-start-5 row-start-3">
            <label htmlFor="duration" className="mb-2">
              Duration
            </label>
            <input
              type="text"
              placeholder="Enter duration"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("duration", addEventOptions.duration)}
            />
            <small className="text-red-700">
                {errors.duration && errors.duration.message}
            </small>
          </div>
          <div className="col-span-6 row-start-4">
            <label htmlFor="image" className="mb-2">
              Image
            </label>
            <input
              type="file"
              placeholder="Enter image"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("image", addEventOptions.image)}
              onChange= {(e)=> setImage(e.target.files[0])}
            />
            <small className="text-red-700">
                {errors.image && errors.image.message}
            </small>
          </div>
          <div className="col-span-6 row-start-5">
            <label htmlFor="description" className="mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              rows={5}
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("description", addEventOptions.description)}
            ></textarea>
            <small className="text-red-700">
                {errors.description && errors.description.message}
            </small>
          </div>
          <div className="col-span-6">
            <input type="submit" className="btn btn-primary bg-navy-blue my-5 w-full"/>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddEventPage;
