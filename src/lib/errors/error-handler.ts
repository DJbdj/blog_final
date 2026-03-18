import { toast } from "sonner";
import { parseRequestError } from "./request-errors";

export function handleServerError(error: unknown): void {
  const parsed = parseRequestError(error);
  const { code } = parsed;

  switch (code) {
    case "UNAUTHENTICATED": {
      toast.error("未授权", {
        description: "请先登录",
      });
      break;
    }
    case "PERMISSION_DENIED": {
      toast.error("权限不足", {
        description: "您没有执行此操作的权限",
      });
      break;
    }
    case "RATE_LIMITED": {
      const seconds = Math.max(1, Math.ceil(parsed.retryAfterMs / 1000));
      toast.warning("请求过于频繁", {
        description: `请稍后再试 (${seconds}秒)`,
      });
      break;
    }
    case "TURNSTILE_FAILED": {
      const description =
        parsed.detail === "MISSING_TOKEN"
          ? "缺少验证码令牌"
          : "验证码验证失败";

      toast.error("验证码错误", {
        description,
      });
      break;
    }
    case "UNKNOWN": {
      toast.error("发生错误", {
        description: parsed.message || "请稍后再试",
      });
      break;
    }
    default:
      code satisfies never;
  }
}
