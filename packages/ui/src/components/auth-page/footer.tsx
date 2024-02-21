/**
 * It is a wrapper class for the footer in which the content should be passed as children.
 *
 * The preferred order of components is:
 * 1. ButtonElement
 * 2. FooterContent
 *
 */
export function FooterWrapper({ children }: { children: React.ReactNode }) {
  return <footer className="flex gap-4 mt-4">{children}</footer>;
}

/**
 * It is a footer content which is aligned with the design of the auth page
 *
 */
export function FooterContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-600 py-2 px-4">{children}</div>;
}