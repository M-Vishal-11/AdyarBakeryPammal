"use client";
import { useEffect, useState } from "react";
import DropdownSVG from "../../components/icons/svgs/DropdownSVG";
import ProductCard from "./productcard";
import axios from "axios";

interface ProductCardProps {
  open: boolean;
  category: string;
  offer?: boolean;
}

interface Product {
  productName: string;
  price: number;
  discountedPrice?: number;
  descriptions: string[];
  available: boolean;
  imageUrl: string;
}

export default function ProductCategory({
  open,
  category,
  offer,
}: ProductCardProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = offer
          ? "/api/productsDisplay/extractProductsOffers"
          : "/api/productsDisplay/extractProducts";

        const res = await axios.post(url, { category });
        setProducts(res.data.productData);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    getData();
  }, [category, offer]);

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mt-7">
        <details className="group" open={open}>
          <summary className="flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 hover:from-orange-200 hover:to-orange-400 active:from-orange-300 active:to-orange-400 transition-all duration-300 rounded-t-2xl">
            <h2 className="text-xl font-bold text-gray-800">{category}</h2>
            <DropdownSVG />
          </summary>

          <div className="p-6 pt-3">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <ProductCard
                  key={i}
                  productName={product.productName}
                  price={product.price}
                  discountedPrice={product.discountedPrice}
                  descriptions={product.descriptions}
                  isAvailable={product.available}
                  imageURL={product.imageUrl}
                />
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
