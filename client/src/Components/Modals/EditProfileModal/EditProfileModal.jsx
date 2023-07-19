import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./EditProfileModal.css";

function EditModalProfile({
  setShowEditProfileModal,
  showEditProfileModal,
  isUpdate,
  setIsUpdate,
}) {
  const [show, setShow] = useState(false);
  // console.log(setIsUpdate);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const userLogin = JSON.parse(localStorage.getItem("login-user"));

  const [inputValue, setContentInput] = useState({
    fullname: userLogin.fullname,
    username: userLogin.username,
    avatar: userLogin.avatar,
    cover_photo: userLogin.cover_photo,
  });

  const [previewImages, setPreviewImages] = useState({
    avatar: userLogin.avatar,
    cover_photo: userLogin.cover_photo,
  });

  const handleClose = () => {
    setShow(false);
    setShowEditProfileModal(false);
  };

  useEffect(() => {
    setShow(showEditProfileModal);
  }, [showEditProfileModal]);

  // Hàm xử lý sự kiện thay đổi giá trị input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setContentInput({ ...inputValue, [name]: value });
  };

  // Hàm xử lý sự kiện thay đổi giá trị input file (avatar và cover_photo)
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setContentInput({ ...inputValue, [name]: files[0] });

    if (files[0]) {
      setPreviewImages({
        ...previewImages,
        [name]: URL.createObjectURL(files[0]),
      });
    }
  };

  //XỬ LÝ SỰ KIỆN SUBMIT
  const handleEditProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", inputValue.fullname);
    formData.append("username", inputValue.username);
    if (inputValue.avatar instanceof File) {
      formData.append("avatar", inputValue.avatar);
    }
    if (inputValue.cover_photo instanceof File) {
      formData.append("cover_photo", inputValue.cover_photo);
    }
    // Thay đổi URL sau bằng đường dẫn API thích hợp để upload hình ảnh
    const response = await axios.patch(
      "http://localhost:4000/users/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Handle response here

    localStorage.setItem("login-user", JSON.stringify(response.data));

    handleClose();
    setIsUpdate(!isUpdate);
  };

  return (
    <Modal show={show} onHide={handleClose} className="modalEditProfile">
      <Modal.Header closeButton>
        <Modal.Title>EDIT PROFFILE USER</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Your fullname</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              name="fullname"
              value={inputValue.fullname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Username</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              name="username"
              value={inputValue.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Avatar</Form.Label>
            <label htmlFor="avatarUpload" className="img-wrapper">
              <img src={previewImages.avatar} alt="" className="avatar" />
            </label>
            <Form.Control
              type="file"
              autoFocus
              id="avatarUpload"
              name="avatar"
              onChange={handleFileChange}
              style={{ display: "none" }} // Ẩn input file
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Cover Photo</Form.Label>
            <label htmlFor="coverUpload" className="img-wrapper">
              <img
                src={previewImages.cover_photo}
                alt=""
                className="cover_photo"
              />
            </label>
            <Form.Control
              type="file"
              autoFocus
              id="coverUpload"
              name="cover_photo"
              onChange={handleFileChange}
              style={{ display: "none" }} // Ẩn input file
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              CLOSE
            </Button>
            <Button variant="primary" onClick={handleEditProfile}>
              EDIT
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditModalProfile;
