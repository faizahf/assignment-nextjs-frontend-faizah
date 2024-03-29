import useFetch from "@/hooks/useFetch";
import { Event, Merchandise, MerchandiseForm } from "@/types";
import { merchandiseOptions } from "@/validations/merchandise";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function AddMerchandisePage() {
  const router = useRouter();
  const { data: eventList, fetchData: fetchEventList } = useFetch<Event[]>();
  const { fetchData: postMerchandise } = useFetch<Merchandise>();
  const { register, handleSubmit, formState: { errors }} = useForm<MerchandiseForm>();
  const [ image, setImage ] = useState<File | null>();
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
              {...register("name", merchandiseOptions.name)}
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
              {...register("eventId", merchandiseOptions.eventId)}
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
              {...register("price", merchandiseOptions.price)}
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
              {...register("stock", merchandiseOptions.stock)}
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
              {...register("image", merchandiseOptions.image)}
              onChange= {(e)=> setImage(e.target.files ? e.target.files[0] : null)}
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
              {...register("description", merchandiseOptions.description)}
            ></textarea>
            <small className="text-red-700">
                {errors.description && errors.description.message}
            </small>
          </div>
        </div>
        <div className="col-span-6">
          <input type="submit" className="btn btn-primary bg-dark my-5 w-full"/>
        </div>
      </form>
    </>
  );
}

export default AddMerchandisePage;
