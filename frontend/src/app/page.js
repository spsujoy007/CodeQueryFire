import HomePosts from "@/components/Home/HomePosts/HomePosts";
import HomeProfile from "@/components/Home/HomeProfile";
import ContainMargin from "@/components/shared/ContainMargin";
import Image from "next/image";

const Home = async() => {
  const res = await fetch('https://mocki.io/v1/604ce093-9ffa-45d5-aaa7-b637fbf69778')
  const data = await res.json()

  return (
    <div className="">
      <HomePosts posts={data}></HomePosts>
    </div>
  );
}

export default Home