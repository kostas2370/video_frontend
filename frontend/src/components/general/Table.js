import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaRegEye, FaPencilAlt, FaYoutube } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { DeleteModal} from "./DeleteModal";
import { deleteVideo } from "../../api/apiService";
const TABLE_HEAD = ["Video Title", "Status", "Video Type", "Actions"];


export function DefaultTable({ data, setVideos }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [id, setId] = useState("");


  return (<>

    {showDeleteModal ? (
        <>

          <DeleteModal
            showModal={showDeleteModal}
            setShowModal = {setShowDeleteModal}
            id = {id}
            setItems={setVideos}
            deleteFunction = {deleteVideo}
            name = "video"
          />
        </>
      ) : (
        <>
        
        
        </>
      )}


      
    <Card className="h-full w-full overflow-y-scroll no-scrollbar">
      <table className="w-full h-full min-w-max table-auto text-left scroll-smooth min-h-max">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ title, status, video_type, output, id }, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const isCompleted = status === "COMPLETED";
            const youtubeIconColor = isCompleted
              ? "text-red-500 hover:text-red-300"
              : "text-gray-400 ";
            const pencilIcon =
              status === "READY" || isCompleted
                ? "text-orange-500 text-orange-300"
                : "text-gray-400 disabled";

            return (
              <tr key={title}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center font-bold"
                  >
                    {title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {status}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    {video_type}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium text-center"
                  >
                    <div className="grid grid-cols-4">
                      <FaRegEye className="w-5 h-5 text-blue-500 hover:text-blue-300" />
                      <FaPencilAlt className={`w-5 h-5 ${pencilIcon}`} />
                      <FaYoutube
                        onClick={(event) => {
                          window.open(output, "_blank");
                        }}
                        className={`w-5 h-5 ${youtubeIconColor}`}
                      />
                      <RiDeleteBin6Fill
                        className="w-5 h-5 text-red-500 hover:text-red-300 text-center"
                        onClick={(event) => {
                         setShowDeleteModal(true)
                         setId(id)
                        }}
                      />
                    </div>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card></>
  );
}