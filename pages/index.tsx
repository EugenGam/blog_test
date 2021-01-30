import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import { MyPost } from "../interfaces/post";

const PostsWrapper = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  flex-wrap: wrap;
  padding-top: 40px;
  margin-bottom: 40px;
`;

const Post = styled.div`
  border-left: 6px solid #bb3737;
  padding: 20px;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Title = styled.h3`
  color: #333333;
  font-size: 20px;
  font-family: Helvetica Neue;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: #333333;
  font-size: 14px;
  font-family: Helvetica Neue;
  margin-bottom: 10px;
`;

const More = styled.a`
  color: white;
  font-size: 14px;
  font-family: Helvetica Neue;
  background-color: #333333;
  padding: 5px;
  cursor: pointer;
`;

interface HomePageProps {
  posts: MyPost[]
}

const Home = ({posts}: HomePageProps) => {
  const listOfPosts = posts.map((el) => {
    //filter for test posts
    if (el.body && el.title && el.body.length > 70) {
      const text: string = el.body.slice(0, 70) + "...";
      return (
        <Post key={el.id}>
          <Title>{el.title}</Title>
          <Text>{text}</Text>
          <Link href={`/posts/${el.id}`}>
            <More>Read more...</More>
          </Link>
        </Post>
      );
    }
  });
  return (
      <PostsWrapper>{listOfPosts}</PostsWrapper>
  );
}

Home.getInitialProps = async () => {
  const posts:MyPost[] = await axios.get(
    `https://simple-blog-api.crew.red/posts`
  ).then(res => {return res.data});
  return {posts};
};

export default Home;
