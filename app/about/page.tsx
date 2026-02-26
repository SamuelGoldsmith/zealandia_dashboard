import { HoverTranslation } from "@/components/hover-translation";
import { TextBox } from "@/components/text-box";
import Image from "next/image";
import { Story } from "@/components/story";
import { getTextData } from "@/lib/getTextData";
import { createTranslatedNode } from "@/lib/utils";

export default async function Partners() {

    const strategyGroup = [
        {
            img: '/partners/Zealandia.jpg',
            link: 'https://www.visitzealandia.com/'
        },
        {
            img: '/partners/TaranakiWhanui.jpg',
            link: 'https://www.pnbst.maori.nz/welcome-to-taranaki-whanui-ki-te-upoko-o-te-ika-port-nicholson-block-settlement-trust/'
        },
        {
            img: '/partners/GWRC.png',
            link: 'https://www.gw.govt.nz/ '
        },
        {
            img: '/partners/city council.png',
            link: ' https://wellington.govt.nz/ '
        },
        {
            img: '/partners/VUW.png',
            link: 'https://www.wgtn.ac.nz/'
        },
        {
            img: '/partners/CentrePort.jpg',
            link: 'https://www.centreport.co.nz/'
        },
        {
            img: '/partners/MORPHUM.jpg',
            link: 'https://www.morphum.com/'
        },
        {
            img: '/partners/GHD.jpg',
            link: 'https://www.ghd.com/en-nz'
        },

    ];

    const [tb1, tb2] = await Promise.all([
        getTextData("about1"),
        getTextData("about2"),
    ]);

        const tb1Node = createTranslatedNode(tb1.text, tb1.translate)
        const tb2Node = createTranslatedNode(tb2.text, tb2.translate)

    return (
        <div className={"flex flex-col w-full"}>
            <TextBox
                text={"Sanctuary to Sea"}
                secondaryText={"Kia Mouriora Te Kaiwharawhara"}
                type={"dark-inline"}
                className={'text-3xl text-left mt-0 flex-wrap lg:flex-nowrap md:flex-nowrap'}
            />
            <TextBox
                className={'whitespace-break-spaces text-left text-xl pb-12 rounded-md'}
                type="blue"
            >
                {tb1Node}
                <div className="flex flex-row flex-wrap w-full h-1/2 p-6 justify-center self-center">
                    {strategyGroup.map((partner, index) => (
                        <a
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            className="relative w-[25vw] p-3 flex flex-col h-[25vh]">
                            <div className="relative w-full h-full flex-1">
                                <Image
                                    src={partner.img}
                                    alt={'partner'}
                                    fill
                                    className="object-contain hover:opacity-80"
                                    draggable={false}
                                />
                            </div>
                        </a>
                    ))}
                </div>
            </TextBox>
            <TextBox
                text={tb2.title}
                type={"dark-inline"}
                className={'text-3xl text-left bg-sea-blue text-primary'}
            />
            <TextBox
                className={'whitespace-break-spaces text-left text-xl pb-12 rounded-md'}
                type="blue"
            >
{tb2Node}
            </TextBox>
            <div className="w-full m-3 pb-3 flex">

                <Image
                    src="/the_stream.png"
                    alt="sea icon"
                    width={150}
                    height={150}
                    className="m-3 md:w-1/9 md:h-1/9  sm:w-5 sm:h-5"
                />
                <div>
                    <h1 className="text-3xl text-vivid-azure m-3">Te Awa - The Stream</h1>
                    <ul className="list-disc text-left text-vivid-azure text-xl m-3 ml-5">
                        <li>Support aquatic native wildlife to thrive in healthy connected habitats</li>
                        <li>Enhance water quality of Te Kaiwharawhara stream and tributaries</li>
                        <li>Develop accessible, high quality information that supports exceptional decision making and informs the public</li>
                    </ul>
                </div>
            </div>
            <div className="w-full m-3 pb-3 flex">
                <Image
                    src="/the_forest.png"
                    alt="forest icon"
                    width={150}
                    height={150}
                    className="m-3 md:w-1/9 md:h-1/9  sm:w-5 sm:h-5"
                />
                <div>
                    <h1 className="text-3xl text-forest-green m-3">Te Ngahere - The Forest</h1>
                    <ul className="list-disc text-left text-forest-green text-xl m-3 ml-5">
                        <li>Support the emergence of connected forest remnants and riparian zones</li>
                        <li>Foster terrestrial habitats that provide a safe home for native wildlife</li>
                        <li>Promote healthy urban habitats and ecosystems</li>
                    </ul>
                </div>
            </div>
            <div className="w-full m-3 pb-3 flex">
                <Image
                    src="/the_people.png"
                    alt="people icon"
                    width={150}
                    height={150}
                    className="m-3 md:w-1/9 md:h-1/9  sm:w-5 sm:h-5"
                />
                <div>
                    <h1 className="text-3xl text-kaka-60 m-3">Te Tangata - The People</h1>
                    <ul className="list-disc text-left text-kaka-60 text-xl m-3 ml-5">
                        <li>Start the community on a path to recognize the catchment as a living entity and encourage active involvement in restoration</li>
                        <li>Support mana whenua in reconnecting to Te Kaiwharawhara catchment </li>
                        <li>Ensure our work is exemplory in the area of catchment restoration and provide leadership in urban sustainability</li>
                    </ul>
                </div>
            </div>
            <p className="text-left text-deep-brown text-xl m-3 pb-3">
                Want to learn more about Kia Mouriora Te Kaiwharawhara?
                Read about the strategy <a href="https://www.visitzealandia.com/about/our-work/sanctuary-to-sea/" target="_blank">here</a>.
            </p>
            <Story className="flex-wrap lg:flex-nowrap md:flex-nowrap flex pb-10 bg-takahe-10">
                <div className={"flex flex-col"}>
                    <h1 className={"m-3 text-3xl font-bold"}>
                        A special thanks to Coordinate4u for making this website possible!
                    </h1>
                    <div className={"flex flex-wrap lg:flex-nowrap md:flex-nowrap align-top"}>
                        <a className="mx-3 ml-12 my-auto" href={"https://www.coordinate4u.org/"} target="_blank" >
                            <Image src={"/partners/Coordinate4U.webp"} alt={"Coordinate 4 U Logo"} width={200} height={200} className={"m-3 rounded-sm align-middle"} />
                        </a>
                        <TextBox className="text-left w-8/10 text-lg"
                            type="blue"
                            text={"Coordinate4u is a Wellington-based sustainability consultancy that provides environmental and " +
                                "waste management advice as well as supporting hands on implementation of waste reduction and " +
                                "conservation initiatives. They are dedicated to helping clients achieve their environmental goals " +
                                "while promoting sustainable practices. Coordinate4u offers a range of services including benchmarking " +
                                "against peers, system reviews and workshop facilitation. They work closely with clients to develop tailored " +
                                "solutions that address specific environmental challenges that their clients have control over which help " +
                                "these organisations to more efficiently use resources and lower their impact on New Zealand's unique " +
                                "biodiversity."} />
                    </div>
                </div>
            </Story>
        </div>
    );
}