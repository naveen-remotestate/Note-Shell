import axios from "axios";
import AddFolderIcon from "../assets/AddFolderIcon";
import CloseFolderIcon from "../assets/CloseFolderIcon";
import OpenFolderIcon from "../assets/OpenFolderIcon";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function Folders() {
  const test_folder_data = ["Personal", "Work", "Travel", "Events", "Finances"];

  type folderType = {
    id: string;
    name: string;
  };
  const [folders, setFolders] = useState<folderType[]>([]);

  async function getFolders() {
    try {
      const response = await axios.get(
        "https://nowted-server.remotestate.com/folders",
      );
      setFolders(response.data?.folders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFolders();
  }, []);

  function OpenFolder() {}

  return (
    <>
      <div className="flex flex-col text-left ">
        <div className="flex flex-row justify-between pl-3 pr-3 ">
          <h5 className="text-xs font-semibold">Folders</h5> <AddFolderIcon />
        </div>
        <div className="flex flex-col ">
          {folders.map((item) => (
            <Link
              key={item.id}
              to={`/components/${item.id}`}
              className="w-full flex flex-row gap-3 p-3 hover:bg-blue-500"
            >
              <CloseFolderIcon />
              <h3>{item.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default Folders;
