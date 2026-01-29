"use client";

import React from "react";
import {NavButton} from "@/components/custom/navButton";
import Image from "next/image";
import {useRouter} from "next/navigation";

function NavBar() {
    const router = useRouter();

    return (
        <div className={"flex bg-nav-blue w-full"}>
            <div className={"flex flex-row"}>
                <Image
                    src="/KMTKDashboardLogo.jpg"
                    alt="Kia Mouriora Te Kaiwharawhara Logo"
                    onClick={() => router.push("/")}
                    className={"cursor-pointer rounded-md"}
                    width={200}
                    height={200}
                />
            </div>
            <div className={"flex items-center justify-between w-full"}>
                <NavButton route={"/partners"} text={"Our Partners"}></NavButton>
                <NavButton route={"/map"} text={"Catchment Map and Data"}></NavButton>
                <NavButton route={"/KMTK"} text={"Region History"}></NavButton>
                <NavButton route={"/about"} text={"Our Mission"}></NavButton>
                <NavButton route={"/resources"} text={"Get Involved"}></NavButton>
            </div>
        </div>
    );
}

export {NavBar};
