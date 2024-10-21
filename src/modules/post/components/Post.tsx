"use client";

import { useState } from "react";

import Hero from "@/common/components/Hero";

import PostList from "./PostList";

const Post = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Hero onSearch={(value) => setSearchValue(value)} />

      <PostList searchValue={searchValue} />
    </>
  );
};

export default Post;
