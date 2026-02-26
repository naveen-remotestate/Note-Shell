import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import NoteContent from "./components/NoteContent";
import { BrowserRouter, Route, Routes } from "react-router";
function App() {
  return (
    <>
      <div className="flex flex-row w-full h-screen ">
        <BrowserRouter>
          <Sidebar />
          {/* <Notes /> */}
          <Routes>
            <Route path="components/:id" element={<Notes />}></Route>
          </Routes>
          <NoteContent />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
