"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { getApiRoute, getPageRoute } from "../../../constants";
import BaseListingView from "../../../packages/base/BaseListingView";

const tableSchema = [
  { key: "fullName", label: "FullName", type: "text" },
  { key: "position", label: "Position", type: "text" },
  { key: "email", label: "E-mail", type: "text" },
  { key: "departmentName", label: "Department Name", type: "text" },
  { key: "isActive", label: "Publish", type: "switch" },
];

const StudentsListPage = () => {
  const router = useRouter();
  const handleActionClick = (id: any, action: string) => {
    switch (action) {
      case "view":
        const pageRoute = getPageRoute("STAFF-DETAIL");
        const detailRoute = pageRoute.replace(":staffIdx", id);
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
      title="Staff"
      endpoint={getApiRoute("STAFF")}
      tableSchema={tableSchema}
      initialVisibleColumns={["name", "isActive"]}
      filterKey="searchText"
      handleCreate={() => router.push(getPageRoute("STAFF-CREATE"))}
      onActionClick={handleActionClick}
    />
  );
};

export default StudentsListPage;
