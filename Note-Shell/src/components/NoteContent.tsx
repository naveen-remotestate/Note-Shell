import { useParams } from "react-router";
import NoOpenNote from "./NoOpenNote";
import OpenedNote from "./OpenedNote";

function NoteContent() {
  const paramData = useParams();
  // console.log(paramData);
  const noteId = paramData.noteid;
  const foldername = paramData.name ? paramData.name : null;
  return (
    <>
      <div className="overflow-scroll w-full">
        {noteId ? (
          <div>
            <OpenedNote id={noteId} foldername={foldername} />
          </div>
        ) : (
          <NoOpenNote />
        )}
      </div>
    </>
  );
}
export default NoteContent;
