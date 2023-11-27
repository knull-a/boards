import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image src="/logo.svg" alt="Logo" height={30} width={30} />
      <span className="ml-1 font-bold italic text-lg">Boards.</span>
    </Link>
  );
}
