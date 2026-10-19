import { describe, expect, it } from 'vitest';
import { dayDiff, datesBetween, getDaysRemaining, isTaskOnDate } from './dates';
describe('date utilities',()=>{
 it('calculates remaining calendar days without DST drift',()=>{expect(dayDiff('2026-10-19','2027-01-22')).toBe(95);expect(getDaysRemaining('2026-10-20','2026-10-19')).toBe(1);});
 it('generates inclusive date ranges',()=>{expect(datesBetween('2026-10-19','2026-10-21')).toEqual(['2026-10-19','2026-10-20','2026-10-21']);expect(datesBetween('2026-10-22','2026-10-21')).toEqual([]);});
 it('matches one-off and recurring tasks',()=>{const base={startDate:'2026-10-19',endDate:'2026-10-31'};expect(isTaskOnDate({...base,recurrence:'none'},'2026-10-20')).toBe(true);expect(isTaskOnDate({...base,recurrence:'daily'},'2026-10-22')).toBe(true);expect(isTaskOnDate({...base,recurrence:'weekly'},'2026-10-26')).toBe(true);expect(isTaskOnDate({...base,recurrence:'weekly'},'2026-10-27')).toBe(false);});
});