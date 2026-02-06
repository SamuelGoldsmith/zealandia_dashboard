import {TextBox} from "@/components/text-box";
import Image from "next/image";
import {Story} from "@/components/story";
export default function getInvolved() {
    return (
        <div className={"flex flex-col w-full"}>
            <TextBox type="dark"
            text={"There are many ways to get involved with the conservation efforts in Te Kaiwharawhara. Whether you're interested in volunteering, donating, or simply learning more."}/>
            <Story className="flex-wrap lg:flex-nowrap md:flex-nowrap flex pb-10">
                <a className="mx-3 my-auto" href={"https://www.coordinate4u.org/"} target="_blank" >
                <Image src={"/partners/Coordinate4U.webp"} alt={"Coordinate 4 U Logo"} width={500} height={500} className={"m-3 rounded-sm align-middle"}/>
               </a>
                <TextBox className="text-left w-8/10" text={"Coordinate 4 U is a Wellington-based environmental consultancy that provides ecological and conservation services. They are dedicated to helping clients achieve their environmental goals while promoting sustainable practices. Coordinate 4 U offers a range of services, including ecological surveys, habitat restoration, and conservation planning. They work closely with clients to develop tailored solutions that address specific environmental challenges and contribute to the preservation of New Zealand's unique biodiversity."}/>
            </Story>
            <Story className="flex pb-10"><></></Story>
        </div>
    );
}