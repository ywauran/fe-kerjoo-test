"use client";

import Toast from "./Toast";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toast />
      <main>{children}</main>
    </>
  );
};

export default Wrapper;
