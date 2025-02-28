import { Button } from "@/components/ui/button";
import { USER_ROLE } from "@/constants/enums";

interface AnomalyListProps {
  anomalies: any[];
  loading: boolean;
  onAction: (id: string, action: string) => void;
  userRole?: UserRole;
}

export const AnomalyList = ({
  anomalies,
  loading,
  onAction,
  userRole,
}: AnomalyListProps) => {
  if (loading) {
    return <div>Loading anomalies...</div>;
  }

  return (
    <div className="space-y-4">
      {anomalies.map((anomaly) => (
        <div key={anomaly.id} className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-white">{anomaly.title}</h3>
              <p className="text-sm text-zinc-400">{anomaly.description}</p>
            </div>
            {userRole &&
              (userRole === USER_ROLE.ADMIN ||
                userRole === USER_ROLE.SUPER_ADMIN) && (
                <Button
                  onClick={() => onAction(anomaly.id, "resolve")}
                  variant="outline"
                  size="sm"
                >
                  Resolve
                </Button>
              )}
          </div>
        </div>
      ))}
      {anomalies.length === 0 && (
        <div className="text-center text-zinc-400">No anomalies detected</div>
      )}
    </div>
  );
};
