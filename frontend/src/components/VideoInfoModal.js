import { CloseModalButton } from "./ui/CloseModalButton";
export const VideoInfoModal = ({
  showModal,
  setShowModal,
  title,
  videoInfo,
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div
            id="crud-modal"
            tabindex="-1"
            aria-hidden="false"
            class=" overflow-y-auto overflow-x-hidden fixed h-screen  flex items-center z-50 justify-center  md:inset-0 ackdrop-filter backdrop-blur-md  max-h-full"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[600px]">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white text-center">
                    {videoInfo.title}
                  </h3>
                  <CloseModalButton setShowModal={setShowModal}/>

                </div>
                <form class="p-4 md:p-5">
                  <div class="grid gap-4 mb-4 grid-cols-2">
                    {videoInfo.output ? (
                      <>
                        <div class="col-span-2">
                          <label
                            for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Output :
                          </label>
                          <video
                            type="text"
                            name="name"
                            id="name"
                            required=""
                            key={videoInfo.title}
                            controls
                          >
                            <source src={videoInfo.output} />
                          </video>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div class="col-span-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        User Prompt :
                      </label>
                      <textarea
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 h-52 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        disabled
                        required=""
                      >
                        {videoInfo.prompt.prompt}
                      </textarea>
                    </div>
                    <div class="col-span-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Gpt answer :
                      </label>
                      <textarea
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 h-52 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        disabled
                        required=""
                      >
                        {videoInfo.gpt_answer}
                      </textarea>
                    </div>
                    <div class="col-span-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Music :
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        disabled
                        required=""
                        value={videoInfo.music}
                      ></input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
