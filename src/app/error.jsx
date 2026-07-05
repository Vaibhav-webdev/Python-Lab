'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-black px-4">
      {/* Container with White/Gray glow */}
      <div className="relative flex max-w-md flex-col items-center rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-8 text-center backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        
        {/* Warning Icon with White Glow */}
        <div className="absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#030303] shadow-[0_0_15px_rgba(255,255,255,0.15)]">
          <span className="text-xl font-bold text-white">!</span>
        </div>

        {/* Heading with White to Gray Gradient */}
        <h2 className="mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          Compilation Error
        </h2>
        
        <p className="mt-4 text-sm text-gray-400">
          Something went wrong while rendering this component. Our lab equipment needs a quick restart.
        </p>

        {/* Updated Button to Monochrome Theme */}
        <button
          onClick={() => reset()}
          className="flex justify-center items-center gap-2 mt-8 rounded-lg border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-white/50 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
        >
          <div><RefreshCw size={16}/></div>
          <div>Re-run Code</div>
        </button>
      </div>
    </div>
  );
}