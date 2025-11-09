import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {
  return (
    visible && (
      <Dialog title={title} onClose={onCancel}>
        <p style={{ margin: "25px", textAlign: "center" }}>{message}</p>
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
    )
  );
};

export default ConfirmationDialog;