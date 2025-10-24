"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteTrip } from "@/actions/trip/delete-trip";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/trip/delete-confirmation-dialog";

interface DeleteTripButtonProps {
  tripId: string | null;
}

const DeleteTripButton = ({ tripId }: DeleteTripButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (tripId) {
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!tripId) return;
    
    try {
      setIsDeleting(true);
      await DeleteTrip(tripId);
      toast.success("Trip deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  if (!tripId) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="h-8 w-8 p-0 hover:bg-red-50"
      >
        <Trash2
          className={`h-4 w-4 ${isDeleting ? "text-gray-400" : "text-red-500"}`}
        />
        <span className="sr-only">Delete trip</span>
      </Button>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Trip"
        description="Are you sure you want to delete this trip? This action cannot be undone."
        isLoading={isDeleting}
      />
    </>
  );
};

export default DeleteTripButton;
