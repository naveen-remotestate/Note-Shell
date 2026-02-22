import AddFolderIcon from "../assets/AddFolderIcon";
import CloseFolderIcon from "../assets/CloseFolderIcon";
import OpenFolderIcon from "../assets/OpenFolderIcon";

function Folders() {
  const test_folder_data = ["Personal", "Work", "Travel", "Events", "Finances"];
  return (
    <>
      <div className="flex flex-col gap-4 text-left ">
        <div id="folder-title" className="flex flex-row justify-between">
          <h5 className="text-xs font-semibold">Folders</h5> <AddFolderIcon />
        </div>
        <div className="flex flex-col gap-7 ">
          {test_folder_data.map((item) => (
            <div key={item} className="flex flex-row gap-3">
              <CloseFolderIcon />
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Folders;
