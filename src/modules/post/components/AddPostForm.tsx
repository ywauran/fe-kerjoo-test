"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import { AppDispatch, RootState } from "@/store";
import { addPost, clearMessage } from "@/store/features/post/postSlice";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
});

type FormData = z.infer<typeof postSchema>;

const AddPostForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status, message } = useSelector((state: RootState) => state.post);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await dispatch(addPost(data));
    reset();

    router.push("/");
  };

  useEffect(() => {
    if (status === "succeeded" || status === "failed") {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center rounded-full bg-white">
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="py-4 px-3 rounded-md bg-transparent focus:outline-none w-full"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div className="flex flex-col items-center rounded-full bg-white">
          <textarea
            placeholder="Body"
            {...register("body")}
            className="py-4 px-3 rounded-md bg-transparent focus:outline-none w-full"
          />
          {errors.body && (
            <span className="text-red-500">{errors.body.message}</span>
          )}
        </div>
        {message && (
          <div
            className={`mt-y text-center ${
              status === "failed" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
