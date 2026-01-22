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
        <ButtonGroup>
            <Button
                {...props}
                variant={"link"}
                size={"lg"}
                style={{fill: "#f26422"}}
                onClick={() => router.push(route? route : "/")}>
                {text}
            </Button>
        </ButtonGroup>
    );
}

export { NavButton };