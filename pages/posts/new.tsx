import React, { useState } from "react";
import Router from "next/router";
import axios from "axios";
import styled from "styled-components";

const PostContainer = styled.div`
  padding-top: 20px;
  margin-bottom: 20px;
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
const InputText = styled.textarea`
  resize: none;
  width: 100%;
  min-height: 250px;
  border-left: 2px solid #333333;
  font-size: 16px;
  font-family: Helvetica Neue;
  padding: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  min-height: 50px;
  border-left: 2px solid #333333;
  font-size: 16px;
  font-family: Helvetica Neue;
  padding-left: 10px;
`;

const PostForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  width: 300px;
  height: 50px;
  background-color: #bb3737;
  color: #ffffff;
  font-size: 20px;
  font-family: Helvetica Neue;
  border: none;
`;

const NewPost: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    await axios.post("https://simple-blog-api.crew.red/posts", {
      title,
      body: message,
    });
    Router.push("/");
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
  <>
      <PostContainer>
        <Title>Write your post</Title>
        <Text>Don't forget to add title</Text>
      </PostContainer>
      <PostForm onSubmit={handleSubmit}>
        <Input
          required={true}
          placeholder="Your title"
          value={title}
          onChange={handleTitle}
        ></Input>
        <InputText
          required={true}
          placeholder="Your text"
          value={message}
          onChange={handleMessage}
        ></InputText>
        <SubmitButton>Add</SubmitButton>
      </PostForm>
    </>
  );
};

export default NewPost;
