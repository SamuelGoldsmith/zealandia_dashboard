import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button";
import { X } from "lucide-react"

function Footer() {
    return (
        <div className="w-full bg-deep-brown text-sm flex flex-row justify-bottom-0 justify-center">
            <Drawer
                direction={'bottom'}
            >
                <DrawerTrigger asChild>
                    <Button variant={'link'} className="text-lg text-primary p-3 font-bold hover:underline">
                        Provide Your Feedback!
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="p-3 bg-deep-brown data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=top]:max-h-[80vh]">
                    <DrawerHeader className={'flex flex-row justify-between p-0'}>
                        <DrawerTitle className={'text-3xl text-primary text-left pb-6 px-3'}>
                            Help us improve our website, provide your feedback!
                        </DrawerTitle>
                        <DrawerClose asChild>
                            <Button
                                variant="ghost"
                                className={'text-primary hover:text-foreground hover:bg-primary-tp px-3'}>
                                <X style={{ width: '2rem', height: '2rem' }}/>
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                    <div className="px-3 pb-6">
                        <div className="w-full h-[60vh] overflow-hidden">
                            <iframe
                                title="Feedback form"
                                src="https://forms.office.com/Pages/ResponsePage.aspx?id=BO8_au8HkUyVn5vb2cF-r11hxu73f3ZGkdEG50pH_QhUQkdJSjUxSzBYUjU0RENDR1RJM0c3S1IwWS4u&embed=true"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                                sandbox="allow-forms allow-same-origin allow-scripts allow-popups"
                            />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export {Footer};