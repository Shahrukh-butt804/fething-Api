'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductList() {
  const [data, setData] = useState<Product[] | null>(null); // Use null to differentiate between loading and empty state

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data: Product[]) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  if (!data) {
    return (
      <h1 className="text-center text-3xl font-semibold uppercase mt-4">
        Loading products...
      </h1>
    ); // Show loading state while fetching
  }

  return (
    <>
      <h1 className="text-center text-3xl font-semibold uppercase my-6">
        Assignment 7
      </h1>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-5">
        {data.map((val) => (
          <Link href={`/product/`+ val.id} key={val.id}  className="group block">
            <div className="w-60 m-5 hover:scale-105 hover:shadow-lg p-2">
              <Image
                src={val.image}
                alt={val.title}
                className="h-[300px] w-full object-cover sm:h-[300px]"
                width={250}
                height={250}
              />
              <div className="mt-3 flex justify-between text-sm">
                <div>
                  <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
                    {val.title}
                  </h3>
                  <p className="mt-1.5 text-pretty text-xs text-gray-500">
                    {val.description.slice(0, 80) + '...'}
                  </p>
                </div>
                <p className="text-gray-900">
                  <span className="font-bold">$</span>
                  {val.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
