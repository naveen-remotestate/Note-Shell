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

type ResponePicked = Pick<
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
export type recentResponeType = {
  recentNotes: ResponePicked[];
};
export type NotesType = {
  notes: ResponePicked[];
  total: number;
};

type noteContentTypeOmit = Omit<UniversalType, "preview">;
export type noteContentType = {
  note: noteContentTypeOmit;
};
// type noteContentType
