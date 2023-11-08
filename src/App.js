import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import ModalAddNew from "./components/ModalAddNew";
import { useState } from "react";
function App() {
  const [isShowMoadalAddNew, setIsShowMoadalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowMoadalAddNew(false);
  };
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 d-flex justify-content-between">
          <h3>
            <b>List users:</b>
          </h3>
          <button
            className="btn btn-success"
            onClick={() => {
              setIsShowMoadalAddNew(true);
            }}
          >
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>

      <ModalAddNew show={isShowMoadalAddNew} handleClose={handleClose} />
    </div>
  );
}

export default App;
