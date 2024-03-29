

import { FamilyProvider } from "@/context/Families.provider";

export const Providers = ({ children }) => {
  return (
    <FamilyProvider>
      {children}
    </FamilyProvider>
  );
};
