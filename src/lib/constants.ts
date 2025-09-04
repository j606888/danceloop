export type DanceStyle = "bachata" | "salsa" | "zouk" | "kizomba";
export type RecordType = "party" | "course" | "workshop" | "other";
export type Visibility = "private" | "unlisted" | "public";

export const VISIBILITIES = {
  PRIVATE: "private",
  UNLISTED: "unlisted",
  PUBLIC: "public",
} as const;

export const VISIBILITY_LABELS = {
  private: "私人",
  unlisted: "不公開",
  public: "公開",
}

export const DANCE_STYLES = [
  {
    label: 'Bachata',
    value: 'bachata'
  },
  {
    label: 'Salsa',
    value: 'salsa'
  },
  {
    label: 'Zouk',
    value: 'zouk'
  },
  {
    label: 'Kizomba',
    value: 'kizomba'
  }
]

export const RECORD_TYPES = [
  {
    label: 'Party',
    value: 'party'
  },
  {
    label: 'Course',
    value: 'course'
  },
  {
    label: 'Workshop',
    value: 'workshop'
  },
  {
    label: 'Other',
    value: 'other'
  }
]