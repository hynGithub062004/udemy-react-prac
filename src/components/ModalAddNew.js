import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalAddNew = (props) => {
  const { show, handleClose } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = () => {
    console.log({ name, job });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new users</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
