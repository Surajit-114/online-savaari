import { Container } from "@/components";
import LoginForm from "./_forms/LoginForm";
import Image from "next/image";
import { LuCalendarCheck, LuClipboardEdit, LuWallet } from "react-icons/lu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <Container className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex max-w-5xl flex-wrap-reverse rounded bg-background px-4 py-8 shadow-md">
        <div className="basis-full space-y-4 md:basis-1/2">
          <Link href="/" prefetch={false}>
            <Image
              src="/logo.png"
              alt="online savaari logo"
              width={153}
              height={53}
            />
          </Link>
          <div className="overflow-hidden rounded-md">
            <h3 className="bg-yellow-200 p-4 font-semibold">For More Log In</h3>
            <ul className="space-y-4 bg-yellow-100 p-4">
              <li className="inline-flex gap-x-2">
                <span>
                  <LuCalendarCheck className="h-6 w-6 text-clr-red/80" />
                </span>
                <span>View / Cancel / Reschedule bookings</span>
              </li>
              <li className="inline-flex gap-x-2">
                <span>
                  <LuWallet className="h-6 w-6 text-clr-red/80" />
                </span>
                <span>
                  Check booking history, manage cancellations & print e-Tickets
                </span>
              </li>
              <li className="inline-flex gap-x-2">
                <span>
                  <LuClipboardEdit className="h-6 w-6 text-clr-red/80" />
                </span>
                <span>
                  Book faster with Pre-Filled Forms, saved Travellers & Saved
                  Cards
                </span>
              </li>
            </ul>
          </div>
          <Button
            className="bg-blue-500 text-base hover:bg-blue-500/95"
            type="submit"
            asChild
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
        <div className="basis-full p-4 md:basis-1/2">
          <div>
            <h3 className="text-2xl font-semibold text-primary">
              Welcome to Online Savaari!
            </h3>
            <h5 className="text-primary">
              Enter your login details to continue
            </h5>
          </div>
          <LoginForm />
        </div>
      </div>
    </Container>
  );
};

export default Login;
