import {TextBox} from "@/components/text-box";
import Image from "next/image";

export default function Partners() {

    const partners = [
        {
            img: '/partners/Zealandia.webp',
            link: 'https://www.visitzealandia.com/'
        },
        {
            img: '/partners/Coordinate4U.webp',
            link: 'https://www.coordinate4u.org/'
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
            img: '/partners/EcoNet.png',
            link: 'https://econet.nz/'
        },
        {
            img: '/partners/Trelissik Park Group.png',
            link: 'https://www.trelissickpark.org.nz/'
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
        {
            img: '/partners/Wellington water.png',
            link: 'https://www.wellingtonwater.co.nz/'
        },

        ];

    return (
        <div className={"flex flex-col w-full"}>
            <p className={'text-5xl text-roto-blue font-bold pl-[5vw] pt-[5vh]'}>Our Partners</p>
            <div className="flex flex-row flex-wrap w-full h-1/2 p-6 justify-center self-center">
                {partners.map((partner, index) => (
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
            <TextBox text={"Kia Mouriora Te Kaiwharawhara is a collaboration led by Zealandia Te Māra a Tāne " +
                "in partnership with mana whenua Taranaki Whānui ki Te Upoko o Te Ika. The project receives " +
                "strategic support from CentrePort, Wellington City Council, Greater Wellington Regional " +
                "Council, Morphum Environmental Ltd., GHD, and Te Herenga Waka Victoria University of " +
                "Wellington.\n" +
                "\n" +
                "Together, we work closely with local businesses, community groups, and " +
                "other organisations to restore the mouri of Te Kaiwharawhara whaitua."} type={"dark"}
                className={'whitespace-break-spaces text-left'}
            >
            </TextBox>
        </div>
    );
}