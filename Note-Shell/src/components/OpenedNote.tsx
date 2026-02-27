import { useEffect, useState } from "react";
import DateIcon from "../assets/DateIcon";
import FolderIcon from "../assets/FolderIcon";
import ThreeDotIcon from "../assets/ThreeDotIcon";
import axios from "axios";
type propType = {
  id: string;
  foldername: string | null;
};

function OpenedNote({ id, foldername }: propType) {
  type noteType = {
    id: string;
    title: string;
    content: string;
    isFavorite: boolean;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
  };
  const [note, setNote] = useState<noteType | null>(null);
  async function getNotes() {
    try {
      const response = await axios.get(
        `https://nowted-server.remotestate.com/notes/${id}`,
      );
      // console.log(response.data.note);
      setNote(response.data?.note);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (id) {
      getNotes();
    }
  }, [id]);
  // const getdate:string|null =note?.updatedAt?
  const date = new Date(note?.updatedAt ? note.updatedAt : "");

  return (
    <>
      <div id="frame18" className="flex flex-col h-full w-full p-12">
        <div id="frame24" className="flex flex-row justify-between p-2">
          <h1 className="text-headingcolor text-2xl font-SourceSans3 font-semibold">
            {note?.title}
          </h1>
          <div>
            <ThreeDotIcon />
          </div>
        </div>
        <div
          id="frame20"
          className="flex flex-col gap-3.5 font-SourceSans3 text-sm text-menutextcolor p-2"
        >
          <div id="frame19a" className="flex flex-row gap-5 pt-3 ">
            <DateIcon />
            <h4>Date</h4>
            <h4 className="text-headingcolor font-semibold  ">
              {date.toLocaleDateString()}
            </h4>
          </div>
          <div className="border-b bg-secondary"></div>
          <div id="frame19b" className="flex flex-row gap-5 ">
            <FolderIcon />
            <h4>Folder</h4>
            <h4 className="text-headingcolor font-semibold  ">{foldername}</h4>
          </div>
        </div>
        <div className="h-90/100 w-full text-headingcolor p-2">
          <textarea
            name="postContent"
            defaultValue={note?.content}
            placeholder="Enter Note"
            className="h-full w-full wrap-normal"
          />
        </div>
      </div>
    </>
  );
}
export default OpenedNote;
