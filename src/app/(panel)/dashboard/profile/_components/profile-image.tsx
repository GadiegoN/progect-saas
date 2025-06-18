"use client";
import { updateImage } from "@/app/(panel)/dashboard/profile/_actions/update-image";
import { Loader, Upload, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

type ProfileImageProps = {
  imageUrl: string | null;
  userId: string;
};

export function ProfileImage({ imageUrl, userId }: ProfileImageProps) {
  const [previewImage, setPreviewImage] = useState(imageUrl);
  const [loading, setLoading] = useState(false);

  const { update } = useSession();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.error("Formato de imagem invalido.");
        setLoading(false);
        return;
      }

      const newFilename = `${userId}`;
      const newFile = new File([image], newFilename, { type: image.type });

      const urlImage = await uploadImage(newFile);

      if (!urlImage || urlImage === "") {
        toast.error("Falha ao alterar a imagem.");
        setLoading(false);
        return;
      }

      setPreviewImage(urlImage);

      await updateImage({ imageUrl: urlImage });
      await update({
        image: urlImage,
      });
      setLoading(false);
    }
  }

  async function uploadImage(image: File): Promise<string | null> {
    try {
      toast.info("Carregando imagem...");

      const formData = new FormData();

      formData.append("file", image);
      formData.append("userId", userId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return null;
      }

      toast.success("Imagem alterada com sucesso.");

      return data.secure_url as string;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  return (
    <div className="flex justify-center">
      <div className="relative w-48 h-48 rounded-full bg-gray-300 inset-0 border border-background shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
        <div className="relative flex items-center justify-center w-full h-full">
          <span className="absolute bottom-4 cursor-pointer bg-primary/60 z-10 p-2 rounded-full shadow-2xl">
            {loading ? (
              <Loader className="size-8 text-primary-foreground animate-spin" />
            ) : (
              <Upload className="size-8 text-primary-foreground" />
            )}
          </span>

          <input
            type="file"
            className="cursor-pointer relative z-50 size-48 opacity-0"
            onChange={handleChange}
          />
        </div>

        {!previewImage ? (
          <div className="w-full h-full flex items-center justify-center animate-pulse bg-gray-200">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        ) : (
          <Image
            src={previewImage}
            alt="Foto de perfil da cliníca"
            fill
            className="object-cover"
            quality={100}
            priority
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 75vw, 60vw"
          />
        )}
      </div>
    </div>
  );
}
