import "./styles/index.css";

// Layouts
import { PublicLayout } from "./layouts/public-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { UserLayout } from "./layouts/user-layout";

// Pages
import { HomePage, HomePageSkeleton } from "./pages/home/page";
import { PostsPage, PostsPageSkeleton } from "./pages/posts/page";
import { PostPage, PostPageSkeleton } from "./pages/post/page";
import { FriendLinksPage, FriendLinksPageSkeleton } from "./pages/friend-links/page";
import { SearchPage } from "./pages/search/page";
import { SubmitFriendLinkPage } from "./pages/submit-friend-link/page";
import { LoginPage } from "./pages/auth/login/page";
import { RegisterPage } from "./pages/auth/register/page";
import { ForgotPasswordPage } from "./pages/auth/forgot-password/page";
import { ResetPasswordPage } from "./pages/auth/reset-password/page";
import { VerifyEmailPage } from "./pages/auth/verify-email/page";
import { ProfilePage } from "./pages/user/profile/page";

// Components
import { config } from "./config";
import { Toaster } from "@/components/ui/toaster";

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
  SubmitFriendLinkPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  ProfilePage,
  Toaster,
} satisfies ThemeComponents;