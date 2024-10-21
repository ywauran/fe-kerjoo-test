import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store";
import { fetchPosts } from "@/store/features/post/postSlice";

import PostCard from "./PostCard";

const PostList = ({ searchValue }: { searchValue: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, status } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="p-6 -mt-8 pb-28 rounded-t-3xl min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {status === "loading" ? (
        <div className="py-12 text-lg text-center text-neutral-500">
          Loading...
        </div>
      ) : (
        <div>
          {filteredPosts.length > 0 ? (
            <div className="flex flex-col gap-y-4">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  userId={post.userId}
                  body={post.body}
                  title={post.title}
                  id={post.id}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-500">
              No posts found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostList;
