import { useTranslation } from "next-i18next";

function FavoriteItem({ name, vehicle, selected, onPressItem }) {
  const { t } = useTranslation();
  return (
    <div
      className={
        selected
          ? "w-full border my-3 rounded-md border-l-4 p-3 border-success bg-white grid grid-cols-3"
          : "w-full border my-3 rounded-md border-l-4 p-3 border-primary bg-white grid grid-cols-3"
      }
      onClick={() => onPressItem(name)}
    >
      <div className="col-span-2">
        <p>{name}</p>
        <p>{vehicle}</p>
      </div>
      <div className="text-center">
        {!selected && (
          <p className="text-xs text-gray-400 p-1">
            {t("text_touch_to_select")}
          </p>
        )}
      </div>
    </div>
  );
}

export default FavoriteItem;
