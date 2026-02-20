import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import NoteContent from "./components/NoteContent";
function App() {
  return (
    <>
      <div className="flex flex-row w-full h-screen ">
        <Sidebar />
        <Notes />
        <NoteContent />
      </div>
    </>
  );
}

export default App;
