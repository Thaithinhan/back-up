import Dropdown from "react-bootstrap/Dropdown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import "./DropdownComponent.css";
import { useDispatch } from "react-redux";
import { checkFollow } from "../../redux/reducer/followSlice";
import EditModalTweet from "../Modals/EditTweetModal/EditTweetModal";
import { useState } from "react";
import DeleteModal from "../Modals/RemoveTweetModal/RemoveTweetModal";

function DropdownComponent({
  isUserTweet,
  isFollowing,
  setIsCheckFollowing,
  userId_tweet,
  tweet,
  setTweets,
  setTweetParent,
  setComments,
}) {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const checkFollowing = async () => {
    const data = await dispatch(checkFollow(userId_tweet)).unwrap();
    setIsCheckFollowing(data.isFollowing);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    checkFollowing();
  }; //Chống sự kiện chuyển trang

  return (
    <Dropdown onClick={handleClick}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {isUserTweet ? (
          <>
            <Dropdown.Item
              className="text-primary"
              onClick={() => setShowEditModal(!showEditModal)}
            >
              <EditIcon className="icon-drop" /> Edit This Tweet
            </Dropdown.Item>
            <Dropdown.Item
              className="text-danger"
              onClick={() => setShowDeleteModal(!showDeleteModal)}
            >
              <DeleteIcon className="icon-drop" /> Remove This Tweet
            </Dropdown.Item>
          </>
        ) : (
          <Dropdown.Item>
            {isFollowing ? (
              <>
                <GroupRemoveIcon className="icon-drop" /> Unfollow
              </>
            ) : (
              <>
                <GroupAddIcon className="icon-drop" /> Follow
              </>
            )}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
      <EditModalTweet
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        tweet={tweet}
        setTweets={setTweets}
        setTweetParent={setTweetParent}
        setComments={setComments}
      />
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        tweet={tweet}
        setTweets={setTweets}
        setComments={setComments}
      />
    </Dropdown>
  );
}

export default DropdownComponent;
