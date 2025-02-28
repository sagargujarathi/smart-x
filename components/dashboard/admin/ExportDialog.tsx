import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExportDialogProps {
  onExport: (format: "csv" | "pdf") => void;
  onClose: () => void;
}

export const ExportDialog = ({ onExport, onClose }: ExportDialogProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white">Export Data</h2>
          <div className="flex gap-4">
            <Button onClick={() => onExport("csv")}>Export as CSV</Button>
            <Button onClick={() => onExport("pdf")}>Export as PDF</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
