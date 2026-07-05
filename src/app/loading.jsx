export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Outer glowing ring - Changed from Purple to Yellow */}
        <div className="absolute inset-0 rounded-full border-y-2 border-white/50 animate-[spin_2s_linear_infinite] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
        
        {/* Inner orange ring - Kept Orange for contrast */}
        <div className="absolute inset-3 rounded-full border-x-2 border-white/50 animate-[spin_1.5s_linear_infinite_reverse] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
        
        {/* Center glowing core - Changed from Purple to Yellow-400 with Yellow Shadow */}
        <div className="h-4 w-4 rounded-full bg-gray-400 animate-pulse shadow-[0_0_15px_#eab308]"></div>
        
        {/* Ambient background glow - Changed from Purple to Orange/Amber glow */}
        <div className="absolute h-12 w-12 rounded-full bg-white/20 blur-xl"></div>
      </div>
    </div>
  );
}