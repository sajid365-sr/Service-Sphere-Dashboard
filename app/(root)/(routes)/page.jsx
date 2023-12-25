"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { onOpen } from "@/redux/features/modalSlice";

const SetupPage = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modalReducer.isOpen);

  useEffect(() => {
    if (!isOpen) {
      dispatch(onOpen());
    }
  }, [isOpen]);

  return null;
};

export default SetupPage;
