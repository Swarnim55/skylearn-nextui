"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ReactDOM } from "react";
import { z } from "zod";
import { PORTAL_BASE_URL, getApiRoute } from "../../../../constants";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@nextui-org/input";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiRoutes } from "@/constants/apiRoutes";
import { pageRoutes } from "@/constants/pageRoutes";
import { map } from "lodash";
import { selectFieldDataFetcher } from "@/utils/fetch";

interface CourseFormDataType {
  title: string;
  departmentPid: string;
  semesterPid: string;
  details: string;
  features: string;
  isActive: boolean;
  creditHour: string;
}

const validationSchema = z.object({
  title: z
    .string()
    .min(3, "Provide atleast 3 Characters!")
    .max(50, "Too Long!"),
    details: z.string(),
    creditHour:z.string(),
    features:z.string(),
  type: z.string().min(3, "Provide atleast 3 Characters!").max(50, "Too Long!"),
  isActive: z.boolean(),
});

const CourseCreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: sessionData } = useSession();
  const [deptOpt, setDeptOpt] = useState<string[]>([]);
  const [semesterOpt, setSemesterOpt] = useState<string[]>([]);
  const { jwtToken } = sessionData?.user?.data || {};
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (jwtToken) {
        const resdata = await selectFieldDataFetcher(
          getApiRoute("DEPARTMENTS"),
          "departmentName",
          jwtToken
        );
        setDeptOpt(resdata);

        const ressemesterData = await selectFieldDataFetcher(
          getApiRoute("SEMESTER"),
          "name",
          jwtToken
        );
        setSemesterOpt(ressemesterData);
      }
    };

    fetchData();
  }, [jwtToken]);

  const onSubmit: SubmitHandler<CourseFormDataType> = async (data) => {
    try {
      var path = getApiRoute("COURSES");
      const response = await axios({
        method: "POST",
        url: `${PORTAL_BASE_URL}${path}`,
        data: data,
        headers: {
          Authorization: jwtToken,
        },
      });
      if (response.status_code === 200) {
        router.push(pageRoutes.STAFF);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  return (   
<Form
fieldSchema={[
  {
    key: "title",
    label: "Title",
    placeholder: "Enter Title",
    type: "text",
    required: true,
  },
  {
    key: "details",
    label: "Details",
    placeholder: "Enter details",
    type: "textarea",
    required: true,
  },
  {
    key: "features",
    label: "Features",
    placeholder: "Enter features",
    type: "text",
    required: true,
  },
  {
    key: "semesterPid",
    label: "Semester",
    placeholder: "Select semester",
    type: "select",
    required: true,
  },
  {
    {
      key: "departmentId",
      label: "Department",
      placeholder: "Select semester",
      type: "text",
      required: true,
    },
    {
  {
    key: "isActive",
    label: "Publish",
    type: "switch",
    placeholder: "Publish this course!",
  },
]}
endpoint={getApiRoute("COURSES")}
onSubmit={handleSubmit}
validationSchema={validationSchema}
/>
  );
};

export default CourseCreatePage;
