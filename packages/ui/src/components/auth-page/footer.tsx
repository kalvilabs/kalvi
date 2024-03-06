/**
 * It is a wrapper class for the footer in which the content should be passed as children.
 *
 * The preferred order of components is:
 * 1. ButtonElement
 * 2. FooterContent
 *
 */

export function PageFooterWrapper({
  children,
  dividerTxt,
  divider,
}: {
  children: React.ReactNode;
  dividerTxt?: string;
  divider?: boolean;
}) {
  return (
    <footer className="flex flex-col gap-4 mt-4 space-y-2">
      {divider && <div className="flex flex-col items-center justify-center">
        <span className="bg-white px-2 z-10 text-sm">{dividerTxt}</span>
        <hr className="border-gray-400/50 -translate-y-3 w-full" />
      </div>}
      <div className="flex gap-4">{children}</div>
    </footer>
  );
}

export const FooterFlexLine = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex items-center space-x-2 justify-between w-full">
      {children}
    </div>
  )
}
