import React, { useState, useEffect } from "react";
import { DefaultTable } from "./general/Table";
import useAuth from "../useAuth";
import { getVideos } from "../api/apiService";
import { Search } from "@rsuite/icons";
import { useSearchParams } from "react-router-dom";

export const Videos = () => {
  useAuth();

  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);


  const [nextPage, setNextPage] = useState(null);

  const setter = (page, response)=> {
      setCurrentPage(page);
      setNextPage(response.next);
      setPreviousPage(response.previous);
      setVideos(response.results);

  }

  const NextClick = async () => {
    setVideos([]);
    getVideos(search, nextPage).then((response) => {
      setter(nextPage,response)
    });
  };

  const PreviousClick = async () => {
    setVideos([]);

    getVideos(search, previousPage).then((response) => {
      setter(previousPage,response)
;
    });
  };

  const SearchClick = async () => {
    setVideos([]);
    getVideos(search).then((response) => {
      setCurrentPage(1);
      setNextPage(response.next);
      setPreviousPage(null);
      setVideos(response.results);
    });
  };

  useEffect(() => {
    const fetchVideos = async () => {
   
      getVideos(search, currentPage).then((response) => {
        setVideos(response.results);
        setNextPage(response.next)
        setPreviousPage(response.previous)

      });
    };

    fetchVideos();
  }, []);

  return (
    <>
      <div className="flex justify-end items-center mt-4 gap-4  mr-64  ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Videos"
            className="pl-12 w-64 px-9 py-2  border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute inset-y-2 left-2 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-500" />
          </div>
        </div>
        <button
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 rounded-lg focus:ring-blue-600"
          onClick={(e) => {
            SearchClick();
          }}
        >
          Search
        </button>
      </div>

      <div className="flex flex-col items-center  px-6 py-8 mx-auto md:h-3/5 lg:py-0 w-3/4  mt-4">
        <DefaultTable data={videos} setVideos={setVideos} />
        <div className="flex flex-col-2 gap-8 mt-4 ">
          {previousPage ? (
            <>
              <button
                className="bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 rounded-lg focus:ring-blue-600 h-12 w-22"
                onClick={(e) => {
                  PreviousClick();
                }}
              >
                Previous
              </button>
            </>
          ) : (
            <></>
          )}
          {nextPage ? (
            <>
              <button
                className="bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 rounded-lg focus:ring-blue-600 h-12 w-22"
                onClick={(e) => {
                  NextClick();
                }}
              >
                Next
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
