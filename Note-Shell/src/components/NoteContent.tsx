import NoOpenNote from "./NoOpenNote";
import OpenedNote from "./OpenedNote";

function NoteContent() {
  const id = "ihfuf4fh98shufw8ewe4wfe4";
  return (
    <>
      <div className="bg-primary w-55/100 h-full flex">
        {id ? <OpenedNote /> : <NoOpenNote />}
      </div>
    </>
  );
}
export default NoteContent;
