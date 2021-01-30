import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { NextPageContext } from "next";
import { MyComments } from "../../interfaces/comments";

const PostContainer = styled.div`
  padding-top: 20px;
  margin-bottom: 40px;
`;

const Title = styled.h3`
  color: #333333;
  font-size: 32px;
  font-family: Helvetica Neue;
  margin-bottom: 20px;
`;

const Text = styled.p`
  color: #333333;
  font-size: 18px;
  font-family: Helvetica Neue;
  margin-bottom: 10px;
`;

const CommentsListContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 50px;
`;

const CommentsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: left;
  flex-wrap: wrap;
  list-style: none;
`;

const CommentBox = styled.li`
  border-left: 6px solid #bb3737;
  padding: 10px;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Message = styled.p`
  color: #333333;
  font-size: 16px;
  font-family: Helvetica Neue;
`;

const Input = styled.textarea`
  resize: none;
  width: 100%;
  min-height: 50px;
  border-left: 2px solid #333333;
  font-size: 16px;
  font-family: Helvetica Neue;
  padding: 10px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-wrap: no-wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 60px;
  background-color: #bb3737;
  color: #ffffff;
  font-size: 16px;
  font-family: Helvetica Neue;
  border: none;
`;

interface PostPageProps {
  post: {
    id: string | number
    title: string
    body: string
    comments: MyComments[]}
}

const Post = ({ post }: PostPageProps) => {
  const [state, setState] = useState(post.comments);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setState(post.comments);
  }, []);

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    const id: string | number = await axios.post("https://simple-blog-api.crew.red/comments", {
      postId: post.id,
      body: message,
    });
    setState([
      ...state,
      {
        id,
        postId: post.id,
        body: message,
      },
    ]);
    setMessage("");
  };

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const listOfComments = state.map((el) => {
    return (
      <CommentBox key={el.id}>
        <Message>{el.body}</Message>
      </CommentBox>)
      });

  return (
    <>
      <PostContainer>
        <Title>{post.title}</Title>
        <Text>{post.body}</Text>
      </PostContainer>
      <CommentsListContainer>
        <Title>Comments</Title>
        <CommentForm onSubmit={handleSubmit}>
          <Input
            required={true}
            placeholder="Write your comment..."
            value={message}
            onChange={handleMessage}
          ></Input>
          <SubmitButton>Send</SubmitButton>
        </CommentForm>
        <CommentsContainer>
          {listOfComments}
        </CommentsContainer>
      </CommentsListContainer>
    </>
  );
};

Post.getInitialProps = async (ctx: NextPageContext) => {
  const post:PostPageProps = await axios.get(
    `https://simple-blog-api.crew.red/posts/${ctx.query.postId}?_embed=comments`
  ).then(res => {return res.data});
  return {post};
};

export default Post;
