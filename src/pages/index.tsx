import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import useFetch from "@/hooks/useFetch";
import { Event } from "@/types";
import { useEffect } from "react";
import Footer from "@/components/Footer/Footer";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
  const { data: events, fetchData: fetchEventList } = useFetch<Event[]>();
  useEffect(() => {
    fetchEventList('events', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }, [])

  const formatCurrency = (nominal: number): string => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(nominal);
};

  return (
    <div>
      <Navbar />
    <main className='flex min-h-screen flex-col px-60'>
      <h1 className="text-[36px] text-primary font-semibold">Workshops</h1>
      <div className="grid grid-cols-4 gap-5 my-5">
        {events?.map((event) => (
          <div key={event.id} className="card card-compact bg-base-100 shadow-xl group relative cursor-pointer" onClick={() => router.push(`event/${event.id}`)}>
            <figure>
              <img
                src={`${event.image}`}
                alt={`${event.name}`}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{event.name}</h2>
              <p>{event.startTime}</p>
              <p className="text-primary font-semibold text-2xl">{formatCurrency(event.price)}</p>
              <div className="card-actions justify-end">
              <div className="gap-2 w-full h-[39px] items-center hidden group-hover:flex">
                      <div className="h-full flex flex-initial w-[39px] items-center justify-center">
                        <img src="icons/bookmark.svg" />
                      </div>
                      <div className="grow">
                      <button className="btn btn-primary w-full bg-primary text-white" onClick={() => router.push(`event/${event.id}/order`)}>Book Now</button>
                      </div>
                    </div>
              </div>
            </div>
          </div>

        ))}
      </div>
    </main>
    <Footer />
    </div>
  );
}
