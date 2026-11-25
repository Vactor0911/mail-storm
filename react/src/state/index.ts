import { atom } from "jotai";

export interface EmailProps {
  title: string;
  result?: string;
}

export const emailsAtom = atom([{ title: "" }] as EmailProps[]);

export const isInputActiveAtom = atom(true);
