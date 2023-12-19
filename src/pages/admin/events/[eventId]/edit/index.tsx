import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function EditEventPage() {
    const router = useRouter();
  const id = router.query.eventId;
    const today = new Date().toISOString().split('T')[0];
    const { data: event, fetchData: fetchEvent } = useFetch<Event>();
    const { fetchData: postEvent } = useFetch<Event>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
      } = useForm({ values: { event } });
    const [ image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");

    useEffect(() => {
        fetchEvent(`events/${id}`, {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            },
        })
    }, [id])

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
          setUrl(data.url)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
      uploadImage();
    }, [image])

    const handleEditEvent = () => {
        const data = getValues()
        if (data === null) return
        postEvent(`events/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.event?.name,
              category: data.event?.category,
              location: data.event?.location,
              date: data.event?.date,
              startTime: data.event?.startTime,
              duration: data.event?.duration,
              price: data.event?.price,
              image: url,
              description: data.event?.description,
              capacity: {total: data.event?.capacity.total, booked: event?.capacity.booked},
          }),
        })
        router.push('/admin/events');
    }
    const handleError = (errors: any) => {};

    const editEventOptions = {
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
        category: {
          required: "Event name is required",
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
            min: {
              value: 1,
              message: "Minimum duration is 1 hour"
            },
            max: {
              value: 8,
              message: "Maximum duration is 8 hour"
            }
        },
        image: {
            required: false,
        },
        description: {
            required: "Description is required",
            minLength: {
                value: 5,
                message: "Description must have at least 5 characters",
            },
            maxLength: {
                value: 700,
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
      <h1 className="text-2xl font-semibold mx-5">Edit Event</h1>

      <form className="m-5" onSubmit={handleSubmit(handleEditEvent, handleError)}>
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-3">
            <label htmlFor="name" className="mb-2">
              Event Name
            </label>
            <input
              type="text"
              placeholder="Enter event name"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("event.name", editEventOptions.name)}
            />
            <small className="text-red-700">
                {errors.event?.name && errors.event?.name.message}
            </small>
          </div>
          <div className="col-span-3">
            <label htmlFor="category" className="mb-2">
                Category
            </label>
            <select
              placeholder="Enter event category"
              className="block form-input border rounded-lg w-full p-2.5 bg-white"
              {...register("event.category", editEventOptions.category)}
            >
              <option value={0}>Choose event category</option>
              <option value={1}>Art</option>
              <option value={2}>Writing</option>
              <option value={3}>Cooking</option>
              <option value={4}>Technology</option>
              <option value={5}>Development</option>
            </select>
            <small className="text-red-700">
                {errors.event?.location && errors.event?.location.message}
            </small>
          </div>
          <div className="col-span-6 row-start-2">
            <label htmlFor="location" className="mb-2">
                Location
            </label>
            <input
              type="text"
              placeholder="Enter event location"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("event.location", editEventOptions.location)}
            />
            <small className="text-red-700">
                {errors.event?.location && errors.event?.location.message}
            </small>
          </div>
          <div className="col-span-3 row-start-3">
            <label htmlFor="price" className="mb-2">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("event.price", editEventOptions.price)}
            />
            <small className="text-red-700">
                {errors.event?.price && errors.event?.price.message}
            </small>
          </div>
          <div className="col-span-3 col-start-4 row-start-3">
            <label htmlFor="capacity" className="mb-2">
              Capacity
            </label>
            <input
              type="number"
              placeholder="Enter total capacity"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("event.capacity.total", editEventOptions.capacity)}
            />
            <small className="text-red-700">
                {errors.event?.capacity && errors.event?.capacity.message}
            </small>
          </div>
          <div className="col-span-2 row-start-4">
            <label htmlFor="date" className="mb-2">
              Date
            </label>
            <input
              type="date"
              placeholder="Enter event date"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("event.date", editEventOptions.date)}
              min={today}
            />
            <small className="text-red-700">
                {errors.event?.date && errors.event?.date.message}
            </small>
          </div>
          <div className="col-span-2 col-start-3 row-start-4">
            <label htmlFor="startTime" className="mb-2">
              Start Time
            </label>
            <input
              type="time"
              placeholder="Enter start time"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("event.startTime", editEventOptions.startTime)}
            />
            <small className="text-red-700">
                {errors.event?.startTime && errors.event?.startTime.message}
            </small>
          </div>
          <div className="col-span-2 col-start-5 row-start-4">
            <label htmlFor="duration" className="mb-2">
              Duration
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="Enter duration"
                className="block form-input border rounded-lg w-full p-2.5"
                {...register("event.duration", editEventOptions.duration)}
              />
              <span className="block absolute right-1 top-0.5 bg-white p-2 rounded-lg">hour</span>
            </div>

            <small className="text-red-700">
                {errors.event?.duration && errors.event?.duration.message}
            </small>
          </div>
          <div className="col-span-6 row-start-5">
            <label htmlFor="image" className="mb-2">
              Image
            </label>
            <input
              type="file"
              placeholder="Enter image"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("event.image", editEventOptions.image)}
              onChange= {(e)=> setImage(e.target.files[0])}
            />
            <img src={`${event?.image}`} width={100} />
            <small className="text-red-700">
                {errors.event?.image && errors.event?.image.message}
            </small>
          </div>
          <div className="col-span-6 row-start-6">
            <label htmlFor="description" className="mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              rows={5}
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("event.description", editEventOptions.description)}
            ></textarea>
            <small className="text-red-700">
                {errors.event?.description && errors.event?.description.message}
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

export default EditEventPage;
