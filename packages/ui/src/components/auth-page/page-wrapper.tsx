import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../src/partials/card";

/**
 * It is wrapper class for the auth page in in which the content should be passed as children
 *
 * The preferred order of components is:
 * 1. PageWrapper
 * 2. InputsWrapper
 * 3. FooterWrapper
 *
 */
export function PageWrapper({
  pageTitle,
  cardTitle,
  cardDescription,
  children,
}: {
  pageTitle: string;
  children: React.ReactNode;
  cardTitle: string;
  cardDescription?: string;
}) {
  return (
    <section
      aria-label={pageTitle}
      className="h-full w-full flex items-center justify-center"
    >
      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          {cardDescription && (
            <CardDescription>{cardDescription}</CardDescription>
          )}
        </CardHeader>
        {children}
      </Card>
    </section>
  );
}