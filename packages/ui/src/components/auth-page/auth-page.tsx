import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../src/partials/card";
import { Input } from "../../../src/partials/input";
import { Button } from "../../../src/partials/button";
import { Label } from "../../../src/partials/label";
import { Checkbox } from "../../../src/partials/checkbox";

/**
 * It is wrapper class for the auth page in in which the content should be passed as children
 *
 * The preferred order of components is:
 * 1. PageWrapper
 * 2. FormWrapper
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
  cardDescription?: React.ReactNode;
}) {
  return (
    <section
      aria-label={pageTitle}
      className="h-full w-full flex items-center justify-center isolate"
    >
      <Card className="md:mx-auto w-full md:max-w-[480px] relative md:shadow-md sm:rounded-lg px-6 py-7 space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl font-bold leading-9 tracking-tight">
            {cardTitle}
          </CardTitle>
          {cardDescription && (
            <CardDescription className="mt-2 text-sm leading-6">
              {cardDescription}
            </CardDescription>
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
function FormWrapper({
  children,
  submitButtonPlaceholder,
}: {
  children: React.ReactNode;
  submitButtonPlaceholder: string;
}) {
  return (
    <form className="w-full space-y-4">
      {children}
      <Button
        variant="default"
        type="submit"
        className="grow bg-black text-white hover:bg-black/80 w-full"
      >
        {submitButtonPlaceholder}
      </Button>
    </form>
  );
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
    <div className="space-y-2">
      <Label htmlFor={fieldName}>{fieldName}</Label>
      <Input
        id={fieldName}
        type={type}
        placeholder={placeholder && placeholder}
      />
    </div>
  );
}

/**
 * This is checkbox field which is aligned with the design of the auth page
 *
 * @param fieldName - The name of the field
 * @param type - The type of the input field
 * @param placeholder - The placeholder of the input field (optional)
 */

function CheckboxField({
  fieldName,
  placeholder,
  link,
}: {
  fieldName: string;
  placeholder?: string;
  link: string;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox className="border-black/50" id={fieldName} />
        <Label htmlFor={fieldName} className="font-normal">
          {placeholder}
        </Label>
      </div>
      {link && (
        <Button variant="link" className="text-black hover:text-black/80">
          {link}
        </Button>
      )}
    </div>
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
function FooterWrapper({
  children,
  headingContent,
}: {
  children: React.ReactNode;
  headingContent: string;
}) {
  return (
    <footer className="flex flex-col gap-4 mt-4 space-y-2">
      <div className="flex flex-col items-center justify-center">
        <span className="bg-white px-2">{headingContent}</span>
        <hr className="border-gray-400/50 -translate-y-3 w-full -z-50" />
      </div>
      <div className="flex gap-4">
      {children}
      </div>
    </footer>
  );
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
 * It is a button element which is to provide design for authentication with providers
 *
 * @param provider - The provider of the button
 */
function ProviderButtonElement({
  provider,
}: {
  provider: "github" | "google";
}) {
  return (
    <Button
      variant="outline"
      className="grow bg-white text-black hover:bg-black/20 flex gap-3"
    >
      {provider === "github" && (
        <svg
          className="h-5 w-5 fill-black"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {provider === "google" && (
        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
          <path
            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
            fill="#EA4335"
          />
          <path
            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
            fill="#4285F4"
          />
          <path
            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
            fill="#FBBC05"
          />
          <path
            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
            fill="#34A853"
          />
        </svg>
      )}
      <span className="capitalize">{provider}</span>
    </Button>
  );
}

/**
 * It is a link element which is aligned with the design of the auth page
 *
 * @param contentIn - The content of the link
 */
function LinkElement({ contentIn }: { contentIn: string }) {
  return (
    <Button variant="link" className="text-black hover:text-black/80 px-0">
      {contentIn}
    </Button>
  );
}


/**
 * It is a wrapper class for the auth page in which the content should be passed as children
 * @element - PageWrapper
 * @element - FormWrapper
 * @element - InputField
 * @element - FooterWrapper
 * @element - ButtonElement
 * @element - FooterContent
 *
 * Ideal Order of Usage:
 * 1. PageWrapper
 * 2. FormWrapper - InputField's children
 * 3. FooterWrapper - ButtonElement and FooterContent
 */
export const AuthPage = {
  PageWrapper,
  FormWrapper,
  FooterWrapper,
  InputField,
  LinkElement,
  ButtonElement,
  ProviderButtonElement,
  CheckboxField,
};
