"use client" 
import ContainMargin from '@/components/shared/ContainMargin';
import Image from 'next/image';
import React from 'react';

const PostComment = () => {

    const comments = [
      {
        user: {
          first_name: "Alice",
          last_name: "Johnson",
          avatar: "https://i.pravatar.cc/150?img=1"
        },
        post_id: "67c9c62e291089a035b083ce",
        comment: `// 💡 Deploy tip for Vercel CLI
    // Automate and skip confirmation manually
    // Saves you tons of build time during CI/CD
    
    vercel --prod --confirm
    
    // 👆 Use this to auto-deploy fast!
    // Thanks for this tip, really saved my workflow!`,
        post_time: "2025-04-27T10:30:00Z"
      },
      {
        user: {
          first_name: "Bob",
          last_name: "Smith",
          avatar: "https://i.pravatar.cc/150?img=2"
        },
        post_id: "67c9c62e291089a035b083ce",
        comment: `// 🚨 Prevent server crash on Vercel deploy!
    // Always use dynamic ports, not hardcoded ones
    
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server ready");
    });
    
    // 🔁 Avoiding fixed ports ensures smooth deploys.
    // Lifesaver advice. Much appreciated!`,
        post_time: "2025-04-27T11:00:00Z"
      },
      {
        user: {
          first_name: "Clara",
          last_name: "Davis",
          avatar: "https://i.pravatar.cc/150?img=3"
        },
        post_id: "67c9c62e291089a035b083ce",
        comment: `// 🔧 Important package.json setup!
    // Add proper start & dev scripts or Vercel will fail
    
    "scripts": {
      "start": "node index.js",
      "dev": "nodemon index.js"
    }
    
    // ⚠️ No start script = no production run!
    // Thank you for highlighting this. Really useful.`,
        post_time: "2025-04-27T11:30:00Z"
      },
      {
        user: {
          first_name: "Daniel",
          last_name: "Brown",
          avatar: "https://i.pravatar.cc/150?img=4"
        },
        post_id: "67c9c62e291089a035b083ce",
        comment: `// 📁 Serving static files on Express
    // Make sure to point to the correct folder
    
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'public')));
    
    // ⚙️ Vercel expects public/ for assets
    // Fixes many 404 issues. Thanks for this snippet!`,
        post_time: "2025-04-27T12:00:00Z"
      },
      {
        user: {
          first_name: "Emily",
          last_name: "Clark",
          avatar: "https://i.pravatar.cc/150?img=5"
        },
        post_id: "67c9c62e291089a035b083ce",
        comment: `Huge mistake people make:\nMissing vercel.json config.\nUse below if backend app:\n\n{\n  "builds": [{ "src": "index.js", "use": "@vercel/node" }]\n}\n\nFixes deployment issues.\nThanks for sharing bro!\nLoved this content!`,
        post_time: "2025-04-27T12:30:00Z"
      }
    ]
    
    
      

    return (
        <div className='border-y border-t-gray-300 pt-5 pb-10 mt-6 bg-white min-h-[400px]'>
          <ContainMargin >
          <h3 className='text-xl font-bold my-8 uppercase'>Comments and answers <span className='bg-primary text-white rounded-full px-5 text-lg'>{comments?.length}</span> </h3>

            <div className='space-y-10'>
            {
                comments.map(({_id, user, post_id, avatar, comment, post_time}) => 
                    <div key={_id} className=''>
                      <div className='flex items-top gap-4'>
                        <Image
                          width={40}
                          height={40}
                          src={user?.avatar}
                          className='w-[40px] h-[40px] object-cover rounded-full'
                          alt='user avatar'
                        />
                        <div className='mt-2'>
                          <div className='flex items-center gap-2'>
                            <h4 className='font-bold'>{user?.first_name} {user?.last_name}</h4>
                            <p className='text-gray-600'>20 minutes ago</p>
                          </div>

                          <div className='mt-3 '>
                          {/* whitespace-pre */}
                            <p className='font-[500] '>{comment.slice(0,120)}</p>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                )
            }
            </div>
            </ContainMargin>
            
        </div>
    );
};

export default PostComment;