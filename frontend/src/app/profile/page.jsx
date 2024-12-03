import ProfileComponent from "@/components/Profile/ProfileComponent";

export async function generateMetadata() {
  
  return {
    title: "Sujoy Paul",
    details: ""
  }
}

const ProfilePage = () => {
    return (
        <div className="h-full w-full">
            <ProfileComponent ></ProfileComponent>
        </div>
    );
};

export default ProfilePage;