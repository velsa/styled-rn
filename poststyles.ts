import { ViewStyle, StyleSheet } from "react-native";
import { DebugStylesProp, ThemeRootDefaults } from "./types";

const defaultDebugStyles: ViewStyle = {
  borderWidth: StyleSheet.hairlineWidth,
  borderStyle: "solid",
  borderColor: "red",
};

export function postStyles(
  styles: any[],
  root?: ThemeRootDefaults,
  useDebugStyles?: DebugStylesProp
) {
  // TODO: add rootStyles, rootBackgroundColor, etc.
  // TODO: add sx styles (MUI5)

  if (useDebugStyles !== undefined) {
    if (typeof useDebugStyles === "boolean" && useDebugStyles) {
      styles.push(defaultDebugStyles);
    } else {
      styles.push({
        ...(useDebugStyles as ViewStyle),
      });
    }
  }
}
