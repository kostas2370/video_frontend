import React, { useState, useEffect } from "react";
import useAuth from "../useAuth";
import { getAvatars } from "../api/apiService";
import { toast } from "react-toastify";
import { generateVideo } from "../api/apiService";
import { LoadingButton } from "./general/LoadingButton";
import { ProceedModal } from "./general/ProceedModal";

const Home = () => {
  const isOpenFunction = (data) => {
    setOpen(data);
  };
  useAuth();
  const [avatars, setAvatars] = useState("");
  const [settings, setSettings] = useState(false);
  const [open, setOpen] = useState(false);
  const [video_id, setVideo_id] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    template_id: "",
    avatar_selection: "no_avatar",
    message: "",
    target_audience: "",
    images: "WEB",
    gpt_model: "gpt-4o",
    style: "natural",
    music: "",
    provider: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "images") {
      if (value === "AI") {
        formData.provider = "DALL-E";
      } else {
        formData.provider = "bing";
      }
    }

    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    const fetchOptions = async () => {
      getAvatars().then((response) => {
        setAvatars(response);
      });
    };

    fetchOptions();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (formData.message.trim() === "") {
      toast.error("You need to add a prompt !");
      return;
    }
    setIsLoading(true);

    generateVideo(formData).then((response) => {
      if (response) {
        setVideo_id(response.video.id);
        setOpen(true);

        toast.success("Video got generated successfully !");
      }
      setIsLoading(false);
    });
  };

  return (
    <div>

      <ProceedModal open={open} setOpen={isOpenFunction} video_id={video_id} />
      
      <br></br>

      <section class="bg-gray-50 dark:bg-gray-900 ">
        <div class="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-7 sm:p-9">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Generate Video :
              </h1>
              <br></br>
              <form class="space-y-4 md:space-y-3" onSubmit={handleGenerate}>
                <div>
                  <label
                    for="prompt"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your prompt
                  </label>

                  <textarea
                    type="textarea"
                    name="message"
                    id="message"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Make me a video about potatoes"
                    rows="6"
                    required=""
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <h1 class="text-center" onClick={() => setSettings(!settings)}>
                  More settings
                </h1>
                {settings ? (
                  <>
                    <div class="p-2 bg-white rounded shadow-md">
                      <div class="flex space-x-4">
                        <div class="flex flex-col  space-y-1 space-x-0">
                          <label
                            for="target_audience"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Target Audience
                          </label>
                          <input
                            name="target_audience"
                            type="text"
                            id="target_audience"
                            placeholder="Teens"
                            class="px-1 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-11/12"
                            onChange={handleInputChange}
                          ></input>
                        </div>
                        <div class="flex flex-col space-y-1 space-x-0">
                          <label
                            for="template_id"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Genre :
                          </label>
                          <input
                            name="template_id"
                            type="text"
                            id="template_id"
                            placeholder="Comedy"
                            class="px-1 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-11/12"
                            onChange={handleInputChange}
                          ></input>
                        </div>
                      </div>

                      <br></br>
                      <div class="flex space-x-4 gap-4">
                        <div class="space-y-1 ">
                          <label
                            for="avatar_selection"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Avatar
                          </label>
                          <select
                            name="avatar_selection"
                            id="avatar_selection"
                            placeholder="Comedy"
                            class="px-5 bg-gray-50  border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                            onChange={handleInputChange}
                          >
                            <option key="No avatar" value="no_avatar">
                              No Avatar
                            </option>
                            {avatars.map((avatar) => (
                              <option
                                key={avatar.name}
                                value={parseInt(avatar.id)}
                              >
                                {avatar.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div class="flex flex-col space-y-2">
                          <label
                            for="target_audience"
                            class="block text-sm font-medium text-gray-900 dark:text-white w-44"
                          >
                            AI model :
                          </label>
                          <select
                            name="gpt_model"
                            id="avatar_selection"
                            placeholder="Comedy"
                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                            onChange={handleInputChange}
                          >
                            <option key="gpt-4o" value="gpt-4o">
                              gpt-4o
                            </option>
                            <option key="gpt-3.5-turbo" value="gpt-3.5-turbo">
                              gpt-3.5-turbo
                            </option>
                            <option key="gpt-4" value="gpt-4">
                              gpt-4
                            </option>
                            <option
                              key="claude-3-5-sonnet-20240620"
                              value="claude-3-5-sonnet-20240620"
                            >
                              claude 3-5
                            </option>
                            <option key="gemini-1.5-pro" value="gemini-1.5-pro">
                              gemini-1.5-pro
                            </option>
                            <option
                              key="gemini-1.5-flash"
                              value="gemini-1.5-flash"
                            >
                              gemini-1.5-flash
                            </option>
                            <option key="gemini-1.0-pro" value="gemini-1.0-pro">
                              gemini-1.0-pro
                            </option>
                          </select>
                        </div>
                      </div>
                      <br></br>
                      <div class="flex space-x-4">
                        <div class="space-y-1">
                          <label
                            for="images"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Image Mode :
                          </label>

                          <select
                            name="images"
                            id="image"
                            class="px-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                            onChange={handleInputChange}
                          >
                            <option value="WEB">WEB &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; </option>
                            <option value= "AI">AI  &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;</option>
                          </select>
                        </div>
                        <div class="space-y-2">
                          <label
                            for="images"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Provider :
                          </label>
                          <select
                            name="provider"
                            id="provider"
                            class="px-5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            required=""
                            onChange={handleInputChange}
                          >
                            {formData.images === "AI" ? (
                              <>
                                <option>DALL-E</option>
                                <option>midjourney</option>
                                <option>stable-diffusion</option>
                              </>
                            ) : (
                              <>
                                <option>bing  &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;</option>
                                <option>google</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                   
                    <br></br>
                    <div>
                      <label
                        for="Audience"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Music
                      </label>
                      <input
                        type="url"
                        name="music"
                        id="music"
                        placeholder="https://www.youtube.com/watch?v=JaZgHHDS5x0&list=RDJaZgHHDS5x0"
                        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={handleInputChange}
                      ></input>
                      
                    </div>

                              

                    </div>
                  </>
                ) : (
                  <>
                  </>
                )}
                <LoadingButton isLoading={isLoading} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
