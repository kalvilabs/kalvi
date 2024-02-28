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
export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full">
      <section className="md:max-w-md md:mx-auto md:pt-10 py-5">
        <Card>{children}</Card>
      </section>
    </div>
  );
}

export function FormHeader({
  cardTitle,
  cardDescriptionComponent,
}: {
  cardTitle: string;
  cardDescriptionComponent?: React.ReactNode;
}) {
  return (
    <CardHeader>
      <CardTitle>{cardTitle}</CardTitle>
      {cardDescriptionComponent && <CardDescription>{cardDescriptionComponent}</CardDescription>}
    </CardHeader>
  );
}
