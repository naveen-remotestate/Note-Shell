import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router";
function Notes() {
  const paramData = useParams(); //getting ID and Name of folder through params
  const folderHeading = paramData.name;
  const folderId = paramData.id;

  type allNotesType = {
    id: string;
    folderId: string;
    title: string;
    updatedAt: string;
    preview: string;
  };

  const [allNotes, setAllNotes] = useState<allNotesType[]>([]);
  async function getFolderNotes() {
    try {
      const response = await axios.get(
        `https://nowted-server.remotestate.com/notes?archived=false&favorite=false&deleted=false&folderId=${folderId}&page=1&limit=10`,
      );
      // console.log(response.data?.notes);
      setAllNotes(response.data?.notes);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (folderId) {
      getFolderNotes();
    }
  }, [folderId]);
  function getdate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }
  return (
    <>
      <div className="overflow-y-auto flex flex-col h-screen">
        <div>
          {
            <h1 className="text-headingcolor font-SourceSans3 text-2xl p-4 font-semibold ">
              {folderHeading}
            </h1>
          }
        </div>
        <div className="flex flex-col gap-3 pl-4 pr-4">
          {allNotes.map((item) => (
            <Link
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
              className="flex flex-col w-full h-fit bg-notesbg justify-center p-3 hover:bg-blue-500"
            >
              <h2 className=" w-full font-SourceSans3 font-semibold text-2xl text-headingcolor pl-3 pr-3 truncate">
                {item.title}
              </h2>
              <div className="flex flex-row font-SourceSans3 text-menutextcolor p-3 gap-4">
                <h3>{getdate(item.updatedAt)}</h3>
                <h3>{item.preview}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default Notes;
