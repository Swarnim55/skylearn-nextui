"use client";
import { getApiRoute, getPageRoute } from "@/constants";
import BaseListingView from "@/packages/base/BaseListingView";
import Form from "@/packages/ui/form/form";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const tableSchema = [
  { key: "departmentName", label: "Department Name", type: "text" },
  { key: "type", label: "Type", type: "text" },

  {
    key: "isActive",
    label: "Publish",
    type: "switch",
  },
];
const validationSchema = z.object({
  departmentName: z
    .string()
    .min(3, "Provide atleast 3 Characters!")
    .max(50, "Too Long!"),
  descriptions: z.string(),
  type: z.string().min(3, "Provide atleast 3 Characters!").max(50, "Too Long!"),
  isActive: z.boolean(),
});
const DepartmentListPage = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const router = useRouter();
  const handleCreate = () => {
    onOpen();
  };
  const handleSubmit = (data: any) => {
    console.log(data);
  };
  const handleActionClick = (id: any, action: string) => {
    switch (action) {
      case "view":
        const pageRoute = getPageRoute("DEPARTMENTS-DETAIL");
        const detailRoute = pageRoute.replace(":departmentIdx", id);
        router.push(detailRoute);
      case "edit":
        const editPageRoute = getPageRoute("DEPARTMENTS-EDIT");
        const editRoute = editPageRoute.replace(":departmentIdx", id);
        router.push(editRoute);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <BaseListingView
        title="Departments"
        endpoint={getApiRoute("DEPARTMENTS")}
        tableSchema={tableSchema}
        initialVisibleColumns={["departmentName", "type", "isActive"]}
        filterKey="searchText"
        handleCreate={handleCreate}
        onActionClick={handleActionClick}
      />
      {/* Render the modal here */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          backdrop="opaque"
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add A New Department
                </ModalHeader>
                <ModalBody>
                  <Form
                    fieldSchema={[
                      {
                        key: "departmentName",
                        label: "Department Name",
                        placeholder: "Enter Department Name",
                        type: "text",
                        required: true,
                      },
                      {
                        key: "type",
                        label: "Type",
                        placeholder: "Enter Type",
                        type: "text",
                        required: true,
                      },
                      {
                        key: "descriptions",
                        label: "Description",
                        placeholder: "Description for the Department",
                        type: "text",
                        required: true,
                      },
                      {
                        key: "isActive",
                        label: "Publish",
                        type: "switch",
                        placeholder: "Publish this Department!",
                      },
                    ]}
                    endpoint={getApiRoute("DEPARTMENTS")}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default DepartmentListPage;
