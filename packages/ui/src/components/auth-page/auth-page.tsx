import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../src/partials/card";
import { Input } from "../../../src/partials/input";
import { Button } from "../../../src/partials/button";
import { Label } from "../../../src/partials/label";

/**
 * It is wrapper class for the auth page in in which the content should be passed as children
 *
 * The preferred order of components is:
 * 1. PageWrapper
 * 2. InputsWrapper
 * 3. FooterWrapper
 *
 * @param pageTitle - The title of the page
 * @param cardTitle - The title of the card
 * @param cardDescription - The description of the card (optional)
 * @param children - The content of the page
 */
function PageWrapper({
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

/**
 * It is wrapper class for the input fields in which the inputs should be passed as children.
 *
 * Preferrably the children should be InputField components
 *
 * @param children - The content of the input fields
 */
function InputsWrapper({ children }: { children: React.ReactNode }) {
  return <ul className="w-full max-w-md">{children}</ul>;
}

/**
 * This is input field which is aligned with the design of the auth page
 *
 * @param fieldName - The name of the field
 * @param type - The type of the input field
 * @param placeholder - The placeholder of the input field (optional)
 */
function InputField({
  fieldName,
  type,
  placeholder,
}: {
  fieldName: string;
  type: string;
  placeholder?: string;
}) {
  return (
    <li>
      <Label htmlFor={fieldName}>{fieldName}</Label>
      <Input
        id={fieldName}
        type={type}
        placeholder={placeholder && placeholder}
      />
    </li>
  );
}

/**
 * It is a wrapper class for the footer in which the content should be passed as children.
 *
 * The preferred order of components is:
 * 1. ButtonElement
 * 2. FooterContent
 *
 * @param children - The content of the footer
 */
function FooterWrapper({ children }: { children: React.ReactNode }) {
  return <footer className="flex gap-4 mt-4">{children}</footer>;
}

/**
 * It is a button element which is aligned with the design of the auth page
 *
 * @param contentIn - The content of the button
 */
function ButtonElement({ contentIn }: { contentIn: string }) {
  return (
    <Button
      variant="default"
      className="grow bg-black text-white hover:bg-black/80"
    >
      {contentIn}
    </Button>
  );
}

/**
 * It is a footer content which is aligned with the design of the auth page
 *
 * @param children - The content of the footer
 */
function FooterContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-600 py-2 px-4">{children}</div>;
}

/**
 * It is a wrapper class for the auth page in which the content should be passed as children
 * @element - PageWrapper
 * @element - InputsWrapper
 * @element - InputField
 * @element - FooterWrapper
 * @element - ButtonElement
 * @element - FooterContent
 *
 * Ideal Order of Usage:
 * 1. PageWrapper
 * 2. InputsWrapper - InputField's children
 * 3. FooterWrapper - ButtonElement and FooterContent
 */
export const AuthPage = {
  PageWrapper,
  InputsWrapper,
  InputField,
  FooterWrapper,
  ButtonElement,
  FooterContent,
};
