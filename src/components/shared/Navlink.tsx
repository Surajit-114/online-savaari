"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { useMemo, type FC } from "react";
import { IconType } from "react-icons/lib";

interface Props extends LinkProps {
  pathname: string;
  className?: string;
  label: string;
  href: string;
  icon: IconType;
}

const Navlink: FC<Props> = ({
  pathname,
  className,
  label,
  href,
  icon: Icon,
  ...props
}) => {
  const isActive = useMemo(() => pathname === href, [pathname, href]);
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        `inline-flex flex-col items-center gap-y-1 text-sm transition duration-100 ease-in-out hover:text-clr-red`,
        isActive && `text-clr-red`,
      )}
    >
      <span className="text-3xl">
        <Icon />
      </span>
      {label}
    </Link>
  );
};

export default Navlink;
