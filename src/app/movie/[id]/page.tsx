import Image from "next/image";
import Link from "next/link";

// 1. Hàm lấy chi tiết 1 bộ phim theo ID
async function getMovieDetail(id: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=vi-VN`
  );

  if (!res.ok) throw new Error("Không tìm thấy phim");
  return res.json();
}

// 2. Component chính hiển thị trang chi tiết
// Lưu ý: Trong Next.js 15, params là một Promise nên phải dùng kiểu dữ liệu Promise
export default async function MovieDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await để lấy ID từ URL (Ví dụ: id = 550)
  const { id } = await params;
  
  // Gọi API lấy dữ liệu phim đó
  const movie = await getMovieDetail(id);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ẢNH NỀN (Backdrop) */}
      <div className="relative w-full h-[60vh]">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* THÔNG TIN CHI TIẾT */}
      <div className="container mx-auto px-4 -mt-32 relative z-10 flex flex-col md:flex-row gap-8">
        {/* Poster Phim */}
        <div className="shrink-0 mx-auto md:mx-0">
            <Image 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-lg shadow-2xl border-4 border-zinc-800"
            />
        </div>

        {/* Nội dung chữ */}
        <div className="flex-1 space-y-4 pt-10 md:pt-0">
            <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-2">
                {movie.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="bg-yellow-600 text-black px-2 py-1 rounded font-bold">
                    IMDb {movie.vote_average.toFixed(1)}
                </span>
                <span>{movie.release_date}</span>
                <span>{movie.runtime} phút</span>
            </div>

            <p className="text-xl italic text-gray-400">"{movie.tagline}"</p>

            <div className="bg-zinc-900/80 p-6 rounded-lg border border-zinc-800">
                <h3 className="text-xl font-bold mb-2 text-white">Nội dung phim</h3>
                <p className="leading-relaxed text-gray-300">
                    {movie.overview || "Đang cập nhật nội dung..."}
                </p>
            </div>

            {/* Nút quay về */}
            <Link 
                href="/" 
                className="inline-block mt-8 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition"
            >
                ← Quay lại trang chủ
            </Link>
        </div>
      </div>
    </div>
  );
}