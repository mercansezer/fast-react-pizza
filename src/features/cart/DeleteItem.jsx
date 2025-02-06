import Button from "../../ui/Button";
function DeleteItem({ handleDeleteItem }) {
  return (
    <Button type="small" onClick={handleDeleteItem}>
      Delete
    </Button>
  );
}

export default DeleteItem;
