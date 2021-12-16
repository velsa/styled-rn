import type { ComponentType, ReactNode } from 'react';
import {
  Dimensions,
  FlatListProps,
  ScrollViewProps,
  SectionListProps,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import { ImageProps, TextProps } from 'react-native-elements';
import React, { createContext, useContext, useState } from 'react';

import { DebugStylesProp } from '.';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultStyledTheme {
  // Viewport (window) width and height, provided by ThemeProvider
  //   vw?: number;
  //   vh?: number;
}

/**
 * This interface can be augmented by users to add types to `styled-rn` default theme
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Theme extends DefaultStyledTheme {}

export interface RootStyles {
  View?: ViewProps['style'] | undefined;
  SafeAreaView?: SafeAreaViewProps['style'] | undefined;
  Text?: TextProps['style'] | undefined;
  TextInput?: TextInputProps['style'] | undefined;
  Image?: ImageProps['style'] | undefined;
  FlatList?: FlatListProps<unknown>['style'] | undefined;
  ScrollView?: ScrollViewProps['style'] | undefined;
  SectionList?: SectionListProps<unknown, unknown>['style'] | undefined;
  TouchableOpacity?: TouchableOpacityProps['style'] | undefined;
}

interface StyledThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  rootStyles?: RootStyles;
  rootFont?: string;
  rootBackgroundColor?: string;
  useDebugStyles?: DebugStylesProp | boolean;
}

export const ThemeContext = createContext(
  null,
) as React.Context<StyledThemeContext | null>;

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);
  if (!ctx?.theme)
    throw new Error('missing theme context, wrap your app in a ThemeProvider');
  return ctx.theme;
};

export const withTheme = <P extends { children?: ReactNode }>(
  Component: ComponentType<P & { theme: Theme }>,
): ComponentType<P> => {
  const ComponentWithTheme = (props: P) => {
    const theme = useTheme();
    return (
      <Component {...props} theme={theme}>
        {props.children || null}
      </Component>
    );
  };
  ComponentWithTheme.displayName = `WithTheme(${
    Component.displayName || Component.name
  })`;
  return ComponentWithTheme;
};

export const ThemeProvider = ({
  theme,
  children,
  rootStyles,
  rootFont = '-apple-system, Roboto, sans-serif',
  rootBackgroundColor = 'white',
  useDebugStyles = false,
}: {
  theme: Theme;
  children: ReactNode;
  rootStyles?: RootStyles;
  rootFont?: string;
  rootBackgroundColor?: string;
  useDebugStyles?: DebugStylesProp | boolean;
}) => {
  //   const { width, height } = Dimensions.get('window');
  const defaultTheme: Theme = {
    // vw: width,
    // vh: height,
  } as Theme;
  const [currentTheme, setCurrentTheme] = useState({
    ...defaultTheme,
    ...theme,
  });

  // TODO: process rootStyles, rootFont, rootBackgroundColor

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        setTheme: (theme) =>
          setCurrentTheme({
            ...defaultTheme,
            ...theme,
          }),
        rootStyles,
        rootFont,
        rootBackgroundColor,
        useDebugStyles,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
