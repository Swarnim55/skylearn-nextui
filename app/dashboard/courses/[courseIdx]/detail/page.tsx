import DetailLayout from "@/app/components/layout/detail";
import { getApiRoute, getPageRoute } from "@/constants";
import React from "react";

const CourseDetailPage = ({ params }: { params: { courseIdx: string } }) => {
  return (
    <DetailLayout
      endpoint={getApiRoute("COURSES")}
      detailId={params.courseIdx}
      editRoute={getPageRoute("COURSES-EDIT").replace(
        ":courseIdx",
        params.courseIdx
      )}
      titleKey="title"
      omittedKeys={["pid", "id"]}
    />
  );
};

export default CourseDetailPage;
