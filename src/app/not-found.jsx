import Link from 'next/link';

export default function NotFound() {
  return (
    // Fixed: w-screen, h-screen (or min-h-screen) used to cover full view. Removed 'my-18' to prevent scroll overflows.
    <div className="flex w-screen min-h-screen flex-col items-center justify-center bg-black px-4 text-center select-none overflow-hidden">
      <div className="relative">
        {/* 404 Text with Yellow to Orange Gradient & Orange Glow */}
        <h1 className="text-9xl sm:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] tracking-tighter">
          404
        </h1>
        {/* Decorative background glow shifted to Orange/Yellow */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/20 blur-[80px]"></div>
      </div>
      
      <h2 className="mt-6 text-2xl sm:text-3xl font-bold tracking-wide text-white">
        Lost in the React Universe
      </h2>
      
      <p className="mt-4 max-w-md text-sm sm:text-base text-gray-400 px-2">
        The component or route you are looking for doesn't exist in this lab environment. Let's get you back on track.
      </p>
      
      {/* Button updated to Yellow/Orange gradient and glow */}
      <Link 
        href="/" 
        className="mt-8 rounded-lg bg-white text-black px-8 py-3 text-bold transition-all duration-300 hover:from-yellow-400 hover:to-orange-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] shadow-[0_0_15px_rgba(249,115,22,0.3)] transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Return to Base
      </Link>
    </div>
  );
}