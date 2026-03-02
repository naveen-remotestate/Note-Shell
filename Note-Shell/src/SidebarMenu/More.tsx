import ArchivedIcon from "../assets/ArchivedIcon";
import FavoritesIcon from "../assets/FavoritesIcon";
import TrashIcon from "../assets/TrashIcon";
import { Link } from "react-router";
function More() {
  return (
    <>
      <div className="flex flex-col text-left ">
        <div className="flex flex-row justify-between pl-3 pr-3 ">
          <h5 className="text-xs font-semibold">More</h5>
        </div>
        <div className="flex flex-col ">
          <Link to={"favorites"}>
            <div className="flex flex-row gap-3 p-3 hover:bg-blue-500">
              <FavoritesIcon />
              <h3>Favorites</h3>
            </div>
          </Link>
          <Link to={"Trash"}>
            <div className="flex flex-row gap-3 p-3 hover:bg-blue-500">
              <TrashIcon />
              <h3>Trash</h3>
            </div>
          </Link>
          <Link to={"archives"}>
            <div className="flex flex-row gap-3 p-3 hover:bg-blue-500">
              <ArchivedIcon />
              <h3>Archived Notes</h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default More;
