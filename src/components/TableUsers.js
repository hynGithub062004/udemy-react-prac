import { useEffect, useState } from "react";
import _ from "lodash";

import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";

function TableUsers(props) {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dataUser, setDataUser] = useState({});
  const [isShowMoadalAddNew, setIsShowMoadalAddNew] = useState(false);
  const [isShowEditModal, setIsShowEiditModal] = useState(false);
  const handleClose = () => {
    setIsShowMoadalAddNew(false);
    setIsShowEiditModal(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  useEffect(() => {
    //call apis
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };
  const handlePageClick = (event) => {
    console.log(event);
    getUser(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setIsShowEiditModal(true);
    setDataUser(user);
  };

  const handleUpdateEditTable = (user) => {
    console.log(user);

    let id = listUsers.findIndex((item) => item.id === user.id);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers[id].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };
  return (
    <>
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => (
              <tr key={`user-${index}`}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowMoadalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowEditModal}
        handleClose={handleClose}
        dataUser={dataUser}
        handleUpdateEditTable={handleUpdateEditTable}
      />
    </>
  );
}

export default TableUsers;
