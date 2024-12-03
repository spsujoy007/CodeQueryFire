import HomePosts from "@/components/Home/HomePosts/HomePosts";
export const metadata = {
  title: `Home - CodeQueryFire`,
  description: `Answer and post your problem's with CodeQueryFire`,
}
const Home = ({searchParams}) => {

  return (
    <div className="">
      <HomePosts searchParams={searchParams}></HomePosts>
    </div>
  );
}

export default Home