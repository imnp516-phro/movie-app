import MovieList from "./components/MovieList";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-10">
      {/* Header đơn giản */}
      <header className="py-6 px-8 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-950/90 z-50 backdrop-blur">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-tighter">
          MOVIEMASTER
        </h1>
        <div className="text-sm text-gray-400">
          Dự án Next.js CRUD
        </div>
      </header>

      {/* Nội dung chính */}
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Phim Đang Thịnh Hành
        </h2>
        {/* Gọi component MovieList để hiển thị danh sách phim */}
        <MovieList />
      </div>
    </main>
  );
}