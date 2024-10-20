import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { GrAddCircle } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
const HomeItem = ({ item }) => {
  const dispatch = useDispatch();
  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.indexOf(item.id) >= 0;
  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="item-container">
      <img className="item-image" src={item.thumbnail} alt="item image" />
      <div className="rating">{item.rating} ⭐</div>
      <div className="company-name">{item.brand}</div>
      <div className="item-name">{item.title}</div>
      <div className="price">
        <span className="current-price">
          Rs {(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
        </span>
        <span className="original-price">Rs {item.price}</span>
        <span className="discount">(-{item.discountPercentage}%)</span>
      </div>

      {elementFound ? (
        <button
          type="button"
          className="btn btn-remove-bag btn-danger"
          onClick={handleRemove}
        >
          <AiFillDelete className="del_icon" /> Del
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-add-bag btn-success"
          onClick={handleAddToBag}
        >
          <GrAddCircle /> Buy
        </button>
      )}
    </div>
  );
};

export default HomeItem;
