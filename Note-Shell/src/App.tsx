import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import NoteContent from "./components/NoteContent";
import { BrowserRouter, Route, Routes } from "react-router";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-row w-full h-screen overflow-hidden">
          <div className="bg-primary w-20/100 h-full flex flex-col text-center gap-6 text-menutextcolor font-SourceSans3-600 font-semibold ">
            <Sidebar />
          </div>

          <Routes>
            <Route
              path="folders/:id/:name"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Notes />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />
            {/* {" this is for favorite "} */}
            <Route
              path="folders/:id/:name"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Notes />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />

            <Route
              path="folders/:id/:name/content/:noteid"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Notes />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />
            <Route
              path="folders/:id/:name/content/:noteid"
              element={
                <>
                  <div className="bg-secondary w-25/100 h-full">
                    <Notes />
                  </div>
                  <div className="bg-primary w-55/100 h-full flex">
                    <NoteContent />
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
