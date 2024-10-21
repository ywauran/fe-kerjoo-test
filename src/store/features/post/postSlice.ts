import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPostDetail, getPostList } from "@/services/post";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostState {
  posts: Post[];
  status: "idle" | "loading" | "failed" | "succeeded";
  message: string;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  message: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await getPostList();
  return response.data;
});

export const fetchPostDetail = createAsyncThunk(
  "posts/fetchPostDetail",
  async (id: number) => {
    const response = await getPostDetail(id.toString());
    return response.data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
      }
    );
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = "failed";
      state.message = "Failed to fetch posts";
    });

    builder.addCase(fetchPostDetail.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchPostDetail.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.status = "succeeded";
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        } else {
          state.posts.push(action.payload);
        }
      }
    );
    builder.addCase(fetchPostDetail.rejected, (state) => {
      state.status = "failed";
      state.message = "Failed to fetch post detail";
    });
  },
});

export default postSlice.reducer;
