/**
 * Opening Hours feature types
 */

export interface DaySchedule {
  open: string | null;
  close: string | null;
  isOpen: boolean;
}

export interface OpeningHours {
  id: number;
  startDate: string;
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}
