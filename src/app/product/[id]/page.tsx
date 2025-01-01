'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const resolvedParams = await params; // Unwrap the Promise
      if (resolvedParams?.id) {
        fetch(`https://fakestoreapi.com/products/${resolvedParams.id}`)
          .then((res) => res.json())
          .then((data) => setProduct(data))
          .catch((error) => console.error(error));
      }
    };

    fetchProduct();
  }, [params]);

  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="px-24 my-10">
      <a href="#" className="group block">
        <Image
          src={product.image}
          alt={product.title}
          className="h-[250px] w-full object-cover sm:h-[450px]"
          width={250}
          height={220}
        />
        <div className="mt-3 flex justify-between text-sm">
          <div>
            <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
              {product.title}
            </h3>
            <p className="mt-1.5 text-pretty text-xs text-gray-500">
              {product.description}
            </p>
          </div>
          <p className="text-gray-900">${product.price}</p>
        </div>
      </a>
    </div>
  );
}
