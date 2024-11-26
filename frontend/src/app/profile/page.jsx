import ProfileComponent from "@/components/Profile/ProfileComponent";
import axios from "axios";

export async function generateMetadata() {
  
  return {
    title: "Sujoy Paul",
    details: ""
  }
}

const ProfilePage = async () => {
    const res = await fetch(`http://localhost:5000/api/v1/post/viewposts`)
    const data = await res.json()
    console.log(data)
    return (
        <div className="h-full w-full">
            <ProfileComponent posts={data?.data?.posts}></ProfileComponent>
        </div>
    );
};

export default ProfilePage;