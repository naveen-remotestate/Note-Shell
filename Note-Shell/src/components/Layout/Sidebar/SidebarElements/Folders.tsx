import AddFolderIcon from "../../../../assets / Icons/AddFolderIcon";
import CloseFolderIcon from "../../../../assets / Icons/CloseFolderIcon";
import OpenFolderIcon from "../../../../assets / Icons/OpenFolderIcon";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getFolders } from "../../../../api/FolderApi";
import { patchFolderName } from "../../../../api/FolderApi";
import TrashIcon from "../../../../assets / Icons/TrashIcon";
import { deleteFolder } from "../../../../api/FolderApi";
import { postFolder } from "../../../../api/FolderApi";
import { confirmDeleteDialog } from "../../../../assets / Icons/ConfirmDeleteDialog";

function Folders() {
  type folderType = {
    id: string;
    name: string;
  };
  const [folders, setFolders] = useState<folderType[]>([]);
  const [newFoldername, setNewFolderName] = useState<string>("");
  const [folderIdtoEdit, setFolderIdToEdit] = useState<string | null>("");
  const [creatingFolder, setCreatingFolder] = useState(false);

  async function getdata() {
    const data = await getFolders();
    setFolders(data);
  }
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
    getdata();
  }, []);
  //add new folder
  const AddFolder = () => {
    setCreatingFolder(true);
    setNewFolderName("");
  };

  async function createFolder() {
    if (!newFoldername.trim()) {
      setCreatingFolder(false);
      return;
    }

    try {
      await postFolder(newFoldername);
      await getdata();
    } catch (error) {
      console.log(error);
    }

    setCreatingFolder(false);
  }

  return (
    <>
      <div className="flex flex-col h-full text-left ">
        <div className="flex flex-row justify-between pl-3 pr-3 ">
          <h5 className="text-xs font-semibold">Folders</h5>
          <div onClick={AddFolder} className="cursor-pointer">
            <AddFolderIcon className="text-headingcolor hover:text-blue-500 transition" />
          </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
          {creatingFolder && (
            <div className="flex items-center gap-3 p-3">
              <OpenFolderIcon className="text-headingcolor" />

              <input
                autoFocus
                value={newFoldername}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={createFolder}
                onKeyDown={(e) => {
                  if (e.key === "Enter") createFolder();
                  if (e.key === "Escape") setCreatingFolder(false);
                }}
                className="bg-transparent border-b border-headingcolor outline-none w-full"
                placeholder="New folder"
              />
            </div>
          )}
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
                `w-full flex flex-row gap-3 p-3  items-center transition-colors duration-200 ${
                  isActive
                    ? "bg-activecolor text-white"
                    : "hover:bg-activecolor/40 group"
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
                          const confirmDelete = await confirmDeleteDialog(
                            "Are you sure you want to delete this folder?",
                          );
                          if (confirmDelete) {
                            await deleteFolder(item.id);

                            getdata();
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
