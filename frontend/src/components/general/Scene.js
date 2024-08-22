import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import { DeleteModal } from "./DeleteModal";
import { FaPlus } from "react-icons/fa6";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { deleteImageScene } from "../../api/apiService";
import { EditSceneModal } from "./EditSceneModal";
export const Scene = ({ scene, setUpdated, video_type }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const MEDIA_URL = "http://localhost:8000";

  return (
    <>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        id={scene?.scene_image?.id}
        setItems={setUpdated}
        deleteFunction={deleteImageScene}
        name="image"
        mode="image"
      />
      <EditSceneModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        scene_info={{dialogue:scene.text, id:scene.id}}
        setUpdate={setUpdated}
      />
      <div className="grid grid-cols-2 pt-4 border pl-4 ">
        <div className="relative">
          {video_type !== "TWITCH" ? (
            <>
              <button
                className="absolute top-2 right-4  p-2 pr-4 rounded-full bg-white hover:bg-gray-200"
                onClick={(e) => {
                  setShowEditModal(true);
                }}
              >
                <FaPencilAlt className="text-blue-500" />
              </button>

              <audio controls key={scene.file}>
                <source src={MEDIA_URL + scene.file ?? ""} />
              </audio>
            </>
          ) : null}

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
          {scene.scene_image?.file &&
          scene.scene_image?.file.includes("mp4") ? (
            <>
              <video
                controls
                src={MEDIA_URL + scene.scene_image.file}
                className="object-cover h-48 w-96 "
              ></video>
            </>
          ) : (
            <>
              {scene.scene_image?.file ? (
                <>
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
            {scene.scene_image?.file ? (
              <>
                {video_type !== "TWITCH" ? (
                  <button className="bg-white p-2 pr-4 rounded-full shadow-lg hover:bg-gray-200">
                    <HiOutlinePencilSquare className="text-green-500 w-5 h-5" />
                  </button>
                ) : null}
                <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200">
                  <IoTrashBinSharp
                    className="text-red-500"
                    onClick={(e) => {
                      setShowDeleteModal(true);
                    }}
                  />
                </button>
              </>
            ) : (
              <FaPlus className="text-orange-500" />
            )}
          </div>
        </div>
      </div>
      ;
    </>
  );
};
