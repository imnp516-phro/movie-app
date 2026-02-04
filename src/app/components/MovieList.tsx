// READ
"use client";

import Movie from "./Movie";
import { MovieType } from "../../../types/movie";
import { useState, useEffect } from "react";


export default async function MovieList(){
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
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=vi-VN&page=1`)
        const data = await res.json();
        setMovies(data.results || [])
        setActiveTab("top_rated")
    }

    // upcoming

    const fetchUpcoming = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=vi-VN&page=1`)
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

            <div>
                
            </div>

        </div>
    )
}