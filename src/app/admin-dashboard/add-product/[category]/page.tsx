"use client";

import { createProduct } from "@/app/api/admin/addProduct/actions";
import { useState } from "react";
import Link from "next/link";
import BackSVG from "@/components/icons/svgs/BackSVG";
import Image from "next/image";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ProductForm() {
  const params = useParams();
  const categoryParams = params?.category as string;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [offer, setOffer] = useState<string>("no");
  const [category, setCategory] = useState<string>(categoryParams);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleReset = () => {
    setImagePreview(null);
    setOffer("no");
  };

  return (
    <div className="min-h-screen bg-[#ffebe6] py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/admin-dashboard"
            className="text-[#ff8c66] hover:text-[#ff704d] flex items-center"
          >
            <BackSVG />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        </div>

        <form
          className="space-y-4"
          action={async (formData) => {
            await createProduct(formData);
            toast.success("Created successfully");
          }}
        >
          {/* Rest of your form remains exactly the same */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                type="text"
                name="productName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c66]"
                placeholder="Enter product name"
              />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Price *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c66]"
                placeholder="Enter price"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={category as string}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c66]"
                placeholder="Enter category"
              />
            </div>

            {/* Discounted Price */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Discounted Price
              </label>
              <input
                type="number"
                name="discountedPrice"
                min="0"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c66]"
                placeholder="Enter discounted price"
              />
            </div>

            {/* Offer Radio Buttons */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Offer *
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="offer"
                    value="yes"
                    checked={offer === "yes"}
                    onChange={() => setOffer("yes")}
                    className="text-[#ff8c66] focus:ring-[#ff8c66]"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="offer"
                    value="no"
                    checked={offer === "no"}
                    onChange={() => setOffer("no")}
                    className="text-[#ff8c66] focus:ring-[#ff8c66]"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <input
                type="file"
                name="imageURL"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#ff8c66] file:text-white hover:file:bg-[#ff704d]"
              />
              {imagePreview && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Image Preview:
                  </h3>
                  <div className="flex justify-center">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-auto max-h-60 rounded-md border border-gray-200 object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Descriptions */}
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="md:col-span-2 space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Description {num}
                </label>
                <input
                  type="text"
                  name={`desc${num}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c66]"
                  placeholder={`Enter description ${num}`}
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="reset"
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#ff8c66] rounded-md hover:bg-[#ff704d] focus:outline-none focus:ring-2 focus:ring-[#ff8c66]"
            >
              Publish Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
