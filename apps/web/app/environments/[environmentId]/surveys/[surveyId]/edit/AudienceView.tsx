import type { Survey } from "@formbricks/types/surveys";
import HowToSendCard from "./HowToSendCard";
import RecontactOptionsCard from "./RecontactOptionsCard";
import ResponseOptionsCard from "./ResponseOptionsCard";
import WhenToSendCard from "./WhenToSendCard";
import WhoToSendCard from "./WhoToSendCard";

interface AudienceViewProps {
  environmentId: string;
  localSurvey: Survey;
  setLocalSurvey: (survey: Survey) => void;
}

export default function AudienceView({ environmentId, localSurvey, setLocalSurvey }: AudienceViewProps) {
  return (
    <div className="space-y-3 p-5">
      <HowToSendCard />

      <WhoToSendCard />

      <WhenToSendCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        environmentId={environmentId}
      />

      <ResponseOptionsCard />

      <RecontactOptionsCard
        localSurvey={localSurvey}
        setLocalSurvey={setLocalSurvey}
        environmentId={environmentId}
      />
    </div>
  );
}
