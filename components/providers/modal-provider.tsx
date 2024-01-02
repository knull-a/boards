"use client";

import CardModal from "@/components/modals/card-modal";
import { useAppSelector } from "@/lib/redux/store";

export const ModalProvider = () => {
  const isOpen = useAppSelector((state) => state.modalSlice.value.isOpen);

  return <>{isOpen && <CardModal />}</>;
};
