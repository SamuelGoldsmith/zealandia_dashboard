"use client";

import React from "react";
import {ButtonGroup} from "@/components/ui/button-group";
import {NavButton} from "@/components/custom/navButton";
import Image from "next/image";
import {useRouter} from "next/navigation";

function NavBar() {
    const router = useRouter();

    return (
        <div className={"flex items-center bg-nav-blue"}>
            <div>
                <Image
                    src="/KMTKDashboardLogo.jpg"
                    alt="Dashboard Logo"
                    priority
                    onClick={() => router.push("/")}
                    width={400}
                    height={400}
                />
            </div>
            <div className={"absolute right-0 p-4 flex items-center"}>
                <ButtonGroup>
                    <ButtonGroup>
                        <NavButton route={"/KMTK"} text={"Sanctuary to sea"}></NavButton>
                    </ButtonGroup>
                    <ButtonGroup>
                        <NavButton route={"/map"} text={"Map"}></NavButton>
                    </ButtonGroup>
                    <ButtonGroup>
                        <NavButton route={"/resources"} text={"Resources"}></NavButton>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
        </div>
    );
}

export {NavBar};
