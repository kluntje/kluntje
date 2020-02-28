import { addDays } from '../lib/addDays';

describe('addDays tests:', () => {
  const testDate1 = new Date(2020, 1, 25, 22, 30);
  const testDate2 = new Date(2019, 11, 31, 23, 15);
  const testDate3 = new Date(2018, 6, 30, 0, 11);

  test('should add given number of days to given date', () => {
    const out1 = addDays(testDate1, 2);
    const out2 = addDays(testDate2, 2);
    const out3 = addDays(testDate3, 2);
    expect({
      year: out1.getFullYear(),
      month: out1.getMonth(),
      date: out1.getDate(),
      hours: out1.getHours(),
      minutes: out1.getMinutes(),
    }).toEqual({
      year: 2020,
      month: 1,
      date: 27,
      hours: 22,
      minutes: 30,
    });
    expect({
      year: out2.getFullYear(),
      month: out2.getMonth(),
      date: out2.getDate(),
      hours: out2.getHours(),
      minutes: out2.getMinutes(),
    }).toEqual({
      year: 2020,
      month: 0,
      date: 2,
      hours: 23,
      minutes: 15,
    });
    expect({
      year: out3.getFullYear(),
      month: out3.getMonth(),
      date: out3.getDate(),
      hours: out3.getHours(),
      minutes: out3.getMinutes(),
    }).toEqual({
      year: 2018,
      month: 7,
      date: 1,
      hours: 0,
      minutes: 11,
    });
  });

  test('should set hours, minutes, seconds and ms to zero if zeroHours flag ist set to true', () => {
    const out = addDays(testDate1, 3, true);
    expect({
      year: out.getFullYear(),
      month: out.getMonth(),
      date: out.getDate(),
      hours: out.getHours(),
      minutes: out.getMinutes(),
      seconds: out.getSeconds(),
      ms: out.getMilliseconds(),
    }).toEqual({
      year: 2020,
      month: 1,
      date: 28,
      hours: 0,
      minutes: 0,
      seconds: 0,
      ms: 0,
    });
  });

  test('should not mutate given date', () => {
    addDays(testDate1, 2);
    expect({
      year: testDate1.getFullYear(),
      month: testDate1.getMonth(),
      date: testDate1.getDate(),
    }).toEqual({
      year: 2020,
      month: 1,
      date: 25,
    });
  });
});
