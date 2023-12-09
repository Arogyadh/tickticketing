"use client";
import React, { useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="w-full bg-[#1C1C24] flex fixed">
      {/* Navbar */}
      <NavigationMenu>
        <Link href="/">
          <svg
            className="flex items-center lg:ml-[100px] h-[80px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="IconChangeColor"
            height="35"
            width="35"
          >
            <path
              d="M23,9.32a1.06,1.06,0,0,0-.1-.76,4.93,4.93,0,0,0-6.75-1.8L14,8,9,5.65a1,1,0,0,0-.92,0l-3,1.73a1,1,0,0,0-.5.84,1,1,0,0,0,.46.87l3.3,2.08-1.74,1-4.78.58a1,1,0,0,0-.53,1.75l3.54,3.06a3,3,0,0,0,3.55.44L22.5,9.93A1,1,0,0,0,23,9.32Zm-15.53,7a1,1,0,0,1-1.2-.18L4.37,14.51l2.73-.33a1,1,0,0,0,.38-.13l3.36-1.93a1,1,0,0,0,.5-.85,1,1,0,0,0-.47-.86L7.57,8.32l1.1-.63,5,2.32a1,1,0,0,0,.92,0l2.56-1.48a3,3,0,0,1,3.36.29Z"
              id="mainIconPathAttribute"
              filter="url(#shadow)"
              fill="#ff0000"
            ></path>
            <filter id="shadow">
              <feDropShadow
                id="shadowValue"
                stdDeviation="0.3"
                dx="-1.5"
                dy="1.5"
                flood-color="black"
              ></feDropShadow>
            </filter>
            <filter id="shadow">
              <feDropShadow
                id="shadowValue"
                stdDeviation=".5"
                dx="0"
                dy="0"
                flood-color="black"
              ></feDropShadow>
            </filter>
          </svg>
        </Link>

        <div className="text-white font-bold ml-2">MyMovie</div>
        <NavigationMenuList className=" hidden space-x-8 text-white md:flex ">
          <NavigationMenuItem>
            <Link href="/">
              <span className="ml-[80px] hover:opacity-[0.8] ">Home</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/concerts">
              <span className="hover:opacity-[0.8]">Concerts</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/movies">
              <span className="hover:opacity-[0.8]">Movies</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/theater-events">
              <span className="hover:opacity-[0.8]">Theater Events</span>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="hidden sm:flex ml-auto text-white space-x-8 items-center justify-center mr-[100px] font-semibold">
        <NavigationMenuItem className="flex">
          <Link href="/login">
            <span className="hover:opacity-[0.8]">Login</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex ">
          <Link href="/register">
            <Button
              variant="destructive"
              className="bg-[#36454f] rounded-[10px] hover:opacity-[0.8] "
            >
              Register
            </Button>
          </Link>
        </NavigationMenuItem>
      </div>
    </div>
  );
};

export default Navbar;
