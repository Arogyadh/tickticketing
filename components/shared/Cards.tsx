import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface CardsProps {
  movie: string;
  src: string;
  released: string;
  imdbID: string;
}

const Cards = ({ movie, src, released, imdbID }: CardsProps) => {
  const router = useRouter();
  // on clicking card go to the dynamically generated url
  const handleImageClick = () => {
    console.log(imdbID);
    // Dynamically generate the URL based on the imdbID
    const dynamicURL = `/${imdbID}`;
    console.log(dynamicURL);
    // Navigate to the dynamically generated URL
    // For development
    router.push(dynamicURL);

    // For deployment
    // router.push(`${process.env.NEXT_PUBLIC_BASE_PATH}${dynamicURL}`);
  };

  return (
    <div onClick={handleImageClick}>
      <Image
        src={src}
        alt={movie}
        width={286}
        height={320}
        className=" rounded-[12px] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
      />
      <div className=" flex flex-col max-w-[286px] font-semibold text-white text-lg whitespace-normal py-3  cursor-pointer">
        {movie}
      </div>
      <div className="flex text-white text-xs  pb-[100px] space-x-4">
        <div className="flex flex-col justify-end text-center items-center">
          {released}
        </div>
        <svg
          className="flex mt-1 mx-1"
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" fill="#97ABC0" />
        </svg>
        <div className="flex">Kathmandu, Nepal</div>
      </div>
    </div>
  );
};

export default Cards;
