import HomeProfile from "@/components/Home/HomeProfile";
import ContainMargin from "@/components/shared/ContainMargin";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background min-h-screen pt-16">
      <ContainMargin>
        <div className="flex">
          <div className="w-[15%] p-1 mt-5 max-h-[90vh] scroll-pr-14 overflow-y-scroll static top-20 scrollbar-thumb-rounded">
            <HomeProfile></HomeProfile>
          </div>
          <div className="border-x-[1px] border-primary w-[70%]"></div>
          <div className="w-[15%]"></div>
        </div>
      </ContainMargin>
    </div>
  );
}
