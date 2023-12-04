import { usePathname } from "next/navigation";

export function usePathTitle() {
  const pathname = usePathname();
  const lowercaseTitle = pathname.split("/").slice(-1)[0];
  const title =
    lowercaseTitle.charAt(0).toUpperCase() + lowercaseTitle.slice(1);

  return { title };
}
