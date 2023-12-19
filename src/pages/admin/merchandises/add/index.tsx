import useFetch from "@/hooks/useFetch";
import { Event, Merchandise } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function AddMerchandisePage() {
  const router = useRouter();
  const { data: eventList, fetchData: fetchEventList } = useFetch<Event[]>();
  const { fetchData: postMerchandise } = useFetch<Merchandise>();
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [ image, setImage ] = useState("");
  const [ url, setUrl ] = useState("");

  useEffect(() => {
    fetchEventList('events', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
  }, [])

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

  const handleAddMerchandise = async (data: any) => {
      postMerchandise("merchandises", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            eventId: Number(data.eventId),
            price: Number(data.price),
            stock: Number(data.stock),
            image: url,
            description: data.description,
        }),
      })
      router.push('/admin/merchandises');
  }
  const handleError = (errors: any) => {};
  
  const addMerchandiseOptions = {
    name: {
      required: "Merchandise name is required",
      minLength: {
        value: 5,
        message: "Merchandise name must have at least 5 characters",
      },
      pattern: {
        value: /^(?=\S)(.{5,})$/,
        message: "Input can't only contains or starts with blank space",
      },
    },
    eventId: {
      required: "Event is required",
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
        message: "Maximum price is Rp 999,999,999",
      },
    },
    stock: {
      required: "Stock is required",
      type: Number,
      min: {
        value: 1,
        message: "Minimum stock is 1",
      },
      max: {
        value: 999,
        message: "Maximum stock is 999",
      },
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
        message: "Input can't only contains or starts with blank space",
      },
    },
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mx-5">Add Merchandise</h1>

      <form className="m-5" onSubmit={handleSubmit(handleAddMerchandise, handleError)}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="mb-2">
              Merchandise Name
            </label>
            <input
              type="text"
              placeholder="Enter event name"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("name", addMerchandiseOptions.name)}
            />
            <small className="text-red-700">
              {errors.name && errors.name.message}
            </small>
          </div>
          <div>
          <label htmlFor="eventId" className="mb-2">
                Event
            </label>
            <select
              className="block form-input border rounded-lg w-full p-2.5 bg-white"
              {...register("eventId", addMerchandiseOptions.eventId)}
            >
              <option value={0}>Choose event</option>
              {eventList && eventList.map((event) => (
                <option key={event.id} value={event.id}>{event.name}</option>
              ))}
            </select>
            <small className="text-red-700">
                {errors.eventId && errors.eventId.message}
            </small>
          </div>
          <div>
          <label htmlFor="price" className="mb-2">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("price", addMerchandiseOptions.price)}
            />
            <small className="text-red-700">
                {errors.price && errors.price.message}
            </small>
          </div>
          <div>
          <label htmlFor="stock" className="mb-2">
              Stock
            </label>
            <input
              type="number"
              placeholder="Enter merchandise stock"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("stock", addMerchandiseOptions.stock)}
            />
            <small className="text-red-700">
                {errors.stock && errors.stock.message}
            </small>
          </div>
          <div className="col-span-2">
          <label htmlFor="image" className="mb-2">
              Image
            </label>
            <input
              type="file"
              placeholder="Enter image"
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("image", addMerchandiseOptions.image)}
              onChange= {(e)=> setImage(e.target.files[0])}
            />
            <small className="text-red-700">
                {errors.image && errors.image.message}
            </small>
          </div>
          <div className="col-span-2 row-start-4">
            <label htmlFor="description" className="mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              rows={5}
              className="block form-input border rounded-lg w-full p-2.5"
              {...register("description", addMerchandiseOptions.description)}
            ></textarea>
            <small className="text-red-700">
                {errors.description && errors.description.message}
            </small>
          </div>
        </div>
        <div className="col-span-6">
          <input type="submit" className="btn btn-primary bg-navy-blue my-5 w-full"/>
        </div>
      </form>
    </>
  );
}

export default AddMerchandisePage;
