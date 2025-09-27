'use client';

import * as React from 'react';
import { useOpen } from '@/hooks/use-open';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogBody,
} from './dialog';

interface FullscreenDialogProps {
  /**
   * The search parameter name to use for the dialog state
   * @default 'dialog'
   */
  paramName?: string;
  /**
   * The value to set when opening
   * @default 'open'
   */
  openValue?: string;
  /**
   * Children to render inside the dialog
   */
  children: React.ReactNode;
  /**
   * Additional props to pass to the DialogContent
   */
  contentProps?: React.ComponentProps<typeof DialogContent>;
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether to show the overlay
   * @default true
   */
  overlay?: boolean;
  /**
   * Additional className to pass to the DialogContent
   */
  className?: string;
}

export function FullscreenDialog({
  paramName = 'dialog',
  openValue = 'open',
  children,
  contentProps,
  showCloseButton = true,
  overlay = true,
  className,
}: FullscreenDialogProps) {
  const { isOpen, close } = useOpen({ paramName, openValue });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        variant="fullscreen"
        showCloseButton={showCloseButton}
        overlay={overlay}
        className={className}
        {...contentProps}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}

// Compound components for easier composition
FullscreenDialog.Header = DialogHeader;
FullscreenDialog.Title = DialogTitle;
FullscreenDialog.Description = DialogDescription;
FullscreenDialog.Body = DialogBody;
FullscreenDialog.Footer = DialogFooter;

export { useOpen } from '@/hooks/use-open';
