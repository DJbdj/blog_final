import { useState } from "react";
import { toast } from "sonner";
import { usePreviousLocation } from "@/hooks/use-previous-location";
import { authClient } from "@/lib/auth/auth.client";

export interface UseSocialLoginOptions {
  redirectTo?: string;
}

export function useSocialLogin(options: UseSocialLoginOptions = {}) {
  const { redirectTo } = options;

  const [isLoading, setIsLoading] = useState(false);
  const previousLocation = usePreviousLocation();

  const handleGithubLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const { error } = await authClient.signIn.social({
      provider: "github",
      errorCallbackURL: `${window.location.origin}/login`,
      callbackURL: `${window.location.origin}${redirectTo ?? previousLocation}`,
    });

    if (error) {
      toast.error("第三方登录失败", { description: error.message });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    handleGithubLogin,
  };
}

export type UseSocialLoginReturn = ReturnType<typeof useSocialLogin>;
