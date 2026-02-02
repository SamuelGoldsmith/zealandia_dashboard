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
                    className={"cursor-pointer rounded-md hover:opacity-80"}
                    width={200}
                    height={200}
                />
            </div>
            <div className={"flex items-center justify-between w-full"}>
                <NavButton route={"/map"} text={"Catchment Map and Data"}></NavButton>
                <NavButton route={"/history"} text={"Region History"}></NavButton>
                <NavButton route={"/contribute"} text={"Get Involved"}></NavButton>
                <NavButton route={"/about"} text={"About"}></NavButton>
            </div>
        </div>
    );
}

export {NavBar};
