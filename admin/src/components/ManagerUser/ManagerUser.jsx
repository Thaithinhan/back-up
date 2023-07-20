import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllUsersNotAdmin } from "../../redux/reducer/userSlice";
import "./ManagerUser.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    const response = await dispatch(getAllUsersNotAdmin()).unwrap();
    setUsers(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("vi-VN", options).format(
      new Date(dateString)
    );
  };

  return (
    <>
      <h3 className="fw-bold text-center my-3">MANAGEMENT USER</h3>
      <Table striped bordered hover className="table-user">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Username</th>
            <th>Avatar User</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.fullname}</td>
              <td>{user.username}</td>
              <td>
                <img src={user.avatar} alt="" className="avt-table" />
              </td>
              <td>{user.email}</td>
              <td>{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ManageUser;
