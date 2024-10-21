"use client";

import PageHeader from "@/common/components/PageHeader";
import PageWrapper from "@/common/components/PageWrapper";

const PostDetail = ({ id }: { id: string }) => {
  return (
    <>
      <PageHeader title="Detail Post" isBackButton />
      <PageWrapper>
        <div className="py-12 text-lg text-center text-neutral-500">
          Loading...
        </div>
      </PageWrapper>
    </>
  );
};

export default PostDetail;
