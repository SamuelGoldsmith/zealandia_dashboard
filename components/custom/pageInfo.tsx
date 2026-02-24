import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import { CircleQuestionMark } from 'lucide-react';
import {usePathname} from "next/navigation";
import {
    HomeDescription,
    MapDescription,
    HistoryDescription,
    GetInvolvedDescription, AboutDescription
} from "@/components/custom/pageDescriptions";

export function PageInfoDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="text-background hover:text-nav-blue bg-nav-blue m-3 size-auto" title={"About this page"}>
                    <CircleQuestionMark className={"size-auto"}/>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-deep-brown text-primary">
                <DialogHeader>
                    <DialogTitle className="text-2xl underline">
                        How to use this page
                    </DialogTitle>
                    {usePathname() === "/" && (
                        <HomeDescription/>
                    )}
                    {usePathname() === "/map" && (
                        <MapDescription/>
                    )}
                    {usePathname() === "/history" && (
                        <HistoryDescription/>
                    )}
                    {usePathname() === "/get-involved" && (
                        <GetInvolvedDescription/>
                    )}
                    {usePathname() === "/about" && (
                        <AboutDescription/>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}