import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import Button from "../../ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!userName) return;
    navigate("/menu");
    dispatch(updateName(userName));
    setUserName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-5 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>
      <input
        placeholder="Your full name"
        className="input mb-8 w-72"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <div>
        {userName !== "" && (
          <Button onClick={handleSubmit} type="primary" to="menu">
            Start Ordering
          </Button>
        )}
      </div>
    </form>
  );
}

export default CreateUser;
