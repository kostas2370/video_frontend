import React from "react";
import { toast } from "react-toastify";
import { renderVideo } from "../../api/apiService";
import { GiProcessor } from "react-icons/gi";

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
      if(response){
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, status: response.result.status, output: response.result.output }
            : item
        )
        
      );
      toast.success("Video now is completed");

    }else{
        setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === id
                ? { ...item, status: "FAILED"}
                : item
            )
            
          );
    }}

);
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
                <button
                  type="button"
                  class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={(e) => setShowModal(false)}
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>

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
