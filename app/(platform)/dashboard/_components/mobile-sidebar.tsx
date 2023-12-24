"use client";

import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onOpen, onClose } from "@/lib/redux/slices/sidebarSlice";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SheetContent, Sheet } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

export default function MobileSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [isMounted, setMounted] = useState(false);

  const isOpen = useAppSelector((state) => state.sidebarSlice.value.isOpen);

  const open = () => dispatch(onOpen());
  const close = () => dispatch(onClose());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch(onClose());
  }, [pathname, dispatch]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        onClick={open}
        className="block md:hidden"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={close}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
}
