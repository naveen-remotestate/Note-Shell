import axios from "axios";
// Geting all the folders
export async function getFolders() {
  try {
    const response = await axios.get(
      "https://nowted-server.remotestate.com/folders",
    );
    return response.data?.folders;
  } catch (error) {
    console.log(error);
  }
}
// for getting all the notes of a single folder by folderId
export async function getFolderNotesById(folderId: string | null) {
  try {
    const response = await axios.get(
      `https://nowted-server.remotestate.com/notes?archived=false&favorite=false&deleted=false&folderId=${folderId}&page=1&limit=10`,
    );
    // console.log(response.data?.notes);
    return response.data?.notes;
  } catch (error) {
    console.log(error);
  }
}
//getting all three recent notes
export async function getRecent() {
  try {
    const response = await axios.get(
      "https://nowted-server.remotestate.com/notes/recent",
    );
    return response.data?.recentNotes;
  } catch (error) {
    console.error(error);
  }
}
//getting the full note- content and details
export async function getNoteById(id: string | null) {
  try {
    const response = await axios.get(
      `https://nowted-server.remotestate.com/notes/${id}`,
    );
    // console.log(response.data.note);
    return response.data?.note;
  } catch (error) {
    console.log(error);
  }
}

//getting all the favorite notes
