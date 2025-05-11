import React from "react";

const AddNotice = () => {
    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Add New Notice</h2>
                <form className="space-y-4 bg-gray-100">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                            placeholder="Enter notice title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Note</label>
                        <textarea
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                            rows="4"
                            placeholder="Enter notice content"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Add Notice
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNotice;
