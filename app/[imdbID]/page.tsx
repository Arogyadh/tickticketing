"use client";
import Cards from "@/components/shared/Cards";
import { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    imdbID: string;
  };
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const MoviePage: FC<PageProps> = ({ params }) => {
  const router = useRouter();

  const [ticketCount, setTicketCount] = useState<number>(1);
  const ticketPrice = 500;
  const [totalPrice, setTotalPrice] = useState<number>(ticketPrice);
  const handleDecrease = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
      setTotalPrice(totalPrice - 500);
    }
  };

  const handleIncrease = () => {
    setTicketCount(ticketCount + 1);
    setTotalPrice((ticketCount + 1) * ticketPrice);
  };

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=bd6e4ec1&i=${params.imdbID}`
        );
        const data = await response.json();
        setMovie(data || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.imdbID]);
  if (!movie) {
    return <div>No movies found</div>;
  }

  const handleButtonClick = () => {
    // Dynamically generate the URL based on the imdbID
    const dynamicURL = `/${params.imdbID}/${ticketCount}`;
    console.log(dynamicURL);
    // Navigate to the dynamically generated URL
    // For development
    router.push(dynamicURL);

    // For deployment
    // router.push(`${process.env.NEXT_PUBLIC_BASE_PATH}${dynamicURL}`);
  };
  return (
    <div className="flex pl-[115px] pt-[209px] h-full w-full bg-[#13131A]">
      {movie && (
        <Cards
          imdbID={movie.imdbID}
          key={movie.imdbID}
          movie={movie.Title}
          src={movie.Poster}
          released={movie.Year}
        />
      )}
      <div className="flex flex-col ml-auto justify-start  mr-[74px] items-center text-white ">
        <Card className="bg-[#1C1C24]  border-[#1c1c24]">
          <CardHeader>
            <CardTitle className="font-semibold mr-[289px] text-xl pb-5">
              Event Details
            </CardTitle>
            <div className="border border-[#252D3C] h-[1px] " />
            <CardDescription className="pt-5 flex items-center">
              <div
                className="flex items-center justify-center"
                style={{
                  width: "48px",
                  height: "48px",
                  left: "0px",
                  top: "4px",
                  background: "#292932",
                  borderRadius: "60px",
                }}
              >
                <svg
                  className="flex items-center justify-center"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.75 12.75C12.75 12.9489 12.671 13.1397 12.5303 13.2803C12.3897 13.421 12.1989 13.5 12 13.5C11.8011 13.5 11.6103 13.421 11.4697 13.2803C11.329 13.1397 11.25 12.9489 11.25 12.75C11.25 12.5511 11.329 12.3603 11.4697 12.2197C11.6103 12.079 11.8011 12 12 12C12.1989 12 12.3897 12.079 12.5303 12.2197C12.671 12.3603 12.75 12.5511 12.75 12.75ZM7.5 15.75C7.69891 15.75 7.88968 15.671 8.03033 15.5303C8.17098 15.3897 8.25 15.1989 8.25 15C8.25 14.8011 8.17098 14.6103 8.03033 14.4697C7.88968 14.329 7.69891 14.25 7.5 14.25C7.30109 14.25 7.11032 14.329 6.96967 14.4697C6.82902 14.6103 6.75 14.8011 6.75 15C6.75 15.1989 6.82902 15.3897 6.96967 15.5303C7.11032 15.671 7.30109 15.75 7.5 15.75ZM8.25 17.25C8.25 17.4489 8.17098 17.6397 8.03033 17.7803C7.88968 17.921 7.69891 18 7.5 18C7.30109 18 7.11032 17.921 6.96967 17.7803C6.82902 17.6397 6.75 17.4489 6.75 17.25C6.75 17.0511 6.82902 16.8603 6.96967 16.7197C7.11032 16.579 7.30109 16.5 7.5 16.5C7.69891 16.5 7.88968 16.579 8.03033 16.7197C8.17098 16.8603 8.25 17.0511 8.25 17.25ZM9.75 15.75C9.94891 15.75 10.1397 15.671 10.2803 15.5303C10.421 15.3897 10.5 15.1989 10.5 15C10.5 14.8011 10.421 14.6103 10.2803 14.4697C10.1397 14.329 9.94891 14.25 9.75 14.25C9.55109 14.25 9.36032 14.329 9.21967 14.4697C9.07902 14.6103 9 14.8011 9 15C9 15.1989 9.07902 15.3897 9.21967 15.5303C9.36032 15.671 9.55109 15.75 9.75 15.75ZM10.5 17.25C10.5 17.4489 10.421 17.6397 10.2803 17.7803C10.1397 17.921 9.94891 18 9.75 18C9.55109 18 9.36032 17.921 9.21967 17.7803C9.07902 17.6397 9 17.4489 9 17.25C9 17.0511 9.07902 16.8603 9.21967 16.7197C9.36032 16.579 9.55109 16.5 9.75 16.5C9.94891 16.5 10.1397 16.579 10.2803 16.7197C10.421 16.8603 10.5 17.0511 10.5 17.25ZM12 15.75C12.1989 15.75 12.3897 15.671 12.5303 15.5303C12.671 15.3897 12.75 15.1989 12.75 15C12.75 14.8011 12.671 14.6103 12.5303 14.4697C12.3897 14.329 12.1989 14.25 12 14.25C11.8011 14.25 11.6103 14.329 11.4697 14.4697C11.329 14.6103 11.25 14.8011 11.25 15C11.25 15.1989 11.329 15.3897 11.4697 15.5303C11.6103 15.671 11.8011 15.75 12 15.75ZM12.75 17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25C11.25 17.0511 11.329 16.8603 11.4697 16.7197C11.6103 16.579 11.8011 16.5 12 16.5C12.1989 16.5 12.3897 16.579 12.5303 16.7197C12.671 16.8603 12.75 17.0511 12.75 17.25ZM14.25 15.75C14.4489 15.75 14.6397 15.671 14.7803 15.5303C14.921 15.3897 15 15.1989 15 15C15 14.8011 14.921 14.6103 14.7803 14.4697C14.6397 14.329 14.4489 14.25 14.25 14.25C14.0511 14.25 13.8603 14.329 13.7197 14.4697C13.579 14.6103 13.5 14.8011 13.5 15C13.5 15.1989 13.579 15.3897 13.7197 15.5303C13.8603 15.671 14.0511 15.75 14.25 15.75ZM15 17.25C15 17.4489 14.921 17.6397 14.7803 17.7803C14.6397 17.921 14.4489 18 14.25 18C14.0511 18 13.8603 17.921 13.7197 17.7803C13.579 17.6397 13.5 17.4489 13.5 17.25C13.5 17.0511 13.579 16.8603 13.7197 16.7197C13.8603 16.579 14.0511 16.5 14.25 16.5C14.4489 16.5 14.6397 16.579 14.7803 16.7197C14.921 16.8603 15 17.0511 15 17.25ZM16.5 15.75C16.6989 15.75 16.8897 15.671 17.0303 15.5303C17.171 15.3897 17.25 15.1989 17.25 15C17.25 14.8011 17.171 14.6103 17.0303 14.4697C16.8897 14.329 16.6989 14.25 16.5 14.25C16.3011 14.25 16.1103 14.329 15.9697 14.4697C15.829 14.6103 15.75 14.8011 15.75 15C15.75 15.1989 15.829 15.3897 15.9697 15.5303C16.1103 15.671 16.3011 15.75 16.5 15.75ZM15 12.75C15 12.9489 14.921 13.1397 14.7803 13.2803C14.6397 13.421 14.4489 13.5 14.25 13.5C14.0511 13.5 13.8603 13.421 13.7197 13.2803C13.579 13.1397 13.5 12.9489 13.5 12.75C13.5 12.5511 13.579 12.3603 13.7197 12.2197C13.8603 12.079 14.0511 12 14.25 12C14.4489 12 14.6397 12.079 14.7803 12.2197C14.921 12.3603 15 12.5511 15 12.75ZM16.5 13.5C16.6989 13.5 16.8897 13.421 17.0303 13.2803C17.171 13.1397 17.25 12.9489 17.25 12.75C17.25 12.5511 17.171 12.3603 17.0303 12.2197C16.8897 12.079 16.6989 12 16.5 12C16.3011 12 16.1103 12.079 15.9697 12.2197C15.829 12.3603 15.75 12.5511 15.75 12.75C15.75 12.9489 15.829 13.1397 15.9697 13.2803C16.1103 13.421 16.3011 13.5 16.5 13.5Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.75 2.25C6.94891 2.25 7.13968 2.32902 7.28033 2.46967C7.42098 2.61032 7.5 2.80109 7.5 3V4.5H16.5V3C16.5 2.80109 16.579 2.61032 16.7197 2.46967C16.8603 2.32902 17.0511 2.25 17.25 2.25C17.4489 2.25 17.6397 2.32902 17.7803 2.46967C17.921 2.61032 18 2.80109 18 3V4.5H18.75C19.5456 4.5 20.3087 4.81607 20.8713 5.37868C21.4339 5.94129 21.75 6.70435 21.75 7.5V18.75C21.75 19.5456 21.4339 20.3087 20.8713 20.8713C20.3087 21.4339 19.5456 21.75 18.75 21.75H5.25C4.45435 21.75 3.69129 21.4339 3.12868 20.8713C2.56607 20.3087 2.25 19.5456 2.25 18.75V7.5C2.25 6.70435 2.56607 5.94129 3.12868 5.37868C3.69129 4.81607 4.45435 4.5 5.25 4.5H6V3C6 2.80109 6.07902 2.61032 6.21967 2.46967C6.36032 2.32902 6.55109 2.25 6.75 2.25ZM20.25 11.25C20.25 10.8522 20.092 10.4706 19.8107 10.1893C19.5294 9.90804 19.1478 9.75 18.75 9.75H5.25C4.85218 9.75 4.47064 9.90804 4.18934 10.1893C3.90804 10.4706 3.75 10.8522 3.75 11.25V18.75C3.75 19.1478 3.90804 19.5294 4.18934 19.8107C4.47064 20.092 4.85218 20.25 5.25 20.25H18.75C19.1478 20.25 19.5294 20.092 19.8107 19.8107C20.092 19.5294 20.25 19.1478 20.25 18.75V11.25Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div className="flex flex-col ml-2 pb-5">
                <span className="flex text-[16px] text-[#97ABC0] items-center pt-5">
                  Date and Time
                </span>
                <span className="flex items-center">
                  Sat, Apr 30, 2022 11:30AM
                </span>
              </div>
            </CardDescription>
            <div className="border border-[#252D3C] h-[1px]  " />
            <CardDescription className="pt-5 flex items-center">
              <div
                className="flex items-center justify-center"
                style={{
                  width: "48px",
                  height: "48px",
                  left: "0px",
                  top: "4px",
                  background: "#292932",
                  borderRadius: "60px",
                }}
              >
                <svg
                  width="18"
                  height="21"
                  viewBox="0 0 18 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.54 20.351L8.61 20.391L8.638 20.407C8.74903 20.467 8.87327 20.4985 8.9995 20.4985C9.12573 20.4985 9.24997 20.467 9.361 20.407L9.389 20.392L9.46 20.351C9.85112 20.1191 10.2328 19.8716 10.604 19.609C11.5651 18.9305 12.463 18.1667 13.287 17.327C15.231 15.337 17.25 12.347 17.25 8.5C17.25 6.31196 16.3808 4.21354 14.8336 2.66637C13.2865 1.11919 11.188 0.25 9 0.25C6.81196 0.25 4.71354 1.11919 3.16637 2.66637C1.61919 4.21354 0.75 6.31196 0.75 8.5C0.75 12.346 2.77 15.337 4.713 17.327C5.53664 18.1667 6.43427 18.9304 7.395 19.609C7.76657 19.8716 8.14854 20.1191 8.54 20.351ZM9 11.5C9.79565 11.5 10.5587 11.1839 11.1213 10.6213C11.6839 10.0587 12 9.29565 12 8.5C12 7.70435 11.6839 6.94129 11.1213 6.37868C10.5587 5.81607 9.79565 5.5 9 5.5C8.20435 5.5 7.44129 5.81607 6.87868 6.37868C6.31607 6.94129 6 7.70435 6 8.5C6 9.29565 6.31607 10.0587 6.87868 10.6213C7.44129 11.1839 8.20435 11.5 9 11.5Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div className="flex flex-col ml-2 pb-5">
                <span className="flex flex-col text-[16px] text-[#97ABC0] pt-5">
                  Location
                </span>
                <span className="flex flex-col items-center">
                  Kathmandu , Nepal
                </span>
              </div>
            </CardDescription>
            <span className="flex flex-col color-red mt-5 ml-[55px] text-[#E14658] cursor-pointer ">
              View on Map
            </span>
            <div className="border border-[#252D3C] h-[1px]  " />
            <span className="font-semibold text-xl pt-5">Select tickets</span>
            <div className="flex">
              <div className="flex flex-col">
                <div className="text-[#97ABC0] text-lg">1x Ticket(s)</div>
                <div className="font-semibold text-[24px] ">
                  USD ${ticketPrice}
                </div>
              </div>
              <div className="flex items-center justify-center ml-auto gap-3">
                <Button
                  variant="destructive"
                  className="bg-gray-500 rounded-xl"
                  onClick={handleDecrease}
                >
                  -
                </Button>
                <div className="font-semibold text-lg items-center justify-center">
                  {ticketCount}
                </div>
                <Button
                  variant="destructive"
                  className="items-center justify-center rounded-xl bg-[#E14658]"
                  onClick={handleIncrease}
                >
                  +
                </Button>
              </div>
            </div>
            <br />
            <Button
              variant="destructive"
              className="flex flex-col items-center justify-center rounded-xl bg-[#E14658]"
              onClick={handleButtonClick}
            >
              Checkout for ${totalPrice}
            </Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default MoviePage;
