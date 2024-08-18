"use client";
import handleLogin from "@/actions/auth/handleLogin";
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
import useAuth from "@/hooks/useAuth";
import useReactQuery from "@/hooks/useReactQuery";
import {
  loginFormSchema,
  TLoginFormSchema,
} from "@/schemas/auth/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "sonner";

interface Props {}

const LoginForm: FC<Props> = ({}) => {
  const router = useRouter()
  const { setAuth } = useAuth();
  const { useAppMutation } = useReactQuery();
  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const mutation = useAppMutation({
    url: "/accounts/login/",
    mutationKey: "login",
  });
  async function onSubmit(values: TLoginFormSchema) {
    const loginPayload = {
      account_email: values.username,
      account_password: values.password,
    };
    mutation.mutate(loginPayload, {
      async onSuccess(data: any) {
        const payload = {
          account_email: data.account_email,
          role: data.role,
          access_token: data.access,
          refresh_token: data.refresh,
        };
        await handleLogin(payload);
        setAuth(payload);
        router.push("/")
        toast.success("Login successfull");
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
