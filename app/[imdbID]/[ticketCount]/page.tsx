"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./pdffile";

interface PageProps {
  params: {
    imdbID: string;
    ticketCount: number;
  };
}
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface FormData {
  Name: string;
  Email: string;
  Address: string;
  Country: string;
  State: string;
  City: string;
  Zip: string;
}
//get imdbId and ticketCount from url
const MoviePage: FC<PageProps> = ({ params }) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const { register, handleSubmit } = useForm<FormData>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(params.ticketCount);

  //get the name, type etc of the movie through its imdbID
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormData(data);
    // console.log(formData);
  };
  const handleExternalButtonClick = () => {
    handleSubmit(onSubmit)();
  };

  if (!movie) {
    return <div>No movies found</div>;
  }

  return (
    <>
      <div className="border border-gray-700 bg-gray-700 h-[1px] pt-[80px]" />
      {/* Display the current path */}
      <div className="w-full h-full pt-[10px] pb-[10px] pl-[100px] bg-[#1C1C24] ">
        <div className="flex items-center h-full w-full text-[16px] ">
          <span className="text-[#97ABC0]">
            Home/ Explore event/ {movie.Title} /
            <span className="text-red-500">Checkout</span>
          </span>
        </div>
      </div>
      {/* Header */}
      <div className="bg-[#1E1E1E] h-screen w-full">
        <div className="flex items-center ml-[100px] pt-[48px] pb-[24px] text-xl text-white font-semibold">
          Order Confirmation
        </div>
        <div className=" flex items-center justify-center ml-[100px] border border-gray-700 bg-gray-700 h-[1px] max-w-[90%]" />
        <div className="flex items-start ml-[100px] mt-[48px] h-[516px] max-w-[90%]">
          <div className="bg-[#252D3C] text-white w-[808px] h-full flex justify-between pr-5 rounded-[8px]">
            {/* Form using react-hook-form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" pl-[24px] pt-[24px] w-full"
            >
              <div className="font-semibold">Information</div>
              <label className=" flex flex-col pt-[32px] ">
                Full Name:
                <input
                  type="text"
                  {...register("Name")}
                  className="flex bg-[#252D3C] flex-col rounded-[6px] mt-2 text-[#97ABC0] border py-2 px-2 border-gray-500"
                />
              </label>
              <br />
              <div className="flex flex-row">
                <label className="flex flex-col">
                  Email*:
                  <input
                    className="flex rounded-[6px] text-[#97ABC0] bg-[#252D3C] mt-2 border py-2 px-2 border-gray-500"
                    type="email"
                    {...register("Email", { required: true })}
                  />
                </label>
                <br />
                <label className="flex flex-col ml-auto">
                  Address*:
                  <input
                    className="flex rounded-[6px] text-[#97ABC0] bg-[#252D3C] mt-2 border py-2 px-2 border-gray-500"
                    type="text"
                    {...register("Address", { required: true })}
                  />
                </label>
              </div>

              <br />
              <div className="flex flex-row">
                <label className="flex flex-col">
                  Country*:
                  <select
                    className=" rounded-[6px] bg-[#252D3C] text-[#97ABC0] border py-2 px-2 mt-2 border-gray-500"
                    {...register("Country", { required: true })}
                  >
                    <option className="text-[#97ABC0]" value="">
                      Select Country
                    </option>
                    <option className="text-[#97ABC0]" value="Nepal">
                      Nepal
                    </option>
                    <option className="text-[#97ABC0]" value="India">
                      India
                    </option>
                  </select>
                </label>
                <br />
                <label className="ml-auto flex flex-col ">
                  State:
                  <input
                    className=" rounded-[6px] text-[#97ABC0] bg-[#252D3C] mt-2 border py-2 px-2 border-gray-500"
                    type="text"
                    {...register("State")}
                  />
                </label>
              </div>

              <br />
              <div className="flex flex-row">
                <label className="flex flex-col">
                  City:
                  <input
                    className=" rounded-[6px] text-[#97ABC0] bg-[#252D3C] mt-2 border py-2 px-2 border-gray-500"
                    type="text"
                    {...register("City")}
                  />
                </label>
                <br />
                <label className="ml-auto flex flex-col">
                  Zip:
                  <input
                    className=" rounded-[6px] text-[#97ABC0] bg-[#252D3C] mt-2 border py-2 px-2 border-gray-500"
                    type="text"
                    {...register("Zip")}
                  />
                </label>
              </div>
              <br />
            </form>
          </div>
          {/* 2nd card contents */}
          <div className="flex flex-row ml-auto justify-start  bg-[#252D3C] w-[500px] h-auto items-start text-white rounded-[8px]">
            <Card className=" border-[#252D3C] rounded-[8px]">
              <CardHeader>
                <CardTitle className="font-semibold mr-[289px] text-xl pb-5 whitespace-normal w-full text-[24px]">
                  Checkout Summary
                </CardTitle>
                <div className="border border-gray-700 h-[1px] " />

                <CardDescription className="pt-5 flex items-center font-semibold text-lg ">
                  {movie.Title}
                </CardDescription>
                <CardDescription className="pt-5 flex items-center text-[#97ABC0]  text-sm pb-2">
                  {movie.Type}
                  <svg
                    className="mx-3"
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3" cy="3" r="3" fill="#97ABC0" />
                  </svg>
                  Kathmandu, Nepal
                </CardDescription>

                <div className="border border-gray-700 h-[1px] " />
                <CardDescription className="pt-5 flex items-center text-[#97ABC0] w-full pb-2 ">
                  <div className="grid grid-cols-3 w-full space-y-2">
                    <div className="col-span-1 ">Normal</div>
                    <div className="flex justify-center col-span-1 text-white ">
                      x{ticketCount}
                    </div>
                    <div className="col-span-1 ml-auto text-white font-semibold text-[14px]">
                      $500
                    </div>
                    <div className="col-span-1 ">Sub Total</div>
                    <div className="col-span-2 text-white text-end font-semibold text-[14px]">
                      ${ticketCount * 500}
                    </div>
                    <div className="col-span-1 ">Tax ( 13% )</div>
                    <div className="col-span-2 text-white text-end font-semibold text-[14px]">
                      ${ticketCount * 500 * 0.13}
                    </div>
                    <div className="col-span-1 ">Discount ( 0% )</div>
                    <div className="col-span-2 text-white text-end font-semibold text-[14px]">
                      $0
                    </div>
                  </div>
                </CardDescription>
                <div className="border border-gray-700 h-[1px] " />
                <div className="flex">
                  <div className="flex flex-row py-2 text-[#97ABC0]">Total</div>
                  <div className="flex flex-row ml-auto py-2 text-[24px] text-white">
                    <span className=" flex text-xs mr-2 items-center text-[#97ABC0]">
                      USD
                    </span>
                    {/* Total cost */}
                    {ticketCount * 500 + ticketCount * 0.13 * 500}
                  </div>
                </div>
                {/* Button outside of form, so using external handler for form submit */}
                <Button
                  variant="destructive"
                  className="flex items-center justify-center bg-[#E14658] w-full h-[48px] rounded-xl "
                  onClick={handleExternalButtonClick}
                >
                  Confirm & Pay
                </Button>
                {/* When form data is ready , then download pdf */}
                {formData && (
                  <PDFDownloadLink
                    document={
                      <PDFDocument
                        poster={movie.Poster}
                        title={movie.Title}
                        type={movie.Type}
                        name={formData?.Name}
                        city={formData?.City}
                        country={formData?.Country}
                        ticketCount={ticketCount}
                      />
                    }
                    fileName="ticket.pdf"
                  >
                    {({ loading }) =>
                      loading ? (
                        "Loading document..."
                      ) : (
                        <Button
                          variant="destructive"
                          className="bg-[#E14658] flex items-center jusify-center rounded-[10px]"
                        >
                          Download
                        </Button>
                      )
                    }
                  </PDFDownloadLink>
                )}
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviePage;
