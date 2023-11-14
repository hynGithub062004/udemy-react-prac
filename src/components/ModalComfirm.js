import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../services/UserService";

const ModalConfirm = (props) => {
  const { show, handleClose, handleUpdateDeleteTable, dataUser } = props;

  const confirmDelete = async () => {
    let res = await deleteUser(dataUser.id);

    if (res && res.resStatus === 204) {
      handleUpdateDeleteTable({
        id: dataUser.id,
      });
      toast.success("Delete success!");
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete an users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-name">
            {/* <h4>{`
                Are you sure delete <b>${dataUser.first_name}</b>, this action can't be undone
                Do you want to delete?
            `}</h4> */}
            This action can't be undone Do you want to delete{" "}
            <b>email = {dataUser.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
