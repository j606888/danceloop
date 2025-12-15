export type DanceStyle = "bachata" | "salsa" | "zouk" | "kizomba" | "lambada" | "hustle";
export type RecordType = "party" | "course" | "workshop" | "other";
export type Visibility = "private" | "unlisted" | "public";
export type PlaylistVisibility = "PRIVATE" | "UNLISTED" | "PUBLIC";

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

export const PLAYLIST_VISIBILITIES = {
  PRIVATE: "PRIVATE",
  UNLISTED: "UNLISTED",
  PUBLIC: "PUBLIC",
} as const;

export const PLAYLIST_VISIBILITY_LABELS = {
  PRIVATE: "私人",
  UNLISTED: "不公開",
  PUBLIC: "公開",
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
  },
  {
    label: 'Lambada',
    value: 'lambada',
  },
  {
    label: 'Hustle',
    value: 'hustle',
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

export const PLAYLIST_VISIBILITY_OPTIONS = [
  {
    label: "私人",
    value: PLAYLIST_VISIBILITIES.PRIVATE,
    description: "只有你或是追蹤的人能觀看",
  },
  {
    label: "不公開",
    value: PLAYLIST_VISIBILITIES.UNLISTED,
    description: "知道影片連結的人都能觀看清單內的影片",
  },
  {
    label: "公開",
    value: PLAYLIST_VISIBILITIES.PUBLIC,
    description: "所有人都能觀看這個清單內的影片",
  },
];