import { User } from "lucide-react";
import Image from "next/image";

type ProfileImageProps = {
  imageUrl: string;
};

export function ProfileImage({ imageUrl }: ProfileImageProps) {
  return (
    <div className="flex justify-center">
      <div className="relative w-48 h-48 rounded-full bg-gray-300 inset-0 border border-background shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
        {!imageUrl ? (
          <div className="w-full h-full flex items-center justify-center animate-pulse bg-gray-200">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        ) : (
          <Image
            src={imageUrl}
            alt="Foto de perfil"
            fill
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
