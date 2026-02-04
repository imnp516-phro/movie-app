// READ
"use client";

import Movie from "./Movie";
import { MovieType } from "../../../types/movie";
import { useState, useEffect } from "react";


export default function MovieList(){
    // 1. State lưu danh sách phim và Tab đang chọn
    const [movies, setMovies] = useState<MovieType[]>([])
    const [activeTab, setActiveTab] = useState("popular")
    // API key
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
    
    // --- 2. KHAI BÁO 3 HÀM FETCH RIÊNG BIỆT ---

    // popular

    const fetchPopular = async () => { 
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=vi-VN&page=1`)
        const data = await res.json();
        setMovies(data.results || []);
        setActiveTab("popular") // Đánh dấu đang ở tab này
    }

    // top rated

  const fetchTopRated = async () => {
  console.log("1. Đã bấm nút Top Rated!"); // <-- Kiểm tra xem nút có liệt không

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Lấy lại key
  console.log("2. Key đang dùng là:", apiKey); // <-- Kiểm tra xem có mất key không

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=vi-VN&page=1`);
    const data = await res.json();
    
    console.log("3. Dữ liệu TMDB trả về:", data); // <-- Kiểm tra xem có phim không

    setMovies(data.results || []);
    setActiveTab("top_rated");
  } catch (error) {
    console.log("LỖI RỒI:", error);
  }
};
    // upcoming

    const fetchUpcoming = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=vi-VN&page=1`)
        const data = await res.json();
        setMovies(data.results || [])
        setActiveTab("upcoming");
    }
    // --- 3. TỰ ĐỘNG CHẠY LẦN ĐẦU TIÊN ---
    useEffect(() => {
        fetchPopular(); // Mặc định vào trang là load phim Phổ biến ngay
    }, [])

    return(
        <div>
            {/* GIAO DIỆN CÁC TAB */}
            <div className="flex gap-6 border-b border-zinc-800 mb-8 justify-center md:justify-start">
                <button 
                    onClick={fetchPopular}
                    className={`pb-3 text-sm font-bold transition-all ${
                        activeTab === "popular" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500 hover:text-white"
                    }`}
                >
                    PHO BIEN 
                </button>

                <button 
                    onClick={fetchTopRated}
                    className={`pb-3 text-sm font-bold transition-all ${
                        activeTab === "top_rated" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500 hover:text-white"
                    }`}
                >
                    DANH GIA CAO 
                </button>

                <button 
                    onClick={fetchUpcoming}
                    className={`pb-3 text-sm font-bold transition-all ${
                        activeTab === "upcoming" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500 hover:text-white"
                    }`}
                >
                    SAP CHIEU
                </button>

            </div>


              <div className="grid grid-col-2 md:grid-cols-4 lg:grid-col-5 gap-6">

                {
                    movies.length > 0 ? (
                        movies.map((movie) => <Movie  key={movie.id} data={movie}/>)
                    ) : (
                        <p className="text-gray-500">Loading...</p>
                    )
                }
             </div>
        </div>
    )
}