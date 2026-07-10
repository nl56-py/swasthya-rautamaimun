import { SitePage } from "@/components/site-chrome";
import { SubmissionForm } from "@/components/submission-form";

export default function GrievancePage() {
  return (
    <SitePage title="गुनासो">
      <SubmissionForm
        endpoint="/api/grievances"
        fields={[
          ["full_name", "नाम", "text", false],
          ["phone", "फोन", "tel", false],
          ["category", "गुनासो विषय", "text", false]
        ]}
        textarea={["message", "गुनासो विवरण"]}
      />
    </SitePage>
  );
}
