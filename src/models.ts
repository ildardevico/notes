export class Track {
  id: number;
  text: string;
}

export class Options {
  limit: number;
  offset: number;
  tag: string|null;
  merge: boolean;
}

export class Tag  {
  label: string;
  value: string;
}
