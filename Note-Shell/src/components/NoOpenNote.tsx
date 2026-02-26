import NoteIcon from "../assets/NoteIcon";

function NoOpenNote() {
  return (
    <>
      <div className=" flex flex-col items-center justify-center text-center h-full w-full">
        <div>
          <NoteIcon />
        </div>
        <div>
          <h1 className="font-SourceSans3 text-3xl font-semibold text-headingcolor">
            Select a note to view
          </h1>
        </div>
        <div>
          <h3 className="font-SourceSans3 text-2xs font-semibold text-menutextcolor ">
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </h3>
        </div>
      </div>
    </>
  );
}
export default NoOpenNote;
