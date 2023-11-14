import { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateUser } from "../services/UserService";
import { useEffect } from "react";

const ModalEditUser = (props) => {
  const { show, handleClose, dataUser, handleUpdateEditTable } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleConfirmUser = async () => {
    let res = await updateUser(name, job);

    if (res && res.updatedAt) {
      handleUpdateEditTable({
        first_name: name,
        id: dataUser.id,
      });
      handleClose();
      toast.success("Edit success");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUser.first_name);
    }
  }, [dataUser]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit an users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-name">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  value={name}
                  type="text "
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Job
                </label>
                <input
                  value={job}
                  type="text"
                  className="form-control"
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
