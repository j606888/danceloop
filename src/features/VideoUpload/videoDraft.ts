import { DanceStyle, RecordType, Visibility } from "@/lib/constants";

export type VideoDraft = {
  title: string;
  danceStyle: DanceStyle | "";
  recordType: RecordType | "";
  recordedAt: string;
  dancerIds: number[];
  visibility: Visibility;
  recordedDate: string;
  recordedTime: string;
}

export const initialDraft: VideoDraft = {
  title: "",
  danceStyle: "",
  recordType: "",
  recordedAt: "",
  dancerIds: [],
  visibility: "private",
  recordedDate: "",
  recordedTime: "",
}

type Action = 
  | { type: "SET_FIELD"; field: keyof VideoDraft; value: any }
  | { type: "TOGGLE_DANCER"; id: number }
  | { type: "REMOVE_DANCER"; id: number }
  | { type: "RESET" };

  export function videoDraftReducer(state: VideoDraft, action: Action): VideoDraft {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "TOGGLE_DANCER":
        return state.dancerIds.includes(action.id)
          ? { ...state, dancerIds: state.dancerIds.filter(x => x !== action.id) }
          : { ...state, dancerIds: [...state.dancerIds, action.id] };
      case "REMOVE_DANCER":
        return { ...state, dancerIds: state.dancerIds.filter(x => x !== action.id) };
      case "RESET":
        return initialDraft;
      default:
        return state;
    }
  }

export const bindSetField =
  (dispatch: React.Dispatch<Action>) =>
  <K extends keyof VideoDraft>(field: K) =>
  (value: VideoDraft[K]) =>
    dispatch({ type: "SET_FIELD", field, value })