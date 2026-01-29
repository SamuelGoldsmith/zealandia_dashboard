import {TextBox} from "@/components/text-box";

export default function Partners() {
  return (
      <div className={"flex items-center justify-between w-full"}>
          <TextBox text={"The Sanctuary to Sea — Kia Mouriora Te Kaiwharawhara project is a multi-stakeholder " +
              "effort that aims to restore the waterways and forests of the Kaiwharawhara water catchment, " +
              "and reconnect people with nature. This project will help make Wellington a world-class nature-rich city, " +
              "and by doing so facilitate social and financial benefits to the broader community. " +
              " Kia Mouriora Te Kaiwharawhara is a collaboration led by Zealandia Te Māra a Tāne in partnership " +
              "with mana whenua Taranaki Whānui ki Te Upoko o Te Ika. Together, we work closely with local businesses, " +
              "community groups, and other organisations to restore the mouri of Te Kaiwharawhara whaitua."} type={"dark"}>
          </TextBox>
      </div>

  );
}