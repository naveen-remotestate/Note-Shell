import { useNavigate, useParams } from "react-router";
import RestoreIcon from "../../assets / Icons/RestoreIcon";
import { useEffect, useState } from "react";
import { postRestoreNoteById } from "../../api/NotesApi";

export default function Restoretrash() {
  const paramdata = useParams();
  //   console.log(paramdata);
  const noteid = paramdata.noteid ? paramdata.noteid : "";
  const [isRestored, setIsRestored] = useState(false);

  const navigate = useNavigate();

  async function restoreNote(id: string) {
    console.log("restore note function");
    await postRestoreNoteById(id);
    setIsRestored(true);
    navigate("/Trash");
  }

  useEffect(() => {
    const init = () => {
      setIsRestored(false);
    };
    init();
  }, [noteid]);
  return (
    <>
      <div className=" flex flex-col items-center justify-center text-center h-full w-full">
        <div>
          <RestoreIcon />
        </div>
        <div className="overflow-scroll no-scrollbar truncate w-3xl">
          <h1 className="font-SourceSans3 text-3xl font-semibold text-headingcolor">
            Restore{`"${paramdata.name ? paramdata.name : "Untitled Note"}"`}
          </h1>
        </div>
        <div>
          <h3 className="font-SourceSans3 text-2xs font-semibold text-menutextcolor ">
            Don't want to lose this note? It's not too late! Just click the
            'Restore' button and it will be added back to your list. It's that
            simple.
          </h3>
        </div>
        <div>
          <button
            onClick={() => restoreNote(noteid)}
            className={`text-white rounded font-medium transition-transform duration-100 active:scale-95 text-sm px-4 py-2.5 ${
              isRestored
                ? "bg-activecolor "
                : "bg-activecolor hover:bg-activecolor/40"
            }`}
            disabled={isRestored}
          >
            {isRestored ? "Restored" : "Restore"}
          </button>
        </div>
      </div>
    </>
  );
}
