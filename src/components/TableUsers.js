import { useEffect, useState } from "react";
import _, { debounce } from "lodash";

import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalComfirm";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import "./TableUser.scss";
function TableUsers(props) {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowMoadalAddNew, setIsShowMoadalAddNew] = useState(false);
  const [dataUser, setDataUser] = useState({});

  const [isShowEditModal, setIsShowEiditModal] = useState(false);

  const [isShowModalDelete, setIsshowModalDelete] = useState(false);

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const handleClose = () => {
    setIsShowMoadalAddNew(false);
    setIsShowEiditModal(false);
    setIsshowModalDelete(false);
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

  const handleUpdateEditTable = (user) => {
    let id = listUsers.findIndex((item) => item.id === user.id);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers[id].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleDelete = (user) => {
    setIsshowModalDelete(true);
    setDataUser(user);
    // console.log(user);
  };

  const handleUpdateDeleteTable = (user) => {
    console.log(user);
    let id = listUsers.findIndex((item) => item.id === user.id);

    let cloneListUsers = _.cloneDeep(listUsers);

    cloneListUsers.splice(id, 1);

    setListUsers(cloneListUsers);
    handleClose();
  };

  const handleEditUser = (user) => {
    setIsShowEiditModal(true);
    setDataUser(user);
    // console.log(user);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = _.cloneDeep(listUsers);

    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);

    setListUsers(cloneListUsers);
  };

  const handleSearchInput = debounce((event) => {
    console.log(event.target.value);

    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );

      setListUsers(cloneListUsers);
    } else {
      getUser(1);
    }
  }, 500);

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

      <input
        className="col-3 my-3"
        placeholder="Search email here...."
        onChange={(event) => handleSearchInput(event)}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>Id</span>
                <span>
                  <i
                    onClick={() => handleSort("desc", "id")}
                    className="fa-solid fa-arrow-down-long"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "id")}
                    className="fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    onClick={() => handleSort("desc", "first_name")}
                    className="fa-solid fa-arrow-down-long"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "first_name")}
                    className="fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
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
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
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
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUser={dataUser}
        handleUpdateDeleteTable={handleUpdateDeleteTable}
      />
    </>
  );
}

export default TableUsers;
