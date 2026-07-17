import React from "react";
import LeftPage from "@/components/LeftPage";
import RightPage from "@/components/RightPage";
import { SubAccountList } from "@/features/subaccounts/components/SubAccountList";
import { CategoryCreate } from "@/features/categories/components/CategoryCreate";

function Book() {
  return (
    <div className="flex">
      <SubAccountList />
      <div className="bg-white w-200 border-4 h-130 flex">
        <LeftPage />
        <RightPage />
      </div>
    </div>
  );
}

export default Book;
