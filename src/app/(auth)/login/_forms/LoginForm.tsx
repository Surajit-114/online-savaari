"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/auth/useAuth";
import useReactQuery from "@/hooks/useReactQuery";
import {
  loginFormSchema,
  TLoginFormSchema,
} from "@/schemas/auth/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "sonner";
import { setCookie } from "@/lib/authCookies";

const LoginForm = () => {
  const router = useRouter();
  const { setAuth } = useAuth();
  const { usePublicMutation } = useReactQuery();
  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const mutation = usePublicMutation({
    url: "/accounts/login/",
    mutationKey: "login",
  });
  async function onSubmit(values: TLoginFormSchema) {
    const loginData = {
      account_email: values.username,
      account_password: values.password,
    };
    mutation.mutate(loginData, {
      async onSuccess(data: any) {
        const payload = {
          account_email: data.account_email,
          role: data.role,
          access_token: data.access,
        };
        setCookie({ name: "refresh_token", value: data.refresh });
        setAuth(payload);
        toast.success("Login successfull");
        router.push("/");
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username / Email / Mobile No.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username / Email / Mobile No."
                  className="focus-visible:ring-sky-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  className="focus-visible:ring-sky-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-blue-500 text-base hover:bg-blue-500/95"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <ImSpinner8 className="h-5 w-5 animate-spin" />
          ) : (
            <span>Login</span>
          )}
        </Button>
        <Link
          href="/reset-password"
          prefetch={false}
          className="inline-block text-sm text-blue-500 hover:text-blue-500/95"
        >
          Forgot Password
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
