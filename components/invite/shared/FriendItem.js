import { FaStar, FaTimesCircle } from "react-icons/fa";
function FriendItem({ name, vehicle, favorite, onPressItem, onAddFav }) {
  return (
    <div
      className={
        favorite
          ? "w-full border my-3 rounded-md border-l-4 p-3 border-success bg-white grid grid-cols-4"
          : "w-full border my-3 rounded-md border-l-4 p-3 border-primary bg-white grid grid-cols-4"
      }
    >
      <div className="">
        <FaStar
          className={favorite ? "text-yellow-500" : "text-gray-300"}
          onClick={() => onAddFav(name, vehicle, favorite)}
          size={40}
        />
      </div>
      <div className="col-span-2">
        <p>{name}</p>
        <p>{vehicle}</p>
      </div>
      <div className="p-2 m-auto">
        <FaTimesCircle
          className="text-red-600 "
          onClick={() => onPressItem(name)}
          size={40}
        />
      </div>
    </div>
  );
}

export default FriendItem;
