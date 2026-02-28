import AddFolderIcon from "../assets/AddFolderIcon";
import CloseFolderIcon from "../assets/CloseFolderIcon";
import OpenFolderIcon from "../assets/OpenFolderIcon";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getFolders } from "../api/get";
import { patchFolderName } from "../api/patch";

function Folders() {
  type folderType = {
    id: string;
    name: string;
  };
  const [folders, setFolders] = useState<folderType[]>([]);
  const [newFoldername, setNewFolderName] = useState<string>("");
  const [folderIdtoEdit, setFolderIdToEdit] = useState<string | null>("");

  async function updateFolderName(id: string) {
    if (newFoldername.trim() === "") {
      setFolderIdToEdit(null);
      return;
    }
    try {
      patchFolderName(id, newFoldername);
      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === id ? { ...folder, name: newFoldername } : folder,
        ),
      );
    } catch (error) {
      console.log(error);
    }
    setFolderIdToEdit(null);
  }

  useEffect(() => {
    async function getdata() {
      const data = await getFolders();
      setFolders(data);
    }
    getdata();
  }, []);

  return (
    <>
      <div className="flex flex-col text-left overflow-scroll ">
        <div className="flex flex-row justify-between pl-3 pr-3 ">
          <h5 className="text-xs font-semibold">Folders</h5>
          <div>
            <AddFolderIcon />
          </div>
        </div>
        <div className="flex flex-col overflow-y-auto max-h-96 ">
          {folders.map((item) => (
            <Link
              to={`/folders/${item.id}/${item.name}`}
              key={item.id}
              onDoubleClick={(e) => {
                e.preventDefault();
                setFolderIdToEdit(item.id);
                setNewFolderName(item.name);
              }}
              className="w-full flex flex-row gap-3 p-3 hover:bg-blue-500 items-center"
            >
              <CloseFolderIcon />
              {folderIdtoEdit === item.id ? (
                <input
                  autoFocus
                  value={newFoldername}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onBlur={() => updateFolderName(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateFolderName(item.id);
                    }
                    if (e.key === "Escape") {
                      setFolderIdToEdit(null);
                    }
                  }}
                  className="bg-transparent border-b border-white outline-none w-full"
                />
              ) : (
                <h3>{item.name}</h3>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default Folders;
