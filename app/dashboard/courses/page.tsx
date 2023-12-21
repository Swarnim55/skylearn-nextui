"use client";
import { useRouter } from "next/navigation";
import { getApiRoute, getPageRoute } from "@/constants";
import BaseListingView from "@/packages/base/BaseListingView";
import React from "react";

const tableSchema = [
  { key: "title", label: "Assignment Title", type: "text" },
  { key: "details", label: "Details", type: "text" },
  { key: "isActive", label: "Publish", type: "switch" },
];

const CoursesListPage = () => {
  const router = useRouter();
  const handleActionClick = (id: any, action: string) => {
    switch (action) {
      case "view":
        const pageRoute = getPageRoute("COURSES-DETAIL");
        const detailRoute = pageRoute.replace(":courseIdx", id);
        router.push(detailRoute);
      case "edit":
        console.log("Delete Clicked", id);
        break;
      default:
        break;
    }
  };
  return (
    <BaseListingView
      title="COURSES"
      endpoint={getApiRoute("COURSES")}
      tableSchema={tableSchema}
      initialVisibleColumns={["title", "details", "isActive"]}
      filterKey="title"
      handleCreate={() => router.push(getPageRoute("COURSES-CREATE"))}
      onActionClick={handleActionClick}
    />
  );
};

export default CoursesListPage;
