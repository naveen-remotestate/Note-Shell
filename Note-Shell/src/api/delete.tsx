import axios from "axios";
export async function deleteFolder(folderId: string) {
  try {
    await axios.delete(
      `https://nowted-server.remotestate.com/folders/${folderId}`,
    );
  } catch (error) {
    console.log(error);
  }
}
export async function deleteNote(noteid: string) {
  try {
    await axios.delete(`https://nowted-server.remotestate.com/notes/${noteid}`);
  } catch (error) {
    console.log(error);
  }
}
