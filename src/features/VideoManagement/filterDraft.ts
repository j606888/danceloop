import { DanceStyle, RecordType } from "@/lib/constants";

export type FilterDraft = {
  title: string;
  danceStyle: DanceStyle | "";
  recordType: RecordType | "";
  dancerIds: number[];
}

export const initialFilterDraft: FilterDraft = {
  title: "",
  danceStyle: "",
  recordType: "",
  dancerIds: [],
}

type Action = 
  | { type: "SET_FIELD"; field: keyof FilterDraft; value: any }
  | { type: "ADD_DANCER"; id: number }
  | { type: "REMOVE_DANCER"; id: number }
  | { type: "RESET" };

export function filterDraftReducer(state: FilterDraft, action: Action): FilterDraft {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_DANCER":
      return { ...state, dancerIds: [...state.dancerIds, action.id] };
    case "REMOVE_DANCER":
      return { ...state, dancerIds: state.dancerIds.filter((id) => id !== action.id) };
    case "RESET":
      return initialFilterDraft;
    default:
      return state;
  }
}

export const bindSetField =
  (dispatch: React.Dispatch<Action>) =>
  <K extends keyof FilterDraft>(field: K) =>
  (value: FilterDraft[K]) =>
  dispatch({ type: "SET_FIELD", field, value });