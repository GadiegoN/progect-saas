import Image from "next/image";
import imgProfile from "@/../public/doctor-hero.png";

export function ProfileImage() {
  return (
    <div className="flex justify-center">
      <div className="relative w-40 h-40 rounded-full bg-gray-300 border border-background shadow-2xl overflow-hidden">
        <Image
          src={imgProfile}
          alt="Foto de perfil"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
