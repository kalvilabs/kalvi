import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { AuthPage } from "@repo/ui/components";

export default function Home() {
  return (
    <div>
      <Button variant="default">asdasd</Button>
      <Card>asd</Card>
      <AuthPage.PageWrapper pageTitle="asdad" cardTitle="asdasdasd">
        asdasd
      </AuthPage.PageWrapper>
    </div>
  );
}
