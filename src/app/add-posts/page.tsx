import PageHeader from "@/common/components/PageHeader";
import PageWrapper from "@/common/components/PageWrapper";
import Wrapper from "@/common/components/Wrapper";
import AddPostForm from "@/modules/post/components/AddPostForm";

const AddPostPage = () => {
  return (
    <Wrapper>
      <PageHeader title="Add Post" isBackButton />
      <PageWrapper>
        <AddPostForm />
      </PageWrapper>
    </Wrapper>
  );
};

export default AddPostPage;
