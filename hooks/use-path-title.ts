import { usePathname } from "next/navigation";
import { useCapitalize } from "./use-capitalize";

export function usePathTitle() {
  const pathname = usePathname();
  const lowercaseTitle = pathname.split("/").slice(-1)[0];
  const title = useCapitalize(lowercaseTitle);

  return { title };
}
