import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState } from "react";
function SimpleModal({
  isOpen,
  onClose,
  onApprove,
  header,
  body,
  cancelButton = true,
  approveButtonText = "Approve",
  customApproveButton = false,
  size, //it can be sm/lg/xl
  cancelCrossButton = true,
  approveButton = true,
}) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const getCustomApproveButton = () => {
    return (
      <Button.Ripple color="primary" onClick={onApprove}>
        <span className="align-middle d-inline-block">{approveButtonText}</span>
      </Button.Ripple>
    );
  };
  // Modal open state
  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      modalTransition={{ timeout: 500 }}
      size={size}
    >
      <ModalHeader
        toggle={onClose}
        className="w-100"
        close={
          cancelCrossButton &&
          onClose && (
            <Button
              className="float-right p5"
              color="primary"
              onClick={onClose}
              outline
            >
              X
            </Button>
          )
        }
      >
        <h5>{header?.text}</h5>
      </ModalHeader>
      <ModalBody>{body?.text ? body.text : body}</ModalBody>
      <ModalFooter>
        {cancelButton ? (
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        ) : null}
        <div>
          <div style={{border:"1px solid", padding:"4px"}}> <p>Ticket Count: {count}</p>
            <Button outline style={{marginRight:"8px", marginLeft:"16px"}} onClick={handleDecrement}>-</Button>
            <Button outline onClick={handleIncrement}>+</Button></div>
          </div>
        {customApproveButton
          ? getCustomApproveButton()
          : approveButton && (
            <Button color="primary" onClick={() => onApprove(count)}>
              {approveButtonText}
            </Button>
          )}
      </ModalFooter>
    </Modal>
  );
}

export default SimpleModal;
