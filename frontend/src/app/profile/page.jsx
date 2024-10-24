import ProfileComponent from "@/components/Profile/ProfileComponent";
import axios from "axios";

export async function generateMetadata() {
  
  return {
    title: "Sujoy Paul",
    details: ""
  }
}

const ProfilePage = () => {
    return (
        <div className="min-h-screen w-full">
            {/* <h1 className="text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequuntur in dolores possimus vero earum quibusdam maxime asperiores illo impedit.</h1> */}
            <ProfileComponent></ProfileComponent>
        </div>
    );
};

export default ProfilePage;