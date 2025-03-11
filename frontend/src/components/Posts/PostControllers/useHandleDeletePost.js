import axios from "axios";
import toast from "react-hot-toast";

export const useHandleDeletePost = () => {


    const deletePost = async (post_id) => {
        await axios({
            method: "DELETE",
            url: `${process.env.NEXT_PUBLIC_SERVER}/post/delete?pid=${post_id}`,
            withCredentials: true
        })
        .then((res) => {
            console.log(res);
            if(res.data){
                toast.success(res?.data?.message)
                return {
                    response: true,
                    message: res?.data?.message
                }
            }
        })
        .catch((error) => {
            return {
                response: false,
                message: e?.message || "Problem when deleting the post"
            }
        })
    }

    return { deletePost };
};