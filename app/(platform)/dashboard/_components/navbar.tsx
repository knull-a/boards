import { Plus } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="">
          <Logo />
        </div>
        <Button size="sm" className="rounded-sm h-auto  py-1.5 px-2">
          Create
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
}
