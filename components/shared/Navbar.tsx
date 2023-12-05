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
      <NavigationMenu>
        <Link href="/">
          <svg
            width="30"
            height="26"
            viewBox="0 0 30 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex items-center ml-[100px] h-[80px]"
          >
            <path
              d="M5.05378 8.76115L8.29718 6.89061L6.48677 3.75658H23.5132L0.5 14.0002L15.0027 18.5023L9.5 16.5002L9.94897 17.2388L15.0027 25.99L30 0.0100098H0L5.05378 8.76115Z"
              fill="white"
            />
          </svg>
        </Link>

        <div className="text-white font-bold ml-2">TickTicketing</div>
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
              className="bg-red-500 rounded-[10px] hover:opacity-[0.8] "
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
