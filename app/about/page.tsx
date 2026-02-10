import { HoverTranslation } from "@/components/hover-translation";
import {TextBox} from "@/components/text-box";
import Image from "next/image";

export default function Partners() {

    const strategyGroup = [
        {
            img: '/partners/Zealandia.webp',
            link: 'https://www.visitzealandia.com/'
        },
        {
            img: '/partners/TaranakiWhanui.png',
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
            img: '/partners/CentrePort.svg',
            link: 'https://www.centreport.co.nz/'
        },
        {
            img: '/partners/MORPHUM.png',
            link: 'https://www.morphum.com/'
        },
        {
            img: '/partners/GHD.png',
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
                className={'whitespace-break-spaces text-left text-nav-blue text-xl pb-12 rounded-md'}
             type="blue"
            >
        
                Kia Mouriora Te Kaiwharawhara is a collaboration 
                led by Zealandia Te Māra a Tāne in partnership with 
                mana whenua Taranaki Whānui ki Te Upoko o Te Ika. 
                The project receives strategic support from CentrePort, 
                Wellington City Council, Greater Wellington Regional 
                Council, Morphum Environmental Ltd., GHD, and Te Herenga 
                Waka Victoria University of Wellington.
                <br/><br/>
                Together, Kia Mouriora Te Kaiwharawhara works closely with 
                local businesses, community groups, and other organisations 
                to restore the <HoverTranslation text="mouri"/> of Te Kaiwharawhara whaitua.
            </TextBox>
            <TextBox
                text={"The Kia Mouriora Te Kaiwharawhara Sanctuary to Sea Strategy"}
                type={"dark-inline"}
                className={'text-3xl text-left bg-sea-blue text-secondary'}
            />
            <TextBox
                className={'whitespace-break-spaces text-nav-blue text-left text-xl pb-12 rounded-md'}
                type="blue"
            >
                Kia Mouriora Te Kaiwharawhara Sanctuary to Sea is a whole-of-catchment multi-stakeholder 
                restoration initiative aimed at restoring freshwater and 
                terrestrial ecosystems in Te Kaiwharawhara, by doing so 
                enhancing Wellington’s natural capital from “Sanctuary to Sea.”
                <br/><br/>
                Te whaitua o Te Kaiwharawhara is unique in Wellington City: it is the 
                largest stream system and only catchment with an open estuary on 
                Te Whanganui-a-Tara, Wellington harbour. It has many special values — a rich 
                cultural history, many species of native fish, and the unique 
                Zealandia santuary at one of the main headwaters, providing a source of 
                dispersal for unique wildlife. 
                <br/><br/>
                The goal of the Kia Mouriora Te Kaiwharawhara Sanctuary to Sea initiative is the 100-year 
                vision: in 100 years, the catchment is a healthy freshwater 
                and forested ecosystem in an urban setting, which sustains 
                an abundant native biodiversity and enhances the opportunities 
                for Wellingtonians to have a nature-rich future. 
                <br/><br/>
                The project objectives will be met through activites across 
                three interconnected dimensions: Te Awa — The Stream, Te 
                Ngahere — The Forest, and Te Tangata — The People. Te Ao Māori 
                will also provide a foundation to the decision making process. 
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
                        <li>Support aquatic native wildlife to thrive in healthy connected habitats</li>
                        <li>Enhance water quality of Te Kaiwharawhara stream and tributaries</li>
                        <li>Develop accessible, high quality information that supports exceptional decision making and informs the public</li>
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
                    <h1 className="text-3xl text-vivid-orange m-3">Te Tangata - The People</h1>
                    <ul className="list-disc text-left text-vivid-orange text-xl m-3 ml-5">
                        <li>Start the community on a path to recognize the catchment as a living entity and encourage active involvement in restoration</li>
                        <li>Support mana whenua in reconnecting to Te Kaiwharawhara catchment </li>
                        <li>Ensure our work is exemplory in the area of catchment restoration and provide leadership in urban sustainability</li>
                    </ul>
                </div>
            </div>
            <p className="text-left text-deep-brown text-xl m-3 pb-3">
                Want to learn more about Kia Mouriora Te Kaiwharawhara? 
                Read about the strategy <a href="https://www.visitzealandia.com/about/our-work/sanctuary-to-sea/" target="_blank" className="text-nav-blue hover:underline">here</a>.
            </p>
            <TextBox
                secondaryText={"Kia Mouriora Te Kaiwharwhara Strategy Group"}
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