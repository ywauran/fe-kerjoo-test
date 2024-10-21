import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addPost as apiAddPost,
  getPostDetail,
  getPostList,
} from "@/services/post";

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
  selectedPost?: Post; // Menambahkan properti untuk menyimpan detail post yang dipilih
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  message: "",
};

// Fungsi untuk mengambil daftar post
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await getPostList();
  return response.data;
});

// Fungsi untuk mengambil detail post
export const fetchPostDetail = createAsyncThunk(
  "posts/fetchPostDetail",
  async (id: number) => {
    const response = await getPostDetail(id.toString());
    return response.data;
  }
);

// Fungsi untuk menambahkan post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post: { title: string; body: string }) => {
    const response = await apiAddPost(post.title, post.body);
    return response.data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
        state.message = ""; // Menghapus pesan ketika berhasil
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
        state.message = "Failed to fetch posts";
      });

    builder
      .addCase(fetchPostDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPostDetail.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.status = "succeeded";
          state.selectedPost = action.payload;
          const index = state.posts.findIndex(
            (post) => post.id === action.payload.id
          );
          if (index !== -1) {
            state.posts[index] = action.payload;
          } else {
            state.posts.push(action.payload);
          }
          state.message = "";
        }
      )
      .addCase(fetchPostDetail.rejected, (state) => {
        state.status = "failed";
        state.message = "Failed to fetch post detail";
      });

    builder
      .addCase(addPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPost.fulfilled, (state) => {
        state.status = "succeeded";
        state.message = "Post added successfully!";
      })
      .addCase(addPost.rejected, (state) => {
        state.status = "failed";
        state.message = "Failed to add post";
      });
  },
});

export const { clearMessage } = postSlice.actions;

export default postSlice.reducer;
