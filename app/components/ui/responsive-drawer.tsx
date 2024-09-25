import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useMediaQuery } from "~/hooks/use-media-query";

type ResponsiveDrawerProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function ResponsiveDrawer({
  trigger,
  content,
  open,
  setOpen,
}: ResponsiveDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          aria-describedby={undefined}
          hideCloseButton
          className="sm:max-w-screen-sm p-0 overflow-hidden"
        >
          <DialogTitle className="sr-only" />
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerTitle className="sr-only" />
        {content}
      </DrawerContent>
    </Drawer>
  );
}
