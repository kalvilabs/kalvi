import { ClassValue } from "clsx";
import { ReactNode } from "react";

export interface FlexboxProps {
  /** Align Items for flexbox.
   * 
   * Default value is center
   */
  alignItems?: "stretch" | "center" | "start" | "end" | "baseline";
  /**  Justify Content for flexbox.
   *
   * Default value is center
   */
  justifyContent?: "start" | "end" | "between" | "around" | "center";
  /** Flex direction. 
   * 
   * Default value is row 
   */
  direction?: "row" | "column";
  /** Flex wrap.
   * 
   * Default value is wrap 
   */
  flexWrap?: "wrap" | "nowrap" | "reverse";
  /** Gap between flex items. 
   * 
   * Default value is 0 
   */
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Height of the flex container. Enter numbers there in tailwind classes.
   * 
   * Eg: 10, 12 etc., Refer tailwind classes for more info
   *
   * Default value is auto
   */
  maxHeight?: string;
  /** Minimum height of the flex container. Enter number there in tailwind classes
   * 
   * Eg: 10, 12 etc., Refer tailwind classes for more info
   * 
   * Default value is auto
   */
  maxWidth?: string;
  /** Minimum width of the flex container. Enter number there in tailwind classes
   * 
   * Eg: 10, 12 etc., Refer tailwind classes for more info
   * 
   * Default value is auto
   */
  alignSelf?: "stretch" | "center" | "start" | "end";
  /** Justify self for flex items.
   * 
   * Default value is auto
   */
  justifySelf?: "stretch" | "center" | "start" | "end";
  /** Background color for flex container. Enter one of the tailwind classes or any theme colors.
   * 
   * Eg: bg-primary, bg-secondary, bg-slate-500 etc., Refer tailwind classes for more info
   * 
   * Default value is transparent
   */
  bgColor?: string;
  /** Flex basis for flex items. Enter one of the tailwind classes or any theme colors.
   * 
   * Eg: flex-1, flex-2 etc., Refer tailwind classes for more info
   * 
   * Default value is auto
   */
  flexBasis?: string;
  /** Flex grow for flex items. 
   * 
   * Prefer only boolean value. Enter number only in case of special cases.
   * 
   * Default value is 0
   */
  flexGrow?: boolean | number;
  /** Flex shrink for flex items. 
   * 
   * Prefer only boolean value. Enter number only in case of special cases.
   * 
   * Default value is 1
   */
  flexShrink?: boolean | number;
  /** HTML tag for the flex container. 
   * 
   * Default value is div
  */
  as?: keyof HTMLElementTagNameMap;
  /** Classnames for the flex container. 
   * 
   * Consider avoiding this prop as much as possible. Use it only when you need to add custom classes.
  */
 classNames?: ClassValue;
 children: ReactNode;
}