"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

type ActionMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ActionMenu({
  onEdit,

  onDelete,
}: ActionMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-90 cursor-pointer"
        >
          <MoreVertical className="w-4 h-4" />
          <span className="sr-only">Open actions</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-44 p-1">
        <div className="flex flex-col divide-y rounded-md">
          <button
            className="text-left px-3 py-2 hover:bg-slate-100 rounded-md text-sm"
            onClick={() => onEdit?.()}
          >
            Edit
          </button>
          <button
            className="text-left px-3 py-2 hover:bg-red-600 hover:text-white rounded-md text-sm text-red-600"
            onClick={() => onDelete?.()}
          >
            Delete
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
