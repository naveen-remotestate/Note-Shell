import { useState } from "react";
import axios from "axios";
function Notes() {
  const folderHeading = "Personal";

  const noteHeading = [
    {
      title: "My Goles for the Next Year",
      date: "31/12/2023",
      preview: "As the year...",
    },
    {
      title: "Reflection on the Month of June",
      date: "14/04/2026",
      preview: "I was reminiscing about...",
    },
    {
      title: "My Favorite Memories from Childhood and this is for",
      date: "11/02/2024",
      preview: "It's hard to believe that...",
    },
  ];

  const [defaultOpenFolder, setdefaultOpenFolder] = useState([]);

  async function getDefaultFolder() {
    const response = await axios.get(
      "https://nowted-server.remotestate.com/notes?archived=false&favorite=false&deleted=false&folderId=5b4ef2aa-57ac-411b-9c83-8507effa4b76&page=1&limit=10",
    );
    setdefaultOpenFolder(response.data.notes);
  }

  return (
    <>
      <div className="bg-secondary w-25/100 h-full">
        <div className="">
          {
            <h1 className="text-headingcolor font-SourceSans3 text-2xl p-4 font-semibold ">
              {folderHeading}
            </h1>
          }
        </div>
        <div className="flex flex-col gap-3 pl-4 pr-4 ">
          {noteHeading.map((item) => (
            <div
              key={item.title}
              className="flex flex-col w-full h-fit bg-notesbg justify-center p-3 hover:bg-blue-500"
            >
              <h2 className=" w-full font-SourceSans3 font-semibold text-2xl text-headingcolor pl-3 pr-3">
                {item.title}
              </h2>
              <div className="flex flex-row font-SourceSans3 text-menutextcolor p-3 gap-4">
                <h3>{item.date}</h3>
                <h3>{item.preview}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Notes;
