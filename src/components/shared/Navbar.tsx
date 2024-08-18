"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { LuBuilding2, LuPlaneTakeoff } from "react-icons/lu";
import { LiaCcVisa } from "react-icons/lia";
import { IoMdArrowDropdown } from "react-icons/io";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Navlink } from "@/components";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 border-b bg-background py-2 shadow-md">
      <Container className="grid grid-cols-12 grid-rows-2 place-items-center gap-y-4 sm:grid-rows-1">
        {/* -------- LOGO ----------- */}
        <div className="col-start-1 col-end-5 row-start-1 row-end-1 h-auto w-auto sm:col-end-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="online savaari"
              width={102}
              height={53}
            />
          </Link>
        </div>
        {/* -------- NAV LINKS ----------- */}
        <div className="col-start-1 -col-end-1 row-start-2 row-end-2 flex items-center justify-center gap-x-14 sm:col-start-2 sm:col-end-11 sm:row-start-1 sm:row-end-1">
          <Navlink
            pathname={pathname}
            label="Flights"
            href="/"
            icon={LuPlaneTakeoff}
          />
          <Navlink
            pathname={pathname}
            label="Hotels"
            href="/hotels"
            icon={LuBuilding2}
          />
          <Navlink
            pathname={pathname}
            label="Visa"
            href="/visa"
            icon={LiaCcVisa}
          />
        </div>
        {/* -------- DROPDOWNS ----------- */}
        <div className="col-start-7 -col-end-1 row-start-1 row-end-1 flex items-center justify-end gap-x-4 sm:col-start-11 sm:-col-end-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex cursor-pointer items-center gap-x-1 text-sm outline-none hover:text-clr-red">
              Account <IoMdArrowDropdown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="group cursor-pointer">
                <Link
                  href="/login"
                  className="block h-full w-full group-hover:text-clr-dropdown"
                >
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="group cursor-pointer">
                <Link
                  href="/sign-up"
                  className="block h-full w-full group-hover:text-clr-dropdown"
                >
                  Sign up
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>For Business</DropdownMenuItem>
              <DropdownMenuItem>For Agents</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex cursor-pointer items-center gap-x-1 text-sm outline-none hover:text-clr-red">
              Support <IoMdArrowDropdown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="group cursor-pointer">
                <Link
                  href="/contact-us"
                  className="block h-full w-full group-hover:text-clr-dropdown"
                >
                  Call Us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="group cursor-pointer">
                <Link
                  href="/mail-us"
                  className="block h-full w-full group-hover:text-clr-dropdown"
                >
                  Mail Us
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
