import React, { useState, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DeleteModal } from "./DeleteModal";
import { deleteAvatar } from "../../api/apiService";

export const Card = ({ imageSrc, title, audioSrc, id , avatars, setAvatars }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {showDeleteModal ? (
        <>
          <DeleteModal
            showModal={showDeleteModal}
            setShowModal = {setShowDeleteModal}
            id = {id}
            setItems={setAvatars}
            deleteFunction={deleteAvatar}
            name = "avatar"
          />
        </>
      ) : (
        <>
        
        
        </>
      )}
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-64 h-84 mb-5">
        <img src={imageSrc} alt={title} className=" object-none p-2" />
        <div className="p-3  flex flex-col justify-between">
          <h2 className="text-lg font-semibold ">{title}</h2>
          <audio controls className="w-full">
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="flex justify-center mt-1 mb-2">
          <RiDeleteBin6Fill
            className="w-6 h-6 text-red-500 hover:text-red-300"
            onClick={(e) => setShowDeleteModal(true)}
          />
        </div>
      </div>
    </>
  );
};
