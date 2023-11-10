import { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserService";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateUser } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);

    console.log(res);
    if (res && res.id && res.name != "" && res.job != "") {
      //success
      handleClose();
      setName("");
      setJob("");
      toast.success("A user is created is success");
      handleUpdateUser({
        first_name: name,
        id: res.id,
        email: `${name}@reqres.in`,
      });
    } else {
      handleClose();
      toast.error("Nhập đầy đủ dữ liệu.....");
      setName("");
      setJob("");
    }
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
