import React from "react";
import { toast } from "react-toastify";
import { renderVideo } from "../api/apiService";
import { GiProcessor } from "react-icons/gi";
import { CloseModalButton } from "./ui/CloseModalButton";

export function RenderModal({ showModal, setShowModal, id, setItems, name }) {
  const RenderClick = (event) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: "RENDERING" } : item
      )
    );
    setShowModal(false);
    toast.info("Video now is on rendering status");

    renderVideo(id).then((response) => {
      if (response) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "RENDERING",
                  
                }
              : item
          )
        );
      } else {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, status: "FAILED" } : item
          )
        );
      }
    });
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            id="renderModal"
            tabindex="-1"
            aria-hidden="true"
            class=" overflow-y-auto overflow-x-hidden fixed h-screen my-auto  flex items-center z-50 justify-center w-full md:inset-0 ackdrop-filter backdrop-blur-md  max-h-full"
          >
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
              <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <CloseModalButton setShowModal={setShowModal} />

                <GiProcessor className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
                <p class="mb-4 text-gray-500 dark:text-gray-300">
                  Are you sure you want to render this video : {name}?
                </p>
                <div class="flex justify-center items-center space-x-4">
                  <button
                    type="button"
                    class="py-2 px-3 text-sm font-medium text-red-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={(e) => setShowModal(false)}
                  >
                    No, cancel
                  </button>
                  <button
                    type="submit"
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={(e) => RenderClick()}
                  >
                    Yes, I'm sure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
