"use client";

import React from "react";
import {NavButton} from "@/components/custom/navButton";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';

function NavBar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`flex ${isOpen ? "flex-col md:flex-row" : "flex-row"} bg-nav-blue w-full shadow-md`}>
            <div className={"flex flex-row"}>
                <Image
                    src="/KMTKDashboardLogo.jpg"
                    alt="Kia Mouriora Te Kaiwharawhara Logo"
                    onClick={() => router.push("/")}
                    className={"cursor-pointer rounded-md hover:opacity-80 max-h-20 min-w-50"}
                    width={200}
                    height={200}
                />
            </div>
                <div className="flex items-center justify-between w-full">
                    <div className={` w-full md:flex ${isOpen ? "flex flex-wrap w-full" : "hidden"}`}>
                    <NavButton route={"/map"} text={"Catchment Map and Data"}></NavButton>
                    <NavButton route={"/history"} text={"Region History"}></NavButton>
                    <NavButton route={"/get-involved"} text={"Get Involved"}></NavButton>
                    <NavButton route={"/about"} text={"About"}></NavButton>
                    </div>
                    <div className="md:hidden ml-auto m-3">
                        <Hamburger color="#feb41d" toggled={isOpen} toggle={setIsOpen} />
                    </div>

            </div>
        </div>
    );
}

export {NavBar};