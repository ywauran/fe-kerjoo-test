"use client";

import { useRouter } from "next/navigation";
import React from "react";

import SearchInput from "./SearchInput";
import { HiPlus } from "react-icons/hi";

type HeroProps = {
  onSearch: (value: string) => void;
};

const Hero = ({ onSearch }: HeroProps) => {
  const router = useRouter();

  const handleSearchChange = (value: string) => {
    onSearch(value);
  };

  const handleNavigate = () => {
    router.push("/add-posts");
  };

  return (
    <div className="px-8 pt-8 pb-16 space-y-6 bg-gradient-to-br from-pink-200 via-purple-100 to-indigo-100">
      <div className="space-y-3">
        <div className="text-neutral-800">Hello</div>
        <h1 className="text-purple-950 text-4xl leading-snug font-semibold">
          Let's find your <br />
          Post!
        </h1>
      </div>
      <div className="flex items-center space-x-4 w-full">
        <SearchInput
          placeholder="Search post..."
          onChange={handleSearchChange}
        />
        <button
          onClick={handleNavigate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          <HiPlus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
