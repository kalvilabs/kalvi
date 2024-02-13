import { cn } from "../../lib/utils";
import { ElementType } from "react";
import { FlexboxProps } from "./interface";

export function Flexbox({
  classNames,
  as,
  children,
  alignItems,
  alignSelf,
  justifyContent,
  justifySelf,
  direction,
  flexWrap,
  gap,
  maxHeight,
  maxWidth,
  bgColor,
  flexBasis,
  flexShrink,
  flexGrow
}: FlexboxProps) {
  const Type: ElementType = as ? as : "div";
  return (
    <Type
      className={cn(
        "flex justify-center items-center gap-md flex-wrap justify-items-center h-full w-full",
        alignItems && `items-${alignItems}`,
        alignSelf && `self-${alignSelf}`,
        justifyContent && `justify-${justifyContent}`,
        justifySelf && `justify-self-${justifySelf}`,
        direction && `flex-${direction}`,
        flexWrap && `flex-${flexWrap}`,
        gap && `gap-${gap}`,
        maxHeight && `max-h-${maxHeight}`,
        maxWidth && `max-w-${maxWidth}`,
        bgColor && `bg-${bgColor}`,
        flexBasis && `flex-basis-${flexBasis}`,
        flexShrink && `flex-shrink`,
        flexGrow && `flex-grow`,
        classNames
      )}
    >
      {children}
    </Type>
  );
}
