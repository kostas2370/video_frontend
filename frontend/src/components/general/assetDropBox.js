import React from "react";

export const AssetDropBox = ({handleChange, type, items, selectedFile, className, value }) => {
  return (
    <>
      <div className={className}>
        <label
          htmlFor="intro"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Intro :
        </label>
        <select
          name="intro"
          value={value}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          onChange={handleChange}
        >
          <option key="no_value" value="">
            No {type}
          </option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className={className}>
        {selectedFile ? (
          <video controls key={selectedFile}>
            <source src={selectedFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>
    </>
  );
};
