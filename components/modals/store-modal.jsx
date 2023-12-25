"use client";

import { useSelector } from "react-redux";
import Modal from "@/components/ui/modal";
import { onClose } from "@/redux/features/modalSlice";

export const StoreModal = () => {
  const { isOpen } = useSelector((state) => state.modalReducer);

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories."
      isOpen={isOpen}
      onClose={onClose}
    >
      Future Create Store Form
    </Modal>
  );
};
