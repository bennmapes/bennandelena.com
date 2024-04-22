import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

import { RSVPForm } from "./rsvpForm";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "./utils";

export function RSVP({ ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <div {...props}>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <DialogTrigger
          className={buttonVariants({ variant: "default" })}
          onClick={() => setOpen(!open)}
        >
          Please RSVP here by August 1st!
          <ChevronRightIcon className="h-4 w-4" />
        </DialogTrigger>
        <DialogContent
          className={
            "lg:max-w-screen-lg overflow-y-scroll max-h-screen no-scrollbar"
          }
        >
          <DialogHeader>
            <DialogTitle>Can't wait to hear from you!</DialogTitle>
          </DialogHeader>
          <RSVPForm onSubmitSuccess={() => setOpen(!open)} />
        </DialogContent>
      </Dialog>
      <p className="pt-5">
        Any questions? Feel free to send us an email at
        <a
          className={cn("-ml-3", buttonVariants({ variant: "link" }))}
          href="mailto:elenabushell@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          elenabushell@gmail.com
        </a>
      </p>
    </div>
  );
}
