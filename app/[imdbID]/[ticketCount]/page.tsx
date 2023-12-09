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
    console.log(formData);
  };
  const handleExternalButtonClick = () => {
    handleSubmit(onSubmit)();
  };

  if (!movie) {
    return <div>No movies found</div>;
  }

  return (
    <div className="flex flex-col h-full w-full pt-[80px] bg-[#1E1E1E] lg:pl-[100px] pb-[200px]">
      <div className="border border-gray-700 bg-gray-700 h-[1px]" />
      <div className="hidden lg:flex  h-[72px] w-full  text-[#97ABC0] text-[16px] items-center  ">
        Home / Explore event / {movie.Title} /
        <span className="flex text-red-500">Checkout</span>
      </div>
      <div className="flex flex-col  text-[24px] font-semibold text-[#fff] pb-[24px] max-md:pt-[24px]">
        Order Confirmation
      </div>
      <div className=" flex items-center mb-[48px] justify-center border border-gray-700 bg-gray-700 h-[1px] w-full lg:max-w-[87%]" />
      {/* form */}
      <div className="flex flex-col lg:flex-row w-full h-full bg-[#1E1E1E]  ">
        <div className="flex flex-col lg:h-[516px] h-full lg:w-[808px] w-full bg-[#252D3C] lg:mr-[32px] text-white p-[24px] rounded-xl mb-[20px]">
          <form onSubmit={handleSubmit(onSubmit)} className=" w-full h-full">
            <div className="font-medium text-[20px] pb-[32px]">Information</div>
            <label className=" flex flex-col  w-full">
              Full Name:
              <input
                type="text"
                {...register("Name")}
                className="flex bg-[#252D3C] lg:flex-col rounded-[6px] text-[#97ABC0] border border-gray-500 p-[12px]"
              />
            </label>
            <br />
            {/* Div for email and Address */}
            <div className="flex flex-col lg:flex-row w-full">
              <label className="flex flex-col w-full lg:w-1/2 mr-[24px]">
                Email*:
                <input
                  className="flex  rounded-[6px] text-[#97ABC0] bg-[#252D3C]  border border-gray-500 p-[12px]"
                  type="email"
                  {...register("Email", { required: true })}
                />
              </label>
              <br />
              <label className="flex flex-col lg:ml-auto w-full lg:w-1/2">
                Address*:
                <input
                  className="flex rounded-[6px] text-[#97ABC0] bg-[#252D3C] border   border-gray-500 p-[12px]"
                  type="text"
                  {...register("Address", { required: true })}
                />
              </label>
            </div>

            <br />
            {/* Country and State div */}
            <div className="flex flex-col lg:flex-row w-full ">
              <label className="flex flex-col w-full lg:w-1/2 mr-[24px]">
                Country*:
                <select
                  className=" rounded-[6px] bg-[#252D3C] text-[#97ABC0] border border-gray-500 p-[12px]"
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
              <label className="lg:ml-auto flex flex-col w-full lg:w-1/2 ">
                State:
                <input
                  className=" rounded-[6px] text-[#97ABC0] bg-[#252D3C] border  border-gray-500 p-[12px]"
                  type="text"
                  {...register("State")}
                />
              </label>
            </div>

            <br />
            {/* City and Zip div */}
            <div className="flex flex-col lg:flex-row w-full">
              <label className="flex flex-col w-full lg:w-1/2 mr-[24px]">
                City:
                <input
                  className=" rounded-[6px] text-[#97ABC0] bg-[#252D3C] border  border-gray-500 p-[12px]"
                  type="text"
                  {...register("City")}
                />
              </label>
              <br />
              <label className="flex flex-col lg:ml-auto w-full lg:w-1/2 ">
                Zip:
                <input
                  className=" rounded-[6px]  text-[#97ABC0] bg-[#252D3C]  border border-gray-500 p-[12px] "
                  type="text"
                  {...register("Zip")}
                />
              </label>
            </div>
            <br />
          </form>
        </div>

        <div className="flex flex-col lg:h-[500px]  h-full lg:w-[400px] w-full bg-[#252D3C] text-white rounded-xl ">
          <Card className=" border-[#252D3C] rounded-[8px] pb-[30px] bg-[#252D3C]">
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
                className="flex items-center justify-center bg-[#36454f] hover:bg-[#E14658] w-full h-[48px] rounded-xl "
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
                        className="bg-[#36454f] flex items-center jusify-center rounded-[10px] hover:bg-[#E14658]"
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
  );
};

export default MoviePage;
