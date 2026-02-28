import axios from "axios";

export async function patchFolderName(id: string, foldername: string) {
  await axios.patch(`https://nowted-server.remotestate.com/folders/${id}`, {
    name: foldername,
  });
}
