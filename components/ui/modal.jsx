"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";

const Modal = ({ title, description, isOpen, onClose, children }) => {
  const dispatch = useDispatch();

  const onChange = (open) => {
    if (!open) {
      dispatch(onClose());
    }
  };
  console.log(isOpen);
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
