import { ReactNode } from "react";
import {
  FlatListProps,
  ScaledSize,
  ScrollViewProps,
  SectionListProps,
  StyleProp,
  TextInputProps,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
  TextProps,
  ImageProps
} from "react-native";
import { EdgeInsets, SafeAreaViewProps } from "react-native-safe-area-context";

/**
 * The Theme interface can be augmented by users to add types to `styled-rn` default theme
 *
 * Declare your theme interface, e.g. MyTheme, then
 * create a file in your project called `theme.d.ts` and add the following to it:
 *
 * import { MyTheme } from "./my-theme";
 *
 * declare module "styled-rn" {
 *    type Theme = MyTheme;
 * }
 */
import { Theme } from "styled-rn";

export interface StyledOptions<ComponentProps> {
  attrs?: ComponentProps;
  useDebugStyles?: DebugStylesProp;
  children?: ReactNode | undefined;
}

export type DebugStylesProp = boolean | ViewStyle;

export interface ComponentPropsWithStyle<Component = unknown> {
  style?: StyleProp<Component>;
  // children?: ReactNode;
  theme?: Theme;
  ctx?: ThemeContext;
}

export type StyledPropsKeys = "theme" | "ctx";
export type OptionalStyledProps = Pick<ComponentPropsWithStyle, StyledPropsKeys>;

export type StyledProps = Required<OptionalStyledProps>;

export interface RootStyles {
  View?: ViewProps["style"] | undefined;
  SafeAreaView?: SafeAreaViewProps["style"] | undefined;
  Text?: TextProps["style"] | undefined;
  TextInput?: TextInputProps["style"] | undefined;
  Image?: ImageProps["style"] | undefined;
  FlatList?: FlatListProps<unknown>["style"] | undefined;
  ScrollView?: ScrollViewProps["style"] | undefined;
  SectionList?: SectionListProps<unknown, unknown>["style"] | undefined;
  TouchableOpacity?: TouchableOpacityProps["style"] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ThemeContext {
  insets: EdgeInsets;
  window: ScaledSize;
}

export interface ThemeRootDefaults {
  styles?: RootStyles;
  font?: string;
  backgroundColor?: string;
}

export interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
  root?: ThemeRootDefaults;
  useDebugStyles?: DebugStylesProp | boolean;
}

export interface StyledRNContext {
  theme: Theme;
  ctx: ThemeContext;
  setTheme: (theme: Theme) => void;
  root?: ThemeRootDefaults;
  useDebugStyles?: DebugStylesProp | boolean;
}
