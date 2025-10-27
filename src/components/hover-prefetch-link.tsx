"use client";

import type { LinkProps } from "next/link";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const HoverPrefetchLink = <RouteType = string>({
  children,
  href,
  ...props
}: LinkProps<RouteType>) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      {...props}
      prefetch={false}
      onMouseEnter={() => {
        if (typeof href === "string") {
          router.prefetch(href);
        }
      }}
    >
      {children}
    </Link>
  );
};
