import { SitePage } from "@/components/site-chrome";
import { SubmissionForm } from "@/components/submission-form";

export default function AppointmentsPage() {
  return (
    <SitePage title="अनलाइन अपोइन्टमेन्ट अनुरोध">
      <SubmissionForm
        endpoint="/api/appointments"
        fields={[
          ["full_name", "नाम", "text", true],
          ["phone", "फोन", "tel", true],
          ["service", "सेवा प्रकार", "text", true],
          ["preferred_date", "इच्छित मिति", "nepali-date", false]
        ]}
        textarea={["message", "थप विवरण"]}
      />
    </SitePage>
  );
}
