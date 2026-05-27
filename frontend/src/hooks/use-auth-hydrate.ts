import { useEffect } from "react";
import { useAuthStore } from "../state/auth-store";

export const useAuthHydrate = (): void => {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);
};
