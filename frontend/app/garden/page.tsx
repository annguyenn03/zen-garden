import Image from "next/image";

export default function GardenFinish() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* FLOATING FLOWERS: Positioned randomly to match MacBook-9.jpg */}
      <Image src="/flower_purple.svg" className="absolute top-10 left-10 animate-bounce" width={100} height={100} alt="" />
      <Image src="/flower_pink.svg" className="absolute bottom-20 left-[20%]" width={80} height={80} alt="" />
      <Image src="/flower_blue.svg" className="absolute top-[15%] right-[10%]" width={120} height={120} alt="" />
      
      {/* MAIN TEXT */}
      <div className="text-center z-10">
        <h1 className="text-6xl font-black mb-4">your mind garden...</h1>
        <p className="text-2xl font-bold opacity-80">
          healthy habits help your garden grow 🌸 🌿 🍂
        </p>
      </div>

      {/* GRASS SVG: Anchored to the very bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <Image src="/grass_border.svg" width={1400} height={200} className="w-full object-cover" alt="" />
      </div>
    </div>
  );
}