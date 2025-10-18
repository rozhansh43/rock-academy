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
import { cn } from '@/utils/cn';

interface FullscreenDialogProps {
  /**
   * The search parameter name to use for the dialog state
   * @default 'dialog'
   */
  id: string;

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
  /**
   * Function to call when the dialog is closed
   */
  onClose?: () => void;
}

export function FullscreenDialog({
  id,
  children,
  contentProps,
  showCloseButton = true,
  overlay = true,
  className,
  onClose,
}: FullscreenDialogProps) {
  const { isOpen, close } = useOpen(id, 'dialog');

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
          close();
        }
      }}
    >
      <DialogContent
        variant="fullscreen"
        showCloseButton={showCloseButton}
        overlay={overlay}
        className={cn('border-none', className)}
        onClose={close}
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
