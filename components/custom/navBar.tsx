"use client";

import React from "react";
import {ButtonGroup} from "@/components/ui/button-group";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Image from "next/image";

function NavBar() {
    const router = useRouter();

    return (
        <div className={"m-4 flex items-center"}>
            <div>
                <Image
                    className=""
                    src="/tui.jpg"
                    alt="Tui bird in tree at zealandia"
                    width={150}
                    height={100}
                    priority
                    onClick={() => router.push("/")}
                />
                <p>Temporary Home Button</p>
            </div>
            <div className={"absolute right-0 p-4 flex items-center"}>
                <ButtonGroup>
                    <ButtonGroup>
                        <Button variant={"outline"}
                                size={"lg"}
                                onClick={() => router.push("/KMTK")}>
                            Sanctuary To Sea
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant={"outline"}
                                size={"lg"}
                                onClick={() => router.push("/map")}>
                            Dynamic Map
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant={"outline"}
                                size={"lg"}
                                onClick={() => router.push("/resources")}>
                            Resources
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </div>
        </div>
    );
}

export {NavBar};
