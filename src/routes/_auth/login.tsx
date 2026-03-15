import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import theme from "@theme";
import { useLoginForm, useSocialLogin } from "@/features/auth/hooks";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "登录",
      },
    ],
  }),
});

function RouteComponent() {
  const { isEmailConfigured } = useRouteContext({ from: "/_auth" });

  const loginForm = useLoginForm();
  const socialLogin = useSocialLogin();

  return (
    <theme.LoginPage
      isEmailConfigured={isEmailConfigured}
      loginForm={loginForm}
      socialLogin={socialLogin}
    />
  );
}
