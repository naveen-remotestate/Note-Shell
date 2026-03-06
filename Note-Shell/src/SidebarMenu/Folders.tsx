import AddFolderIcon from "../assets/AddFolderIcon";
import CloseFolderIcon from "../assets/CloseFolderIcon";
import OpenFolderIcon from "../assets/OpenFolderIcon";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getFolders } from "../api/get";
import { patchFolderName } from "../api/patch";
import TrashIcon from "../assets/TrashIcon";
import { deleteFolder } from "../api/delete";
import { postFolder } from "../api/post";

function Folders() {
  type folderType = {
    id: string;
    name: string;
  };
  const [folders, setFolders] = useState<folderType[]>([]);
  const [newFoldername, setNewFolderName] = useState<string>("");
  const [folderIdtoEdit, setFolderIdToEdit] = useState<string | null>("");
  // function for updating foldername
  async function updateFolderName(id: string) {
    if (newFoldername.trim() === "") {
      setFolderIdToEdit(null);
      return;
    }
    try {
      await patchFolderName(id, newFoldername);
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
  //add new folder
  const AddFolder = async () => {
    const name = prompt("Enter folder name");
    if (!name || !name.trim()) return;

    try {
      const newFolder = await postFolder(name);
      setFolders((prev) => [...prev, newFolder]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full text-left ">
        <div className="flex flex-row justify-between pl-3 pr-3 ">
          <h5 className="text-xs font-semibold">Folders</h5>
          <div onClick={AddFolder} className="cursor-pointer">
            <AddFolderIcon className="text-headingcolor hover:text-blue-500 transition" />
          </div>
        </div>
        <div className="flex flex-col group flex-1 overflow-y-auto no-scrollbar">
          {folders.map((item) => (
            <NavLink
              to={`/folders/${item.id}/${item.name}`}
              key={item.id}
              onDoubleClick={(e) => {
                e.preventDefault();
                setFolderIdToEdit(item.id);
                setNewFolderName(item.name);
              }}
              className={({ isActive }) =>
                `w-full flex flex-row gap-3 p-3 group items-center transition-colors duration-200 ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500/40"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div>
                    {isActive ? (
                      <OpenFolderIcon className="text-headingcolor" />
                    ) : (
                      <CloseFolderIcon className="text-headingcolor" />
                    )}
                  </div>

                  {folderIdtoEdit === item.id ? (
                    <input
                      autoFocus
                      value={newFoldername}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      onBlur={() => updateFolderName(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") updateFolderName(item.id);
                        if (e.key === "Escape") setFolderIdToEdit(null);
                      }}
                      className="bg-transparent border-b group border-white outline-none w-full"
                    />
                  ) : (
                    <div className=" flex items-center group justify-between w-full gap-2">
                      <div className="flex-1 w-0">
                        <h3 className="truncate">{item.name}</h3>
                      </div>

                      <div
                        className="flex opacity-0 group-hover:opacity-100 shrink-0"
                        onClick={async (e) => {
                          e.preventDefault();
                          const confirmDelete = window.confirm(
                            "Are you sure you want to delete this folder?",
                          );
                          if (confirmDelete) {
                            await deleteFolder(item.id);
                            setFolders((prev) =>
                              prev.filter((f) => f.id !== item.id),
                            );
                          }
                        }}
                      >
                        <TrashIcon />
                      </div>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
export default Folders;
