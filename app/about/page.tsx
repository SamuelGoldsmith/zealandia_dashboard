import {TextBox} from "@/components/text-box";
import Image from "next/image";

export default function Partners() {

    const strategyGroup = [
        {
            img: '/partners/Zealandia.webp',
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
            img: '/partners/CentrePort.png',
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

    const keyCollaborators = [
        {
            img: '/partners/Trelissik Park Group.png',
            link: 'https://www.trelissickpark.org.nz/'
        },
        {
            img: '/partners/Coordinate4U.webp',
            link: 'https://www.coordinate4u.org/'
        },
        {
            img: '/partners/EcoNet.png',
            link: 'https://econet.nz/'
        },

        ];

    return (
        <div className={"flex flex-col w-full"}>
            <TextBox
                text={"Sanctuary to Sea"}
                secondaryText={"Kia Mouriora Te Kaiwharawhara"}
                type={"dark-inline"}
                className={'text-3xl text-left'}
            />
            <TextBox
                text={"Kia Mouriora Te Kaiwharawhara is a collaborative whole-of-catchment restoration initiative. " +
                    "The 100-year vision is that the mouri of Te Kaiwharawhara is healed." +
                    "\n\nKia Mouriora Te Kaiwharawhara is a collaboration led by Zealandia Te Māra a Tāne in partnership " +
                    "with mana whenua Taranaki Whānui ki Te Upoko o Te Ika. The project receives strategic support from CentrePort, " +
                    "Wellington City Council, Greater Wellington Regional Council, Morphum Environmental Ltd., GHD, and Te Herenga Waka " +
                    "Victoria University of Wellington." +
                    "\n\nTogether, we work closely with local businesses, community groups, and other organisations to restore the " +
                    "mouri of Te Kaiwharawhara whaitua."}
                className={'whitespace-break-spaces text-left text-nav-blue text-xl pb-12'}
                type={'light'}
            >
            </TextBox>
            <TextBox
                secondaryText={"Kia Mouriora Te Kaiwharwhwara Strategy Group"}
                type={"dark-inline"}
                className={'text-3xl text-left'}
            />
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
            <TextBox
                secondaryText={"Key Collaborators"}
                type={"dark-inline"}
                className={'text-3xl text-left'}
            />
            <div className="flex flex-row flex-wrap w-full h-1/2 p-6 justify-center self-center">
                {keyCollaborators.map((partner, index) => (
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
        </div>
    );
}