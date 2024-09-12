import Image from 'next/image';
import React from 'react';

const HomeProfile = () => {
    return (
        <div>
            <div className='flex items-center gap-3'>
                <Image className='rounded-full ring-1 ring-primary' src={'https://res.cloudinary.com/cloudinarybysp/image/upload/v1726165245/personal/spsujoy.jpg'} width={45} height={45}></Image>
                <div>
                    <h5 className='text-sm font-bold'>Sujoy Paul</h5>
                    <p className='text-xs'>Web developer</p>
                </div>
            </div>
            <p className='mt-5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore neque nam hic perferendis iste quibusdam harum quas, in numquam. Modi incidunt eum quod blanditiis non sapiente quasi molestiae dolorem aperiam distinctio? Quaerat numquam, amet voluptates impedit pariatur vero enim ab iure, eligendi neque culpa, modi voluptatem eaque repellendus in. Porro tenetur natus excepturi vitae. Modi fuga provident accusantium, laborum unde dignissimos architecto officiis? Placeat perferendis ipsum cupiditate. Consectetur voluptatibus quidem aut a, eveniet voluptate aperiam qui exercitationem explicabo quibusdam veritatis. Consectetur, ipsam architecto est, illum accusamus odit omnis, corporis obcaecati earum debitis repellendus deleniti eos illo explicabo consequuntur sapiente placeat aliquid a labore et consequatur culpa. Reprehenderit in ipsa numquam sunt cupiditate cumque tempore mollitia eos dolore, vel praesentium porro distinctio suscipit delectus magni unde repellat perferendis qui? Repellat voluptate, illo dolor veniam magni sed dolorum, ut, nemo voluptatibus qui mollitia? Omnis harum impedit dolorem. Asperiores hic debitis delectus, minus odit eum vitae eveniet a unde dolores, aut, dicta fugit? Distinctio voluptates quidem, dignissimos at minus doloribus fugiat temporibus facilis ut sequi quas deserunt asperiores adipisci soluta aliquid vel veritatis veniam expedita natus ipsum eligendi? Doloribus atque, nihil ut obcaecati dolore ducimus! Non magnam vel dolore. Voluptatibus voluptatem excepturi aperiam!</p>
        </div>
    );
};

export default HomeProfile;