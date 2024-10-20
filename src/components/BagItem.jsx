import { useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { bagActions } from "../store/bagSlice";

const BagItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="bag-item-container">
      <div className="item-left-part">
        <img className="bag-item-img" src={item.thumbnail} />
      </div>
      <div className="item-right-part">
        <div className="company">{item.brand}</div>
        <div className="item-name">{item.title}</div>
        <div className="price-container">
          <span className="current-price">
            Rs {(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
          </span>
          <span className="original-price">Rs {item.price}</span>
          <span className="discount-percentage">
            ({item.discountPercentage}% OFF)
          </span>
        </div>
        <div className="return-period">
          <span className="return-period-days">{item.returnPeriod} days</span>{" "}
          return available
        </div>
        <div className="delivery-details">
          Delivery by
          <span className="delivery-details-days">{item.deliveryDate}</span>
        </div>
      </div>

      <div className="remove-from-cart" onClick={handleRemoveItem}>
        <RiDeleteBin5Fill />
      </div>
    </div>
  );
};

export default BagItem;
