import {ButtonGroup} from "@/components/ui/button-group";
import {Button, buttonVariants} from "@/components/ui/button";
import React from "react";
import type {VariantProps} from "class-variance-authority";
import {useRouter} from "next/navigation";

function NavButton( {
    route,
    text,
    ...props
}: React.ComponentProps<"button"> &
VariantProps<typeof buttonVariants> & {
    route?: string
    text: string
}) {

    const router = useRouter();

    return (
        <div className={"border-l border-white my-auto w-full place-items-center"}>
            <ButtonGroup>
                <Button
                    {...props}
                    variant={"link"}
                    size={"lg"}
                    className={"text-zealandia-orange m-auto"}
                    onClick={() => router.push(route? route : "/")}>
                    {text}
                </Button>
            </ButtonGroup>
        </div>
    );
}

export { NavButton };