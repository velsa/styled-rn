import type { ComponentType, ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { Dimensions } from "react-native";
import {
  useSafeAreaInsets
} from "react-native-safe-area-context";
import { Theme } from "styled-rn";
import { StyledRNContext, ThemeProviderProps } from "./types";

export const StyledRNThemeContext = createContext(null) as React.Context<StyledRNContext | null>;

export const useTheme = (): Theme => {
  const ctx = useContext(StyledRNThemeContext);
  if (!ctx?.theme) throw new Error("missing theme context, wrap your app in a ThemeProvider");
  return ctx.theme;
};

export const withTheme = <P extends { children?: ReactNode }>(
  Component: ComponentType<P & { theme: Theme }>
): ComponentType<P> => {
  const ComponentWithTheme = (props: P) => {
    const theme = useTheme();
    return (
      <Component {...props} theme={theme}>
        {props.children || null}
      </Component>
    );
  };
  ComponentWithTheme.displayName = `WithTheme(${Component.displayName || Component.name})`;
  return ComponentWithTheme;
};

export const ThemeProvider = ({
  theme,
  children,
  root,
  useDebugStyles = false,
}: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>({ ...theme });
  const insets = useSafeAreaInsets();
  const window = Dimensions.get("window");

  const ctx = {
    insets,
    window,
  };

  return (
    <StyledRNThemeContext.Provider
      value={{
        theme: currentTheme,
        setTheme: (theme) => setCurrentTheme({ ...theme }),
        ctx,
        root,
        useDebugStyles,
      }}
    >
      {children}
    </StyledRNThemeContext.Provider>
  );
};
