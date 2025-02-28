import ProfileComponent from '@/components/Profile/ProfileComponent';
export async function generateMetadata() {
    // const res = await fetch(`process.env.NEXT_PUBLIC_SERVER}/api/v1/users/loggedin-profile`, {
    //   method: 'get',
    //   credentials: 'include',
    // })
    // const data = await res.json()
    // console.log("DATA::::: ",data)
  
    // const res = axios({
    //   method: 'get',
    //   url: `${process.env.NEXT_PUBLIC_SERVER}/users/loggedin-profile`,
    //   withCredentials: true,
    // })
    // const data = res.data
    // console.log("DATA:", data)
  
    return {
      title: "CODE QUERY FIRE",
      details: ""
    }
  }
const page = () => {
    return (
        <div className="h-full w-full">
            <ProfileComponent ></ProfileComponent>
        </div>
    );
};

export default page;