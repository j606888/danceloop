export type DanceStyle = "bachata" | "salsa" | "zouk" | "kizomba";
export type RecordType = "party" | "course" | "workshop" | "other";
export type Visibility = "private" | "unlisted" | "public";

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