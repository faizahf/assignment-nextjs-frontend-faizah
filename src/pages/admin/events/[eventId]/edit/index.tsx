import useFetch from "@/hooks/useFetch";
import { Event, EventForm } from "@/types";
import { eventOptions } from "@/validations/event";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function EditEventPage() {
    const router = useRouter();
  const id = router.query.eventId;
    const today = new Date().toISOString().split('T')[0];
    const { data: event, fetchData: fetchEvent } = useFetch<EventForm>();
    const { fetchData: updateEvent } = useFetch<Event>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
      } = useForm<EventForm>({ values: event as EventForm });
    const [ image, setImage ] = useState<File | null>();
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
        updateEvent(`events/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              category: Number(data.category),
              location: data.location,
              date: data.date,
              startTime: data.startTime,
              duration: data.duration,
              price: data.price,
              image: url,
              description: data.description,
              capacity: {total: data.capacity.total, booked: event?.capacity.booked},
          }),
        })
        router.push('/admin/events');
    }
    const handleError = (errors: any) => {};

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
              {...register("name", eventOptions.name)}
            />
            <small className="text-red-700">
                {errors.name && errors.name.message}
            </small>
          </div>
          <div className="col-span-3">
            <label htmlFor="category" className="mb-2">
                Category
            </label>
            <select
              placeholder="Enter event category"
              className="block form-input border rounded-lg w-full p-2.5 bg-white"
              {...register("category", eventOptions.category)}
            >
              <option value={0}>Choose event category</option>
              <option value={1}>Art</option>
              <option value={2}>Writing</option>
              <option value={3}>Cooking</option>
              <option value={4}>Technology</option>
              <option value={5}>Development</option>
            </select>
            <small className="text-red-700">
                {errors.location && errors.location.message}
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
              {...register("location", eventOptions.location)}
            />
            <small className="text-red-700">
                {errors.location && errors.location.message}
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
              {...register("price", eventOptions.price)}
            />
            <small className="text-red-700">
                {errors.price && errors.price.message}
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
              {...register("capacity.total", eventOptions.capacity)}
            />
            <small className="text-red-700">
                {errors.capacity && errors.capacity.message}
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
              {...register("date", eventOptions.date)}
              min={today}
            />
            <small className="text-red-700">
                {errors.date && errors.date.message}
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
              {...register("startTime", eventOptions.startTime)}
            />
            <small className="text-red-700">
                {errors.startTime && errors.startTime.message}
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
                {...register("duration", eventOptions.duration)}
              />
              <span className="block absolute right-1 top-0.5 bg-white p-2 rounded-lg">hour</span>
            </div>

            <small className="text-red-700">
                {errors.duration && errors.duration.message}
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
              {...register("image", eventOptions.image)}
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
            <img src={`${event?.image}`} width={100} />
            <small className="text-red-700">
                {errors.image && errors.image.message}
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
              {...register("description", eventOptions.description)}
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

export default EditEventPage;
