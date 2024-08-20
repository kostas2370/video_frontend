import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getVideo } from "../api/apiService";
import { FaPencilAlt } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
import { deleteImageScene } from "../api/apiService";
import { DeleteModal } from "./general/DeleteModal";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { VideoConfigModal } from "./general/VideoConfigModal";
export const Video = () => {
  const MEDIA_URL = "http://localhost:8000";

  const { videoId } = useParams();
  const [videoInfo, setVideoInfo] = useState({ title: "re", scenes: [] });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sceneImageId, setSceneImageId] = useState("");
  const [updated, setUpdated] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  useEffect(() => {
    if (!updated) {
      getVideo(videoId).then((response) => {
        setVideoInfo(response);
      });
    }
  }, []);

  useEffect(() => {
    if (updated) {
      getVideo(videoId).then((response) => {
        setVideoInfo(response);
        setUpdated(false);
      });
    }
  }, [updated]);

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        id={sceneImageId}
        setItems={setUpdated}
        deleteFunction={deleteImageScene}
        name="image"
        mode="image"
      />

      <VideoConfigModal
        showModal={showConfigModal}
        setShowModal={setShowConfigModal}
        info_title={videoInfo.title}
        info_intro={videoInfo.intro}
        info_outro={videoInfo.outro}
      />
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-4">
          <h1 className="pt-4 pb-4 font-bold">{videoInfo?.title}</h1>
          <IoIosSettings
            onClick={(e) => {
              setShowConfigModal(true);
            }}
            className="font-black ml-auto w-6 h-6 text-black  hover:text-gray-400"
          />
        </div>

        {videoInfo?.scenes.map((scene) => (
          <>
            <div className="grid grid-cols-2 pt-4 border pl-4 ">
              <div className="relative">
                <button className="absolute top-2 right-4  p-2 pr-4 rounded-full bg-white hover:bg-gray-200">
                  <FaPencilAlt className="text-blue-500" />
                </button>
                <audio controls>
                  <source src={MEDIA_URL + scene.file ?? ""} />
                </audio>
                <div className="relative w-9/12 h-5/6">
                  <textarea
                    className="object-cover h-40 w-80 resize-none "
                    value={scene.text}
                    required=""
                    disabled
                  />
                </div>
              </div>
              <div className="relative inline-block">
                {scene.scene_image &&
                scene.scene_image.file &&
                scene.scene_image.file.includes("mp4") ? (
                  <>
                    <video
                      controls
                      src={MEDIA_URL + scene.scene_image.file}
                      className="object-cover h-48 w-96 "
                    ></video>
                  </>
                ) : (
                  <>
                    {scene.scene_image && scene.scene_image.file ? (
                      <>
                        {" "}
                        <img
                          src={MEDIA_URL + scene.scene_image.file}
                          alt="Image Missing"
                          className="object-cover h-48 w-96"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src="https://www.shutterstock.com/image-photo/white-cement-concrete-wall-texture-600nw-1891225786.jpg"
                          alt="Image Missing"
                          className="object-cover h-48 w-96"
                        />
                      </>
                    )}
                  </>
                )}

                <div className="absolute top-2 right-2 flex space-x-2 ">
                  <button className="bg-white p-2 pr-4 rounded-full shadow-lg hover:bg-gray-200">
                    {scene.scene_image.file ? (
                      <>
                        <HiOutlinePencilSquare className="text-green-500 w-5 h-5" />
                      </>
                    ) : (
                      <>
                        <FaPlus className="text-orange-500" />
                      </>
                    )}
                  </button>

                  {scene.scene_image.file ? (
                    <>
                      <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200">
                        <IoTrashBinSharp
                          className="text-red-500"
                          onClick={(e) => {
                            setSceneImageId(scene.scene_image.id);
                            setShowDeleteModal(true);
                          }}
                        />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </>
        ))}
        <button className="bg-white p-2 pr-4 rounded-full shadow-lg hover:bg-gray-200">
          {videoInfo?.video_type === "TWITCH" ? (
            <>
              <FaPlus className="text-orange-500 w-5 h-5" />
            </>
          ) : (
            <></>
          )}
        </button>
      </div>
    </>
  );
};
