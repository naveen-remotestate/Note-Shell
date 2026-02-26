import Archived from "../assets/ArchivedIcon";
import Favorites from "../assets/FavoritesIcon";
import Trash from "../assets/TrashIcon";

function More() {
  return (
    <>
      <div className="flex flex-col text-left ">
        <div className="flex flex-row justify-between pl-3 pr-3 ">
          <h5 className="text-xs font-semibold">More</h5>
        </div>
        <div className="flex flex-col ">
          <div id="favorites">
            <div className="flex flex-row gap-3 p-3 hover:bg-blue-500">
              <Favorites />
              <h3>Favorites</h3>
            </div>
          </div>
          <div id="trash">
            <div className="flex flex-row gap-3 p-3 hover:bg-blue-500">
              <Trash />
              <h3>Trash</h3>
            </div>
          </div>
          <div id="archived">
            <div className="flex flex-row gap-3 p-3 hover:bg-blue-500">
              <Archived />
              <h3>Archived Notes</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default More;
