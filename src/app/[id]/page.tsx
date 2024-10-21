import Wrapper from "@/common/components/Wrapper";
import PostDetail from "@/modules/post/components/PostDetail";

const PostDetailPage = ({ params }: { params: { id: string } }) => {
  const postId = params?.id;

  return (
    <Wrapper>
      <PostDetail id={postId} />
      hello
    </Wrapper>
  );
};

export default PostDetailPage;
