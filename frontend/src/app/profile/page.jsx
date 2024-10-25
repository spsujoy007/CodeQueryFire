import ProfileComponent from "@/components/Profile/ProfileComponent";
import axios from "axios";

export async function generateMetadata() {
  
  return {
    title: "Sujoy Paul",
    details: ""
  }
}

const ProfilePage = async () => {
    const res = await fetch(`https://mocki.io/v1/f0384dcb-0caf-4366-a692-77fa7de8815e`)
    const data = await res.json()

    return (
        <div className="h-full w-full">
            {/* <h1 className="text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequuntur in dolores possimus vero earum quibusdam maxime asperiores illo impedit.</h1> */}
            <ProfileComponent posts={data}></ProfileComponent>
        </div>
    );
};

export default ProfilePage;