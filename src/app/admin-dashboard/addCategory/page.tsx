"use client";
import { useState } from "react";
import { FiSave } from "react-icons/fi";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

const AddCategoryPage = () => {
  const [category, setCategory] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      category,
      productName,
      price,
    };

    await axios.post("/api/admin/addCategory", data);

    toast.success("Category added");
  };

  return (
    <div className="min-h-screen bg-[#ffebe6] p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Category/Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Link
              href="/admin-dashboard"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
            >
              <FiSave className="mr-2" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryPage;
