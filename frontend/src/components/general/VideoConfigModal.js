import React, { useState, useEffect, Fragment } from "react";
import { getIntro, getOutro, getAvatars } from "../../api/apiService";
import { AssetDropBox } from "./assetDropBox";
export const VideoConfigModal = ({
  showModal,
  setShowModal,
  info_title,
  info_intro,
  info_outro,
}) => {
  const [avatars, setAvatars] = useState([]);
  const [intros, setIntros] = useState([]);
  const [outros, setOutros] = useState([]);
  const [title, setTitle] = useState(null);
  const [intro, setIntro] = useState(null);
  const [outro, setOutro] = useState(null);

  const [selectedIntroFile, setSelectedIntroFile] = useState(null);
  const [selectedOutroFile, setSelectedOutroFile] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [avatarData, introData, outroData] = await Promise.all([
          getAvatars(),
          getIntro(),
          getOutro()
        ]);
        setAvatars(avatarData);
        setIntros(introData);
        setOutros(outroData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchOptions();
  }, []);

  useEffect(() => {
    setTitle(info_title);
  }, [info_title]);

  useEffect(() => {
    setIntro(info_intro);
    intros.map((item) => {
      if (info_intro === item.id) {
        setSelectedIntroFile(item?.file);
      }
    });
  }, [info_intro]);

  useEffect(() => {
    setOutro(info_outro);
    outros.map((item) => {
      if (info_outro === item.id) {
        setSelectedOutroFile(item?.file);
      }
    });
  }, [info_outro]);

  const handleIntroChange = (event) => {
    const selectedIntro = event.target.value;
    setIntro(selectedIntro);
    if (selectedIntro) {
      intros.map((item) => {
        if (selectedIntro === item.id.toString()) {
          setSelectedIntroFile(item?.file);
        }
      });
    } else {
      setSelectedIntroFile("");
    }
  };

  const handleOutroChange = (event) => {
    const selectedOutro = event.target.value;
    setOutro(selectedOutro);
    if (selectedOutro) {
      outros.map((item) => {
        if (selectedOutro === item.id.toString()) {
          setSelectedOutroFile(item?.file);
        }
      });
    } else {
      setSelectedOutroFile("");
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    alert(`Selected Intro ID: ${intro}`);
  };

  return (
    <>
      {showModal && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="false"
          className="overflow-y-auto overflow-x-hidden fixed h-screen flex items-center z-50 justify-center w-full md:inset-0 backdrop-filter backdrop-blur-md max-h-full"
        >
          <div className="relative p-6 w-full  max-w-3xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center w-full">
                  Configure Video
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={onSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Video Title
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type video title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <AssetDropBox
                    value={intro}
                    handleChange={handleIntroChange}
                    type="intro"
                    items={intros}
                    selectedFile={selectedIntroFile}
                    className="col-span-2 sm:col-span-1"
                  />
                  <AssetDropBox
                    value={outro}
                    handleChange={handleOutroChange}
                    type="outro"
                    items={outros}
                    selectedFile={selectedOutroFile}
                    className="col-span-2 sm:col-span-1"
                  />

                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
