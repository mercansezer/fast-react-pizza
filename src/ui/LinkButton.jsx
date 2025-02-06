import { useNavigate } from "react-router-dom";

function LinkButton({ to, children }) {
  const navigate = useNavigate();
  const className = "text-lg text-blue-500 hover:text-blue-600 hover:underline";
  if (to === "-1") {
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }
  return <div></div>;
}

export default LinkButton;
