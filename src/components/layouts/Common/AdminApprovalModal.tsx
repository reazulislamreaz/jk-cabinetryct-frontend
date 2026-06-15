"use client";
import { CheckCircle2, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AdminApprovalModalProps {
  open: boolean;
  setShowApprovalModal: (open: boolean) => void;
}

const AdminApprovalModal = ({
  open,
  setShowApprovalModal,
}: AdminApprovalModalProps) => {
  const router = useRouter();
  const handleGotIt = () => {
    setShowApprovalModal(false);
    router.push("/");
  };
  return (
    <Dialog open={open} onOpenChange={setShowApprovalModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Thank You!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Your login was successful
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-4">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="font-semibold text-primary">
                Awaiting Admin Approval
              </h4>
              <p className="mt-1 text-sm text-amber-800">
                Your account is currently pending approval from our
                administrator. You will receive an email notification once your
                account has been approved.
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>This usually takes 24-48 hours</p>
          </div>

          <Button
            onClick={handleGotIt}
            className="w-full h-10 rounded cursor-pointer bg-[#721011] hover:bg-[#5a0d0e]"
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminApprovalModal;
