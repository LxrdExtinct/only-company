export interface TimePeriod {
  id: number;
  startYear: number;
  endYear: number;
  events: Event[];
}

export interface Event {
  id: number;
  year: number;
  description: string;
}
