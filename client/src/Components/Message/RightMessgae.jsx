import React, { useState } from "react";
import "./RightMessage.css";
import { Link } from "react-router-dom";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PhotoIcon from "@mui/icons-material/Photo";
import { BsFillSendFill } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const RightMessgae = ({ content, isMine, timestamp = Date.now() }) => {
  const getTimeString = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  //Xử lý emoji
  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
  };

  //Xử lý sự kiện để show và xoá các ảnh được chọn
  const handleImageSelect = (event) => {
    const files = event.target.files;
    const selected = Array.from(files);
    console.log(selected);
    setSelectedImages([...selectedImages, ...selected]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <div className="message-right-content">
      <div className="info-message">
        {/* Hiển thị EMOJI VÀ ẢNH */}
        {showEmojiPicker && (
          <div className="selected-items">
            {selectedEmoji && (
              <div className="selected-emoji">{selectedEmoji}</div>
            )}
            {showEmojiPicker && (
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            )}
          </div>
        )}
        <div className="list-imgs">
          {selectedImages.map((image, index) => (
            <div key={index} className="selected-image">
              <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
              <span onClick={() => handleRemoveImage(index)}>X</span>
            </div>
          ))}
        </div>

        {/* HEADER */}
        <Link to={"/profile-user"} className="right-header nav-link">
          <img
            src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/325974944_1890980747908840_7410515548073747029_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=PQou7DxaYS4AX_69UV8&_nc_ht=scontent.fhan14-3.fna&oh=00_AfAkdjCUkiTJ1Ud8FU4ZgQOm7n1DPy0zA_em9ig5VJnzog&oe=64ACFE11"
            alt=""
          />
          <p className="fullname m-0">
            <b>Thái Thị Nhàn</b>
          </p>
          <p className="username m-0">@NhanThai123</p>
        </Link>
        {/* Phải lặp để lấy list chat */}
        <div className={`chat-message mine`}>
          <div className="chat-content">abcd</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message guest`}>
          <div className="chat-content">123456dfndshs</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message mine`}>
          <div className="chat-content">123456dfndshs</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message mine`}>
          <div className="chat-content">abcd</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message guest`}>
          <div className="chat-content">123456dfndshs</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message mine`}>
          <div className="chat-content">123456dfndshs</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message mine`}>
          <div className="chat-content">abcd</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message guest`}>
          <div className="chat-content">123456dfndshs</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message mine`}>
          <div className="chat-content">123456dfndshs</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message mine`}>
          <div className="chat-content">abcd</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message guest`}>
          <div className="chat-content">123456dfndshs</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
        <div className={`chat-message mine`}>
          <div className="chat-content">123456dfndshs</div>
          <div className="chat-time">{getTimeString(timestamp)}</div>
        </div>
      </div>
      <form className="message-send" method="post" action="#">
        <div className="form-bottom">
          <label htmlFor="img-message">
            <PhotoIcon />
          </label>
          <input
            type="file"
            multiple
            id="img-message"
            name="img-message"
            onChange={handleImageSelect}
            className="d-none"
          />
          <label htmlFor="emoji-tweet" onClick={handleToggleEmojiPicker}>
            <InsertEmoticonIcon />
          </label>
          <input
            type="text"
            name="input-message"
            className="input-message"
            placeholder="Write your message"
          />
          <button type="submit" className="btn-new-message">
            <BsFillSendFill />
          </button>
        </div>
      </form>
    </div>
  );
};

export default RightMessgae;
