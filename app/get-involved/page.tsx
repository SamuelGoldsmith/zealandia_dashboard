import {TextBox} from "@/components/text-box";
import Image from "next/image";
import {Story} from "@/components/story";
export default function getInvolved() {
    return (
        <div className={"flex flex-col w-full"}>
            <TextBox type="dark"
            text={"There are many ways to get involved with the conservation efforts in Te Kaiwharawhara. Whether you're interested in volunteering, donating, or simply learning more."}/>

            <Story className=" pb-10">{/*zealandia*/}
                <div className="flex justify-center items-center w-full mt-4 sm:flex-wrap">
                <a className="mx-3 my-auto" href={"https://www.visitzealandia.com/"} target="_blank" >
                <Image src={"/partners/Zealandia.webp"} alt={"Zealandia Logo"} width={100} height={100} className={"m-3 rounded-sm align-middle"}/>
               </a>
                <TextBox className="text-left w-8/10">
                Zealandia Te Māra a Tāne is a not-for-profit urban ecosanctuary in Wellington, 
                dedicated to restoring the forest and freshwater ecosystems of a 225-hectare valley 
                and protecting rare native wildlife inside a predator-exclusion fence. They have successfully 
                reintroduced many native species and helped increase bird biodiversity in and around the city. 
                Zealandia offers conservation education, visitor experiences, and community programmes that connect 
                people with Aotearoa’s unique environment. Their long-term vision is to inspire people to live with 
                nature both locally and beyond. 
                </TextBox>
                </div>
                <div className="flex justify-center items-center w-full mt-4 sm:flex-wrap">
                    <img src={"https://d1xuswh6q35c7x.cloudfront.net/media/images/Kakahi_3_Credit_Manaaki_Barrett_.2e16d0ba.fill-1534x767.avif"} alt={"Stream Cleaning"} className={"m-3 rounded-sm align-middle w-1/3"}/>
                    <img src={"https://d1xuswh6q35c7x.cloudfront.net/media/images/Track_Maintenance_team._Lynn_Fr.f3a4289b.fill-2960x1480.avif"} alt={"Group on a trail"} className={"m-3 rounded-sm align-middle w-1/3"}/>
                </div>
                <div className="flex justify-center items-center w-full mt-4 sm:flex-wrap">
                    <a className="text-blue-500 hover:underline" href={"https://www.visitzealandia.com/learn/"} target="_blank">
                        Zealandia Learn Page
                    </a>
                    <a className="text-blue-500 hover:underline ml-4" href={"https://www.visitzealandia.com/news-stories/"} target="_blank">
                        Zealandia News & Stories
                    </a>
                    <a className="text-blue-500 hover:underline ml-4" href={"https://www.visitzealandia.com/whats-on/ "} target="_blank">
                        Zealandia Upcoming Events
                    </a>
                </div>
            </Story>
            <Story className="flex-wrap lg:flex-nowrap md:flex-nowrap flex pb-10">
                <a className="mx-3 ml-12 my-auto" href={"https://www.coordinate4u.org/"} target="_blank" >
                <Image src={"/partners/Coordinate4U.webp"} alt={"Coordinate 4 U Logo"} width={100} height={100} className={"m-3 rounded-sm align-middle"}/>
               </a>
                <TextBox className="text-left w-8/10" text={"Coordinate 4 U is a Wellington-based environmental consultancy that provides ecological and conservation services. They are dedicated to helping clients achieve their environmental goals while promoting sustainable practices. Coordinate 4 U offers a range of services, including ecological surveys, habitat restoration, and conservation planning. They work closely with clients to develop tailored solutions that address specific environmental challenges and contribute to the preservation of New Zealand's unique biodiversity."}/>
            </Story>
        </div>
    );
}