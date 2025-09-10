// types/expo-router.d.ts
import "expo-router";

declare module "expo-router" {
  export type Href =
    | "/(tabs)"
    | "/(auth)"
    | "/components/SignOutButton"
    | "/../hooks/useSocialAuth"
    | Href; // keep the existing ones
}
