import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Navbar() {
  return (
    <div className="bg-white w-full fixed top-0">
      <div className="bar">
        <Logo />
        <Button variant="outline">Login</Button>
      </div>
    </div>
  );
}
