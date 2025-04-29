"use client" 
import ContainMargin from '@/components/shared/ContainMargin';
import React from 'react';

const PostComment = () => {

    const comments = [
        {
          _id: "1",
          user: {
            first_name: "Alice",
            last_name: "Johnson",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg"
          },
          post_id: "67c9c62e291089a035b083ce",
          comment: `This post saved my project!\nIf you're using Vercel CLI,\nuse the following to deploy:\n\nvercel --prod --confirm\n\nIt skips manual steps.\nSaves time during builds.\nHighly recommend this trick!\nThanks a ton!`,
          post_time: "2025-04-27T10:30:00Z"
        },
        {
          _id: "2",
          user: {
            first_name: "Bob",
            last_name: "Smith",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg"
          },
          post_id: "67c9c62e291089a035b083ce",
          comment: `Facing server crash errors?\nAdd this while starting app:\n\napp.listen(process.env.PORT || 3000, () => {\n  console.log("Server ready");\n});\n\nDynamic ports are crucial.\nOtherwise Vercel fails hard.\nBig thanks for the guide!\nCheers!`,
          post_time: "2025-04-27T11:00:00Z"
        },
        {
          _id: "3",
          user: {
            first_name: "Clara",
            last_name: "Davis",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg"
          },
          post_id: "67c9c62e291089a035b083ce",
          comment: `Guys, don't forget scripts!\nIn package.json add:\n\n"scripts": {\n  "start": "node index.js",\n  "dev": "nodemon index.js"\n}\n\nWithout start script,\nVercel auto-deploy fails.\nLearned it the hard way!`,
          post_time: "2025-04-27T11:30:00Z"
        },
        {
          _id: "4",
          user: {
            first_name: "Daniel",
            last_name: "Brown",
            avatar: "https://randomuser.me/api/portraits/men/4.jpg"
          },
          post_id: "67c9c62e291089a035b083ce",
          comment: `Static files issue?\nFix using express.static:\n\nconst path = require('path');\napp.use(express.static(path.join(__dirname, 'public')));\n\nVercel looks inside public.\nMissing it caused errors.\nAppreciate the tutorial.\nAwesome explanation!`,
          post_time: "2025-04-27T12:00:00Z"
        },
        {
          _id: "5",
          user: {
            first_name: "Emily",
            last_name: "Clark",
            avatar: "https://randomuser.me/api/portraits/women/5.jpg"
          },
          post_id: "67c9c62e291089a035b083ce",
          comment: `Huge mistake people make:\nMissing vercel.json config.\nUse below if backend app:\n\n{\n  "builds": [{ "src": "index.js", "use": "@vercel/node" }]\n}\n\nFixes deployment issues.\nThanks for sharing bro!\nLoved this content!`,
          post_time: "2025-04-27T12:30:00Z"
        }
      ];
      

    return (
        <div>
            <ContainMargin >

            {
                comments.map(({_id, user, post_id, comment, post_time}) => 
                    <div key={_id}>
                        <h1>{comment}</h1>
                    </div>
                )
            }
            </ContainMargin>
            
        </div>
    );
};

export default PostComment;