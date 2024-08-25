import React, { useState, useEffect } from "react";
import {
  getIntro,
  getOutro,
  getAvatars,
  updateVideo,
} from "../api/apiService";
import { AssetDropBox } from "./ui/assetDropBox";
import { toast } from "react-toastify";
import { CloseModalButton } from "./ui/CloseModalButton";

export const VideoConfigModal = ({ showModal, setShowModal, info }) => {
  const [avatars, setAvatars] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [intros, setIntros] = useState([]);
  const [outros, setOutros] = useState([]);
  const [title, setTitle] = useState(null);
  const [intro, setIntro] = useState(null);
  const [outro, setOutro] = useState(null);

  const [selectedIntroFile, setSelectedIntroFile] = useState(null);
  const [selectedOutroFile, setSelectedOutroFile] = useState(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [avatarData, introData, outroData] = await Promise.all([
          getAvatars(),
          getIntro(),
          getOutro(),
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
    setTitle(info.title);
  }, [info.title]);

  useEffect(() => {
    setIntro(info.intro);
    intros.map((item) => {
      if (info.intro === item.id) {
        setSelectedIntroFile(item?.file);
      }
    });
  }, [info.intro]);

  useEffect(() => {
    setOutro(info.outro);
    outros.map((item) => {
      if (info.outro === item.id) {
        setSelectedOutroFile(item?.file);
      }
    });
  }, [info.outro]);

  useEffect(() => {
    setAvatar(info.avatar);
    avatars.map((item) => {
      if (info.avatar === item.id) {
        setSelectedAvatarFile(item?.file);
      }
    });
  }, [info.avatar]);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("intro", intro);
    formData.append("outro", outro);
    formData.append("title", title);
    formData.append("avatar", avatar);

    updateVideo(info.id, formData).then((response) => {
      if (response) {
        toast.success("video got update sucessfully !");
        setShowModal(false);
      }
    });
  };

  return (
    <>
      {showModal && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="false"
          className="overflow-y-auto overflow-x-hidden fixed h-screen flex items-center z-50 justify-center w-full md:inset-0 backdrop-filter backdrop-blur-md bg-blue-gray-200 max-h-full"
        >
          <div className="relative p-6 w-full  max-w-3xl max-h-full ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center w-full">
                  Configure Video
                </h3>
                <CloseModalButton setShowModal={setShowModal}/>

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
                    setValue={setIntro}
                    setSelectedFile={setSelectedIntroFile}
                    type="intro"
                    items={intros}
                    selectedFile={selectedIntroFile}
                    className="col-span-2 sm:col-span-1"
                  />
                  <AssetDropBox
                    value={outro}
                    setValue={setOutro}
                    setSelectedFile={setSelectedOutroFile}
                    type="outro"
                    items={outros}
                    selectedFile={selectedOutroFile}
                    className="col-span-2 sm:col-span-1"
                  />
                  {info.video_type !== "TWITCH" ? (
                    <AssetDropBox
                      value={avatar}
                      setValue={setAvatar}
                      setSelectedFile={setSelectedAvatarFile}
                      type="avatar"
                      items={avatars}
                      selectedFile={selectedAvatarFile}
                      className="col-span-2 sm:col-span-1"
                    />
                  ) : null}
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
