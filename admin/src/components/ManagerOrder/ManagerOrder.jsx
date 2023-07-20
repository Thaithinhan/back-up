import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import "./ManagerOrder.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../redux/reducer/orderSlice";

const ManageOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    dispatch(getAllOrder()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleSearch = (event) => {
    event.preventDefault();
    // console.log(orders);
    setFilteredOrders(
      orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        const startDateObj = startDate ? new Date(startDate + "T00:00") : null;
        const endDateObj = endDate ? new Date(endDate + "T23:59") : null;
        if (startDateObj && orderDate < startDateObj) {
          return false;
        }
        if (endDateObj && orderDate > endDateObj) {
          return false;
        }
        return true;
      })
    );
  };

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let order of filteredOrders) {
      total += order.amount;
    }
    setTotalAmount(total);
  }, [filteredOrders]);

  return (
    <>
      <h3 className="fw-bold text-center my-3">MANAGEMENT VERIFY ORDER</h3>
      <Form
        onSubmit={handleSearch}
        className="d-flex justify-content-between search-date-form"
      >
        <label>
          From:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <Button type="submit" className="search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Verify</th>
            <th>Amount</th>
            <th>Verification Type</th>
            <th>Verified Date</th>
            <th>Expired Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.userId.fullname}</td>
              <td>{order.amount.toLocaleString()}</td>
              <td>{order.verificationType}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                {order.expiryDate &&
                  new Date(order.expiryDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="total-amount">
        Total Revenue: {totalAmount.toLocaleString()}
      </div>
    </>
  );
};

export default ManageOrder;
