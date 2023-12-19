import useFetch from '@/hooks/useFetch';
import { Event, Merchandise } from '@/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

function EditMerchandisePage() {
    const router = useRouter();
    const id = router.query.merchId;
    const { data: eventList, fetchData: fetchEventList } = useFetch<Event[]>();
    const { data: merchandise, fetchData: fetchMerchandise } = useFetch<Merchandise>();
    const { fetchData: updateMerchandise } = useFetch<Merchandise>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
      } = useForm({ values: { merchandise } });
    const [ image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");

    useEffect(() => {
        fetchMerchandise(`merchandises/${id}`, {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
            },
        })

        fetchEventList('events', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            },
          })
    }, [id])

    const handleEditMerchandise = () => {
        const data = getValues()
        if (data === null) return
        updateMerchandise(`merchandises/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.merchandise?.name,
              eventId: Number(data.merchandise?.eventId),
              price: Number(data.merchandise?.price),
              stock: Number(data.merchandise?.stock),
              image: url,
              description: data.merchandise?.description,
          }),
        })
        router.push('/admin/merchandises');
    }
    const handleError = (errors: any) => {};

    const editMerchandiseOptions = {
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
          required: false,
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
    <h1 className="text-2xl font-semibold mx-5">Edit Merchandise</h1>

    <form className="m-5" onSubmit={handleSubmit(handleEditMerchandise, handleError)}>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="mb-2">
            Merchandise Name
          </label>
          <input
            type="text"
            placeholder="Enter event name"
            className="block form-input border rounded-lg w-full p-2.5"
            {...register("merchandise.name", editMerchandiseOptions.name)}
          />
          <small className="text-red-700">
            {errors.merchandise?.name && errors.merchandise.name.message}
          </small>
        </div>
        <div>
        <label htmlFor="eventId" className="mb-2">
              Event
          </label>
          <select
            className="block form-input border rounded-lg w-full p-2.5 bg-white"
            {...register("merchandise.eventId", editMerchandiseOptions.eventId)}
          >
            <option value={0}>Choose event</option>
            {eventList && eventList.map((event) => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
          <small className="text-red-700">
              {errors.merchandise?.eventId && errors.merchandise.eventId.message}
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
            {...register("merchandise.price", editMerchandiseOptions.price)}
          />
          <small className="text-red-700">
              {errors.merchandise?.price && errors.merchandise.price.message}
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
            {...register("merchandise.stock", editMerchandiseOptions.stock)}
          />
          <small className="text-red-700">
              {errors.merchandise?.stock && errors.merchandise.stock.message}
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
            {...register("merchandise.image", editMerchandiseOptions.image)}
            onChange= {(e)=> setImage(e.target.files[0])}
          />
          <small className="text-red-700">
              {errors.merchandise?.image && errors.merchandise.image.message}
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
            {...register("merchandise.description", editMerchandiseOptions.description)}
          ></textarea>
          <small className="text-red-700">
              {errors.merchandise?.description && errors.merchandise.description.message}
          </small>
        </div>
      </div>
      <div className="col-span-6">
        <input type="submit" className="btn btn-primary bg-navy-blue my-5 w-full"/>
      </div>
    </form>
  </>
  )
}

export default EditMerchandisePage