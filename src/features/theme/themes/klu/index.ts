import "./styles/index.css";

// Pages
import { HomePage, HomePageSkeleton } from "./pages/home";
import { PostsPage, PostsPageSkeleton } from "./pages/posts";
import { PostPage, PostPageSkeleton } from "./pages/post";
import { FriendLinksPage, FriendLinksPageSkeleton } from "./pages/friend-links";
import { SearchPage, SearchPageSkeleton } from "./pages/search";
import { SubmitFriendLinkPage } from "./pages/submit-friend-link";

// Auth Pages
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";
import { ForgotPasswordPage } from "./pages/auth/forgot-password";
import { ResetPasswordPage } from "./pages/auth/reset-password";
import { VerifyEmailPage } from "./pages/auth/verify-email";

// User Pages
import { ProfilePage } from "./pages/user/profile";

// Layouts
import { PublicLayout } from "./layouts/public-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { UserLayout } from "./layouts/user-layout";

// Components
import { Toaster } from "./components/toaster";

// Config
import { config } from "./config";

import type { ThemeComponents } from "@/features/theme/contract/components";

/**
 * Klu Theme - A dark minimalist blog theme
 * Features:
 * - Dark color scheme with accent highlights
 * - Card-based layout
 * - Left sidebar navigation
 * - Clean typography
 */
export default {
  config,
  PublicLayout,
  AuthLayout,
  UserLayout,
  HomePage,
  HomePageSkeleton,
  PostsPage,
  PostsPageSkeleton,
  PostPage,
  PostPageSkeleton,
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
