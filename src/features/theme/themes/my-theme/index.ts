/**
 * `my-theme` is a minimal example theme that reuses the default implementation
 * while allowing you to override individual pieces.
 *
 * In a real theme you would replace most of the imports below with your own
 * components (HomePage, layouts, etc.).  TypeScript will error if the contract
 * defined in `ThemeComponents` is not satisfied.
 */

import defaultTheme from "../default";
import { config as defaultConfig } from "../default";
import type { ThemeComponents } from "@/features/theme/contract/components";
import { config as myConfig } from "./config";

// you can customize the config object or simply reuse the default
export const config = myConfig || defaultConfig;

export default {
  // spread the default theme so we only need to override what changes
  ...defaultTheme,
  config,
  // example of overriding a single component:
  // HomePage: MyHomePage,
} satisfies ThemeComponents;
