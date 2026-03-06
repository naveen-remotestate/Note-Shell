import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { getFolderNotesById } from "../api/get";
function Notes() {
  const paramData = useParams(); //getting ID and Name of folder through params
  const folderHeading = paramData?.name;
  const folderId = paramData.id ? paramData.id : null;
  const { noteid } = useParams();

  type allNotesType = {
    id: string;
    folderId: string;
    title: string;
    updatedAt: string;
    preview: string;
  };

  const [allNotes, setAllNotes] = useState<allNotesType[]>([]);

  useEffect(() => {
    if (folderId) {
      async function getdata() {
        const data = await getFolderNotesById(folderId);
        setAllNotes(data);
      }
      getdata();
    }
  }, [folderId, noteid]);

  function getdate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }
  return (
    <div className="flex flex-col h-full w-full">
      {/* Fixed Title */}
      <div>
        <h1 className="text-headingcolor overflow-x-auto no-scrollbar font-SourceSans3 text-2xl p-4 font-semibold mr-5">
          {folderHeading}
        </h1>
      </div>

      {/* Scrollable Notes */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {allNotes.length !== 0 ? (
          <div className="flex flex-col gap-3 pl-4 pr-4 pb-4">
            {allNotes.map((item) => (
              <NavLink
                to={
                  "/folders/" +
                  item.folderId +
                  "/" +
                  paramData.name +
                  "/" +
                  "content/" +
                  item.id
                }
                key={item.id}
                className={({ isActive }) =>
                  `w-full flex flex-col p-3 transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-notesbg hover:bg-blue-500/40"
                  }`
                }
              >
                <h2 className="w-full font-SourceSans3 overflow-hidden font-semibold text-2xl text-headingcolor pl-3 pr-3 truncate">
                  {item.title}
                </h2>

                <div className="flex flex-row overflow-hidden font-SourceSans3 text-menutextcolor p-3 gap-4">
                  <h3>{getdate(item.updatedAt)}</h3>
                  <h3 className="truncate">{item.preview}</h3>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          <h2 className="flex justify-center items-center text-menutextcolor h-full">
            This Folder is Empty
          </h2>
        )}
      </div>
    </div>
  );
}
export default Notes;
