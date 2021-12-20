import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { ComponentType, ReactNode, useContext } from 'react';
import { Theme, ThemeContext } from '.';

const defaultDebugStyles: ViewStyle = {
  borderWidth: StyleSheet.hairlineWidth,
  borderStyle: 'solid',
  borderColor: 'red',
};

export type DebugStylesProp = boolean | ViewStyle;

export interface StyledOptions<ComponentProps> {
  attrs?: ComponentProps;
  useDebugStyles?: DebugStylesProp;
  children?: ReactNode | undefined;
}

interface StyleableProps {
  style?: StyleProp<unknown>;
  children?: any;
  theme?: Theme;
}

type OptionalThemedProps = Pick<StyleableProps, 'theme'>;
export type ThemedProps = Required<OptionalThemedProps>;

export function styled<
  CustomProps extends ThemedProps,
  StyledComponentProps extends StyleableProps,
>(
  Component: ComponentType<StyledComponentProps>,
  style:
    | StyledComponentProps['style']
    | ((props: CustomProps) => StyledComponentProps['style']),
  options?: StyledOptions<StyledComponentProps>,
) {
  const { useDebugStyles } = options || {};

  // eslint-disable-next-line react/display-name
  return (
    props: Omit<CustomProps, 'theme'> &
      OptionalThemedProps &
      StyledComponentProps,
  ) => {
    const themeContext = useContext(ThemeContext);
    const theme = themeContext?.theme || {};

    const themedProps = {
      ...(props as Record<string, unknown>),
      theme,
    } as CustomProps;

    const computedStyles =
      style instanceof Function ? style(themedProps) : style;

    const newStyles =
      computedStyles instanceof Array
        ? [...computedStyles, props.style]
        : [computedStyles, props.style];

    // TODO: add rootStyles, rootBackgroundColor, etc.

    if (useDebugStyles !== undefined) {
      if (typeof useDebugStyles === 'boolean' && useDebugStyles) {
        newStyles.push(defaultDebugStyles);
      } else {
        newStyles.push({
          ...useDebugStyles,
        });
      }
    }

    const attrs = options?.attrs || {};
    const computedProps = {
      ...(props as Record<string, unknown>),
      ...attrs,
    } as StyledComponentProps;

    return <Component {...computedProps} style={newStyles} />;
  };
}

const makeStyledKey =
  <StyledComponentProps extends StyleableProps>(
    Component: ComponentType<StyledComponentProps>,
  ) =>
  <CustomProps extends ThemedProps>(
    style:
      | StyledComponentProps['style']
      | ((props: CustomProps & ThemedProps) => StyledComponentProps['style']),
    options?: StyledOptions<StyledComponentProps>,
  ) =>
    styled(Component, style, options);

styled.View = makeStyledKey(View);
styled.SafeAreaView = makeStyledKey(SafeAreaView);
styled.Text = makeStyledKey(Text);
styled.TextInput = makeStyledKey(TextInput);
styled.Image = makeStyledKey(Image);
styled.FlatList = makeStyledKey(FlatList);
styled.ScrollView = makeStyledKey(ScrollView);
styled.SectionList = makeStyledKey(SectionList);
styled.TouchableOpacity = makeStyledKey(TouchableOpacity);
