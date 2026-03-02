import axios from "axios";

export async function postFolder(folderName: string) {
  const response = await axios.post(
    `https://nowted-server.remotestate.com/folders`,
    {
      name: folderName,
    },
  );
  return response.data;
}

export async function postRestoreNoteById(noteid: string) {
  await axios.post(
    `https://nowted-server.remotestate.com/notes/${noteid}/restore`,
  );
}
