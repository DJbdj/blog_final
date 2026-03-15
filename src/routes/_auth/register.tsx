import {
  createFileRoute,
  redirect,
  useRouteContext,
} from "@tanstack/react-router";
import theme from "@theme";
import { useRegisterForm } from "@/features/auth/hooks";

export const Route = createFileRoute("/_auth/register")({
  beforeLoad: ({ context }) => {
    if (!context.isEmailConfigured) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "注册",
      },
    ],
  }),
});

function RouteComponent() {
  const { isEmailConfigured } = useRouteContext({ from: "/_auth" });

  const registerForm = useRegisterForm({
    isEmailConfigured,
  });

  return (
    <theme.RegisterPage
      isEmailConfigured={isEmailConfigured}
      registerForm={registerForm}
    />
  );
}
