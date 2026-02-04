"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MovieType } from "../../../types/movie";

export default function Movie({data}:{data: MovieType}){
    const [isSaved, setIsSaved] = useState(false);
    // 1. Read from LocalStorage 
    useEffect(() => {
        const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
        const exists = watchlist.find((item: MovieType) => item.id === data.id )
        if(exists){
            setIsSaved(true);
        }
    }, [data.id]) // chỉ chạy lại useEffect khi id của phim thay đổi

    //2.CREATE / DELETE
    const toggleWatchList = () => {
        const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
        if(isSaved){
            //DELETE 
            const newList = watchlist.filter((item: MovieType) =>  item.id !== data.id)
            localStorage.setItem("watchlist", JSON.stringify(newList));
            setIsSaved(false);
            alert("deleted movie from library!")
        }
        else {
            //CREATE
            watchlist.push(data)
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
            setIsSaved(true);
            alert("sucessfully saved movie!")
        }
    }
    



    return(
        <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg border border-zinc-800 flex flex-col h-full">
     {/* Phần ảnh Poster */}
     <Link href={`/movie/${data.id}`}>
        <div className="relative h-80 w-full overflow-hidden">
        {data.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-800 text-gray-500">
            No Image
          </div>
        )}
      </div>
     </Link>
   
      {/* Phần thông tin & Nút bấm */}
      <div className="p-4 flex flex-col grow">
        <h3 className="text-white font-bold text-lg truncate mb-1" title={data.title}>
          {data.title}
        </h3>
        <p className="text-yellow-500 text-sm mb-4">
          ★ {data.vote_average ? data.vote_average.toFixed(1) : "N/A"}
        </p>

        {/* Nút bấm đổi màu dựa theo trạng thái isSaved */}
        <button
          onClick={toggleWatchList}
          className={`mt-auto w-full py-2 rounded font-bold text-sm transition-colors ${
            isSaved
              ? "bg-red-600 hover:bg-red-700 text-white" // Đã lưu -> Hiện nút Đỏ (Xóa)
              : "bg-green-600 hover:bg-green-700 text-white" // Chưa lưu -> Hiện nút Xanh (Lưu)
          }`}
        >
          {isSaved ? "Xóa khỏi tủ (Delete)" : "Lưu phim (Create)"}
        </button>
      </div>
        </div>
    )
}