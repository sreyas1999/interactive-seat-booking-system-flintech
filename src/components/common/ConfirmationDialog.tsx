import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const messageStyle: React.CSSProperties = {
  margin: "25px",
  textAlign: "center"
};

const ConfirmationDialog = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {
  if (!visible) return null;

  return (
    <Dialog title={title} onClose={onCancel}>
      <p style={messageStyle}>{message}</p>
      <DialogActionsBar>
        <Button
          themeColor="primary"
          onClick={onConfirm}
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        >
          Confirm
        </Button>
        <Button
          onClick={onCancel}
          className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
        >
          Cancel
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

ConfirmationDialog.displayName = 'ConfirmationDialog';

export default React.memo(ConfirmationDialog);