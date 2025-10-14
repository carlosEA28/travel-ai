"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteTrip } from "@/actions/trip/delete-trip";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteTripButtonProps {
  tripId: string;
}

const DeleteTripButton = ({ tripId }: DeleteTripButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this trip?")) {
      return;
    }

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
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isDeleting}
      className="h-8 w-8 p-0 hover:bg-red-50"
    >
      <Trash2
        className={`h-4 w-4 ${isDeleting ? "text-gray-400" : "text-red-500"}`}
      />
      <span className="sr-only">Delete trip</span>
    </Button>
  );
};

export default DeleteTripButton;
