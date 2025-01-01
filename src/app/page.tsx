'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [data,setData] =useState<any>([])

  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data)=>{
      setData(data)
      console.log("this is data",data)
    })
    .catch(error=>console.log(error))
  },[])


  return (
    <>
    <h1 className="text-center text-3xl font-semibold uppercase mt-4">Fetching Api </h1>
    
    <div className="flex flex-col  md:flex-row md:flex-wrap justify-center items-center gap-5">
    {data.length> 0 ?
    data.map((val:any,index:any) => ( 
      <a href="#" className="group block">

        <div className="w-72 m-5 hover:scale-105 hover:shadow-lg p-2">
      <img
        src={val?.image}
        alt=""
        className="h-[300px] w-full object-cover sm:h-[300px]"
      />
    
      <div className="mt-3 flex justify-between text-sm">
        <div>
          <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
           {val.name}
          </h3>
    
          <p className="mt-1.5 text-pretty text-xs text-gray-500">
          {val.description.slice(0,80)+"..."}
          </p>
        </div>
    
        <p className="text-gray-900"><span className="font-bold">$</span>{val.price}</p>
      </div>
      </div>

     </a>
    
    ))
    
:<></>

    }
    </div>
    </>
  );
}
