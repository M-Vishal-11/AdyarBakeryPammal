"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackSVG from "@/components/icons/svgs/BackSVG";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { editProduct } from "@/app/api/admin/editProduct/actions";

export default function UpdateProduct() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productNameparams = searchParams.get("productName");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteImageConfirmation, setDeleteImageConfirmation] = useState(false);
  const [deleteProductConfirmation, setDeleteProductConfirmation] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  const [offer, setOffer] = useState("no");
  const [productName, setProductName] = useState(productNameparams || "");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [imageUrl, setImageURL] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [descriptions, setDescriptions] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/productsDisplay/getProduct", {
        params: { productName: productNameparams },
      });

      const productInfo = res.data.productData[0];

      if (productInfo.offer === true) {
        setOffer("yes");
      } else {
        setOffer("no");
      }

      setPrice(productInfo.price || 0);
      setCategory(productInfo.category || "");
      setImageURL(productInfo.imageUrl || "");
      setDiscountedPrice(productInfo.discountedPrice || "");
      setDescriptions(
        Array.isArray(productInfo.descriptions)
          ? productInfo.descriptions.concat(Array(5).fill("")).slice(0, 5)
          : ["", "", "", "", ""]
      );
    };
    fetchData();
  }, [productNameparams]);

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
    setProductName("");
    setPrice(0);
    setCategory("");
    setImageURL("");
    setDiscountedPrice("");
    setDescriptions(["", "", "", "", ""]);
  };

  const handleDeleteImage = async () => {
    if (!deleteImageConfirmation) return;

    setIsDeletingImage(true);
    try {
      await axios.delete("/api/admin/editProduct/deleteImage", {
        data: { imageUrl, productName },
      });
      setImageURL("");
      setDeleteImageConfirmation(false);
      setImagePreview(null);
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    } finally {
      setIsDeletingImage(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductConfirmation) return;

    setIsDeleting(true);
    try {
      await axios.delete("/api/admin/editProduct/deleteProduct", {
        data: { productName },
      });
      router.push("/admin-dashboard");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
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
          <h1 className="text-2xl font-bold text-gray-800">Update Product</h1>
        </div>

        <form
          className="space-y-4"
          action={editProduct as unknown as (formData: FormData) => void}
        >
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
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
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c66]"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
              />
            </div>

            {/* Offer */}
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
              {imageUrl && !imagePreview && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Current Product Image
                  </h3>
                  <div className="flex justify-center">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="max-w-full h-auto max-h-60 rounded-md border border-gray-200 object-contain"
                    />
                  </div>
                </div>
              )}
              {imagePreview && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    New Image Preview
                  </h3>
                  <div className="flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full h-auto max-h-60 rounded-md border border-gray-200 object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Descriptions */}
            {descriptions.map((desc, idx) => (
              <div key={idx} className="md:col-span-2 space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Description {idx + 1}
                </label>
                <input
                  type="text"
                  name={`desc${idx + 1}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff8c66]"
                  placeholder={`Enter description ${idx + 1}`}
                  value={desc}
                  onChange={(e) => {
                    const newDescriptions = [...descriptions];
                    newDescriptions[idx] = e.target.value;
                    setDescriptions(newDescriptions);
                  }}
                />
              </div>
            ))}

            {imageUrl && (
              <div className="mt-6 space-y-4 md:col-span-2">
                {/* Image URL Display */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Image URL in Database
                  </h3>
                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                    <input
                      type="text"
                      readOnly
                      name="imageURLFromDB"
                      value={imageUrl}
                      className="flex-1 px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm text-sm truncate focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(imageUrl)}
                      className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium rounded-md transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Delete Image Option */}
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <h3 className="text-sm font-medium text-red-700 mb-2">
                    Delete Image
                  </h3>
                  <p className="text-sm text-red-600 mb-3">
                    This will remove the current product image from storage.
                  </p>
                  <div className="flex items-center space-x-3">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={deleteImageConfirmation}
                        onChange={(e) =>
                          setDeleteImageConfirmation(e.target.checked)
                        }
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-red-700">
                        Confirm image deletion
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      disabled={!deleteImageConfirmation || isDeletingImage}
                      className={`ml-auto px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        deleteImageConfirmation
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-red-100 text-red-400 cursor-not-allowed"
                      }`}
                    >
                      {isDeletingImage ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Deleting...
                        </span>
                      ) : (
                        "Delete Image"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Buttons */}
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
              Update Product
            </button>
          </div>
        </form>

        {/* Delete Product Section */}
        <div className="mt-6 space-y-4 border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700">Danger Zone</h3>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h4 className="text-sm font-medium text-red-700 mb-2">
              Delete Product
            </h4>
            <p className="text-sm text-red-600 mb-3">
              This action cannot be undone. This will permanently delete the
              product and all its data.
            </p>

            <div className="flex items-center space-x-3">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={deleteProductConfirmation}
                  onChange={(e) =>
                    setDeleteProductConfirmation(e.target.checked)
                  }
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-red-700">
                  I understand the consequences
                </span>
              </label>
              <button
                onClick={handleDeleteProduct}
                disabled={!deleteProductConfirmation || isDeleting}
                className={`ml-auto px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  deleteProductConfirmation
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-red-100 text-red-400 cursor-not-allowed"
                }`}
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  "Delete Product Permanently"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
