import Archived from "../assets/Archived";
import Favorites from "../assets/Favorites";
import Trash from "../assets/Trash";

function More() {
  return (
    <>
      <div className="flex flex-col gap-4 text-left ">
        <div>
          <h5 className="text-xs font-semibold">More</h5>{" "}
        </div>
        <div className="flex flex-col gap-7 ">
          <div id="favorites">
            <div className="flex flex-row gap-3">
              <Favorites />
              <h3>Favorites</h3>
            </div>
          </div>
          <div id="trash">
            <div className="flex flex-row gap-3">
              <Trash />
              <h3>Trash</h3>
            </div>
          </div>
          <div id="archived">
            <div className="flex flex-row gap-3">
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
