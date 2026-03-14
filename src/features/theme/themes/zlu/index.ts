import { HomePage, HomePageSkeleton } from "./pages/home";
import { PostsPage, PostsPageSkeleton } from "./pages/posts";
import { PostPage, PostPageSkeleton } from "./pages/post";
import { PublicLayout } from "./layouts/public-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { UserLayout } from "./layouts/user-layout";
import { FriendLinksPage, FriendLinksPageSkeleton } from "./pages/friend-links";
import { SearchPage, SearchPageSkeleton } from "./pages/search";
import { SubmitFriendLinkPage } from "./pages/submit-friend-link";
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";
import { ForgotPasswordPage } from "./pages/auth/forgot-password";
import { ResetPasswordPage } from "./pages/auth/reset-password";
import { VerifyEmailPage } from "./pages/auth/verify-email";
import { ProfilePage } from "./pages/user/profile";
import { config } from "./config";
import type { ThemeComponents } from "@/features/theme/contract/components";
import Toaster from "@/components/ui/toaster";

/**
 * ZLu Theme - Dark minimalist blog theme inspired by blog.zhilu.site
 */
export default {
  config,
  HomePage,
  HomePageSkeleton,
  PostsPage,
  PostsPageSkeleton,
  PostPage,
  PostPageSkeleton,
  PublicLayout,
  AuthLayout,
  UserLayout,
  FriendLinksPage,
  FriendLinksPageSkeleton,
  SearchPage,
  SearchPageSkeleton,
  SubmitFriendLinkPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  ProfilePage,
  Toaster,
} satisfies ThemeComponents;
