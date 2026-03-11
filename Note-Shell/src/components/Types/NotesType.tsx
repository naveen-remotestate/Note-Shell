import type { foldertype } from "./FolderType";

type UniversalType = {
  id: string;
  folderId: string;
  title: string;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  preview: string;
  content: string;
  folder: foldertype;
};

export type ResponsePicked = Pick<
  UniversalType,
  | "id"
  | "folderId"
  | "title"
  | "isFavorite"
  | "isArchived"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "preview"
  | "folder"
>;
export type recentResponseType = {
  recentNotes: ResponsePicked[];
};
export type NotesType = {
  notes: ResponsePicked[];
  total: number;
};

type noteContentTypeOmit = Omit<UniversalType, "preview">;
export type noteContentType = {
  note: noteContentTypeOmit;
};
// type noteContentType
