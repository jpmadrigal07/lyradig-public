import React from "react";
import Head from "next/head";
import Image from "next/image";
import { products } from "../utils/constants";

const Shop = () => {
  return (
    <>
      <Head>
        <title>Shop - Lyradig</title>
      </Head>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Products
        </h2>
        <div className="mt-2 grid grid-cols-1 gap-y-5 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className="group bg-white shadow rounded-md p-3"
            >
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  width="300"
                  height="300"
                  layout="responsive"
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
