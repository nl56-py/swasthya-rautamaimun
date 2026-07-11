import { Metadata } from "next";
import { SitePage } from "@/components/site-chrome";
import { SubmissionForm } from "@/components/submission-form";

export const metadata: Metadata = {
  title: "गुनासो दर्ता",
  description: "रौतामाई गाउँपालिका स्वास्थ्य शाखामा अनलाइन गुनासो दर्ता गर्नुहोस् — तपाईँको आवाज सुनिने ठाउँ।",
  keywords: ["गुनासो", "Grievance", "Online Grievance", "Gunaso Rautamai", "Health Complaint"]
};

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
