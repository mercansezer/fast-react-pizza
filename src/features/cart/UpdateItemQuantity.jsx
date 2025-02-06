import Button from "../../ui/Button";
function UpdateItemQuantity({
  currentQuantity,
  handleIncreaseItem,
  handleDecreaseItem,
}) {
  return (
    <div className="space-x-3">
      <Button type="small" onClick={handleDecreaseItem}>
        -
      </Button>
      <span>{currentQuantity}</span>
      <Button type="small" onClick={handleIncreaseItem}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
