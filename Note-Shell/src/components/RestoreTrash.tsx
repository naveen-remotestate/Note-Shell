import { useParams } from "react-router";
import RestoreIcon from "../assets/RestoreIcon";
import { useEffect, useState } from "react";

export default function Restoretrash() {
  const paramdata = useParams();
  //   console.log(paramdata);
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    setIsRestored(false);
  }, [paramdata.noteid]);
  return (
    <>
      <div className=" flex flex-col items-center justify-center text-center h-full w-full">
        <div>
          <RestoreIcon />
        </div>
        <div>
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
            onClick={() => setIsRestored(true)}
            disabled={isRestored}
            className={`text-white rounded font-medium transition-transform duration-100 active:scale-95 text-sm px-4 py-2.5 ${
              isRestored
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-emerald-500"
            }`}
          >
            {isRestored ? "Restored" : "Restore"}
          </button>
        </div>
      </div>
    </>
  );
}
