import React from 'react';
import SingleCard from './SingleCard';

const HomePosts = () => {

  const posts = [
    {
      _id: "42",
      title: "Understanding Async/Await in JavaScript",
      details: `Specifically, if a user navigates 
to any page besides the home page and refreshes the page, 
the default Netlify 404 renders. From the 404 page, if I navigate back to the home page and refresh, the home page is rendered. Also, my custom 404 page isn’t working as it does when I’m on localhost:3000, but I would like to get this refresh issue figured
out first before dealing with my custom 404 component. I’m using React and react-router, and I understand that since I’m using react-router, my website won’t deploy right out of the box.`,
      image: "https://via.placeholder.com/150",
      tags: ["JavaScript", "Async"],
      name: "Alice Walker",
      profilePic: "https://via.placeholder.com/50",
      postTime: "2024-09-14T14:41:46Z",
      link: "https://example.com/async-await",
      likes: 1120,
      dislikes: 2,
      shares: 25,
      views: 350,
    },
    {
      _id: "72",
      title: "Creating a Responsive Grid with CSS Grid",
      details: "A guide on how to create a responsive grid layout using CSS Grid.",
      code: ".grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));\n  gap: 10px;\n}\n\n.grid-item {\n  background-color: #f1f1f1;\n  padding: 20px;\n  text-align: center;\n}",
      image: "https://via.placeholder.com/150",
      tags: ["CSS", "Grid"],
      name: "John Doe",
      profilePic: "https://via.placeholder.com/50",
      postTime: "2024-09-12T14:30:20Z",
      likes: 999,
      dislikes: 4,
      shares: 15,
      views: 280,
    },
    {
      _id: "67",
      title: "Introduction to React Hooks",
      details: "Explore the basics of React Hooks and how they can simplify state management in functional components.",
      code: "import React, { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n};\n\nexport default Counter;",
      image: "https://via.placeholder.com/150",
      tags: ["React", "Hooks"],
      name: "Emma Brown",
      profilePic: "https://via.placeholder.com/50",
      postTime: "2024-09-11T11:10:05Z",
      link: "https://example.com/react-hooks",
      likes: 150,
      dislikes: 1,
      shares: 20,
      views: 400,
    },
    {
      _id: "59",
      title: "Setting Up a Node.js Server",
      details: "Step-by-step instructions on how to set up a basic Node.js server using the http module.",
      code: "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, {'Content-Type': 'text/plain'});\n  res.end('Hello World');\n});\n\nserver.listen(3000, () => {\n  console.log('Server running at http://localhost:3000/');\n});",
      image: "https://via.placeholder.com/150",
      tags: ["Node.js"],
      name: "Michael Green",
      profilePic: "https://via.placeholder.com/50",
      postTime: "2024-09-10T16:20:45Z",
      link: "https://example.com/node-server",
      likes: 80,
      dislikes: 3,
      shares: 10,
      views: 220,
    }
  ];
   

    return (
        <div className='space-y-2 mt-0'>
            {
                posts.map((post, i) => 
                  <SingleCard key={i} post={post}></SingleCard>
              )
            }
        </div>
    );
};

export default HomePosts;