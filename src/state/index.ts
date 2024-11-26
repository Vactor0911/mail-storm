import { atom } from "jotai";

export interface EmailProps {
  title: string;
  score?: number;
  result?: string;
}

export const emailsAtom = atom([{ title: "새로운 메일 제목" }] as EmailProps[]);

export const isInputActiveAtom = atom(true);

interface AnalysisResultProps {
  id: number;
  value: number;
  label: string;
}

export const analysisResultAtom = atom([] as AnalysisResultProps[]);
