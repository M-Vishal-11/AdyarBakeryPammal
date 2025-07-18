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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
      <details className="group" open={open}>
        <summary className="flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 active:from-orange-200 active:to-orange-300 transition-all duration-300 mb-3">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
          </div>
          <div className="flex items-center gap-3">
            <DropdownSVG />
          </div>
        </summary>

        <div className="p-6 pt-0">
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
  );
}
