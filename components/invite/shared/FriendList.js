import FriendItem from "./FriendItem";
import useWindowSize from "../../../hooks/useWindowSize";

function FriendList({ friends, onRemovePress, onAddFav }) {
  const { height } = useWindowSize();
  return (
    <div className="p-4 overflow-auto bg-gray-100 rounded-md" style={{ height: height / 4 || 100 }}>
      {friends &&
        friends.length > 0 &&
        friends.map((item, index) => (
          <FriendItem
            key={index}
            name={item.name}
            vehicle={item.vehicle}
            favorite={item.favorite}
            onAddFav={onAddFav}
            onPressItem={() => onRemovePress(item.name)}
          />
        ))}
    </div>
  );
}

export default FriendList;
