import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./VerifyComponent.css";
import { useDispatch } from "react-redux";
import { buyVerifyUser, checkVerifyUser } from "../../redux/reducer/userSlice";

const VerifyAccount = () => {
  const [amount, setAmount] = useState(100000);
  const [verificationType, setVerificationType] = useState("monthly");
  const [isVerify, setIsVerify] = useState(false);
  const userLogin = JSON.parse(localStorage.getItem("login-user"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (verificationType === "monthly") {
      setAmount(100000);
    } else if (verificationType === "permanent") {
      setAmount(1000000);
    }
  }, [verificationType]);

  const checkVerificationStatus = async () => {
    try {
      const response = await dispatch(checkVerifyUser(userLogin._id));
      setIsVerify(response.payload?.isVerified);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const handleSelectChange = (event) => {
    setVerificationType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newOrder = {
        amount: amount,
        verificationType: verificationType,
      };

      // console.log(newOrder);
      const response = await dispatch(buyVerifyUser(newOrder)).unwrap();
      console.log(response);
      setIsVerify(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="verify-account">
      <h2>Verify your account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="Text"
            placeholder="Verify your name"
            // value={amount}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Email</Form.Label>
          <Form.Control
            type="Text"
            placeholder="Verify your email address"
            // value={amount}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount to pay</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            name="amount"
            readOnly // Prevent user from changing the amount manually
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type of verify</Form.Label>
          <Form.Select
            onChange={handleSelectChange}
            value={verificationType}
            name="verificationType"
          >
            <option value="monthly">Monthly - 100.000VND</option>
            <option value="permanent">Forever - 1.000.000VND</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isVerify}>
          {isVerify ? "Already Verified" : "Verify Confirm"}
        </Button>
      </Form>
    </div>
  );
};

export default VerifyAccount;
