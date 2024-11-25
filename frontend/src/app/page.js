import HomePosts from "@/components/Home/HomePosts/HomePosts";
import HomeProfile from "@/components/Home/HomeProfile";
import ContainMargin from "@/components/shared/ContainMargin";
import ServerUrl from "@/Hooks/useServerUrl";
import { cookies } from "next/headers";
import Image from "next/image";

export const metadata = {
  title: `Home - CodeQueryFire`,
  description: `Answer and post your problem's with CodeQueryFire`,
}
const Home = ({searchParams}) => {
  // const res = await fetch('https://mocki.io/v1/f0384dcb-0caf-4366-a692-77fa7de8815e')
  // const data = await res.json()
//   const res = await fetch(`https://cqf-be.onrender.com/api/v1/post/viewposts`, 
//   {
//     method: 'get'
//   },
//   {
//     cache: 'force-cache' | 'no-store'
//   }
// )
//   const data = await res.json()
//   console.log(data.data.posts)

  // const data = [
  //   {
  //     _id: "652f7543cd214dcf9b247b34",
  //     author_id: "652f7534d1a6b1bcf8a8b9a1",
  //     title: "Understanding Event Loop in JavaScript",
  //     details: "This post explains how the event loop works in JavaScript, focusing on async programming and promises.",
  //     images: [
  //       {
  //         url: "https://example.com/image1.jpg",
  //         public_id: "image1_public_id"
  //       }
  //     ],
  //     code: "console.log('Hello, World!');",
  //     programming_language: "JavaScript",
  //     topics: [
  //       { name: "JavaScript" },
  //       { name: "Async" },
  //       { name: "Event Loop" }
  //     ],
  //     source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop",
  //     createdAt: "2024-10-23T12:34:56.789Z",
  //     updatedAt: "2024-10-23T12:34:56.789Z"
  //   },
  //   {
  //     _id: "652f7553cd214dcf9b247b35",
  //     author_id: "652f7534d1a6b1bcf8a8b9a2",
  //     title: "A Beginner’s Guide to Python Decorators",
  //     details: "This post covers the basics of decorators in Python, including how to create and apply them.",
  //     images: [],
  //     code: "def decorator(func):\n    def wrapper():\n        print('Decorator executed')\n        return func()\n    return wrapper",
  //     programming_language: "Python",
  //     topics: [
  //       { name: "Python" },
  //       { name: "Decorators" }
  //     ],
  //     source: "https://realpython.com/primer-on-python-decorators/",
  //     createdAt: "2024-10-23T13:00:23.789Z",
  //     updatedAt: "2024-10-23T13:00:23.789Z"
  //   },
  //   {
  //     _id: "652f7563cd214dcf9b247b36",
  //     author_id: "652f7534d1a6b1bcf8a8b9a3",
  //     title: "Mastering CSS Grid Layout",
  //     details: "An advanced guide on building complex layouts using CSS Grid.",
  //     images: [
  //       {
  //         url: "https://example.com/grid-layout.png",
  //         public_id: "grid_layout_image"
  //       }
  //     ],
  //     code: ".container {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-gap: 10px;\n}",
  //     programming_language: "CSS",
  //     topics: [
  //       { name: "CSS" },
  //       { name: "Grid" },
  //       { name: "Layout" }
  //     ],
  //     source: "https://css-tricks.com/snippets/css/complete-guide-grid/",
  //     createdAt: "2024-10-23T13:10:56.789Z",
  //     updatedAt: "2024-10-23T13:10:56.789Z"
  //   },
  //   {
  //     _id: "652f7573cd214dcf9b247b37",
  //     author_id: "652f7534d1a6b1bcf8a8b9a4",
  //     title: "Using MongoDB Aggregation Framework",
  //     details: "This post introduces MongoDB’s aggregation framework with practical examples.",
  //     images: [],
  //     code: "db.orders.aggregate([\n  { $match: { status: 'completed' } },\n  { $group: { _id: '$customerId', total: { $sum: '$amount' } } }\n]);",
  //     programming_language: "MongoDB",
  //     topics: [
  //       { name: "MongoDB" },
  //       { name: "Database" }
  //     ],
  //     source: "https://docs.mongodb.com/manual/aggregation/",
  //     createdAt: "2024-10-23T13:20:34.789Z",
  //     updatedAt: "2024-10-23T13:20:34.789Z"
  //   },
  //   {
  //     _id: "652f7583cd214dcf9b247b38",
  //     author_id: "652f7534d1a6b1bcf8a8b9a5",
  //     title: "React Hooks: A Comprehensive Overview",
  //     details: "In this post, we’ll dive into React Hooks and how they can simplify your functional components.",
  //     images: [
  //       {
  //         url: "https://example.com/react-hooks.jpg",
  //         public_id: "react_hooks_image"
  //       }
  //     ],
  //     code: "const [count, setCount] = useState(0);\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);",
  //     programming_language: "JavaScript",
  //     topics: [
  //       { name: "React" },
  //       { name: "Hooks" }
  //     ],
  //     source: "https://reactjs.org/docs/hooks-intro.html",
  //     createdAt: "2024-10-23T13:30:12.789Z",
  //     updatedAt: "2024-10-23T13:30:12.789Z"
  //   }
  // ]

  return (
    <div className="">
      <HomePosts searchParams={searchParams}></HomePosts>
    </div>
  );
}

export default Home