import { useSelector } from "react-redux";
function UserName() {
  const userName = useSelector((state) => state.user.userName);

  if (userName) return <div>{userName}</div>;
  return null;
}

export default UserName;
