import { createContext, useContext } from 'react';

type FeatureContextValue = string | undefined;

const FeatureContext = createContext<FeatureContextValue>(undefined);

export const useFeature = (): string | undefined => {
  const value = useContext(FeatureContext);
  return typeof value === 'string' ? value : undefined;
};

type FeatureProviderProps = {
  children: React.ReactNode;
  value: FeatureContextValue;
};

export const FeatureProvider = ({ value, children }: FeatureProviderProps) => {
  return (
    <FeatureContext.Provider value={value}>{children}</FeatureContext.Provider>
  );
};
