import Image from "next/image";

export default function GardenFinish() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Purple flowers */}
      <Image src="/flower_purple.svg" className="absolute top-10 left-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} width={150} height={150} alt="" />
      <Image src="/flower_purple.svg" className="absolute top-[40%] left-[5%] animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} width={140} height={140} alt="" />
      <Image src="/flower_purple.svg" className="absolute bottom-[25%] right-[8%] animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.2s' }} width={160} height={160} alt="" />
      
      {/* Blue flowers */}
      <Image src="/flower_blue.svg" className="absolute top-[15%] right-[10%] animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.3s' }} width={180} height={180} alt="" />
      <Image src="/flower_blue.svg" className="absolute bottom-[30%] left-[50%] animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '2.4s' }} width={170} height={170} alt="" />
      
      {/* Pink flowers */}
      <Image src="/flower_pink.svg" className="absolute top-[25%] left-[45%] animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2.1s' }} width={160} height={160} alt="" />
      <Image src="/flower_pink.svg" className="absolute bottom-[20%] left-[15%] animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2.6s' }} width={150} height={150} alt="" />
      
      {/* MAIN TEXT */}
      <div className="text-center z-10">
        <h1 className="text-6xl font-black mb-4">this is your mind garden.</h1>
        <p className="text-2xl font-bold opacity-80">
          healthy habits help your garden grow 🌸 🌿 🍂
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <Image src="/grass_border.svg" width={1400} height={120} className="w-full h-auto max-h-[200px] object-contain" alt="" />
      </div>
    </div>
  );
}