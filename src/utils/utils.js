import { LOCATION_RENTAL_STATUSES } from './constants';

export const composeAddress = (line1, line2) => (
  (line2 && [line1, line2].join(', ')) || line1
);

export const composeName = (lastName, firstName) => {
  if (lastName && firstName) {
    return `${lastName} ${firstName}`;
  }

  return '-';
};

// export const composeLocation = (address, city, status) => {
//   let statusIcon = '🔴';
//   if (status === LOCATION_RENTAL_STATUSES.rented) {
//     statusIcon = '🟢';
//   }
//   if (status === LOCATION_RENTAL_STATUSES.pending) {
//     statusIcon = '🟡';
//   }
//   return `${statusIcon} ${address} - ${city}`;
// };

export const composeLocation = (address, city) => {
  let statusIcon = '🟢';
  return `${statusIcon} ${address} - ${city}`;
};

export const composeRentedLocation = (address, city) => `${address} - ${city}`;
export const getStatusClassName = (status) => {
  if (status === 1) {
    return 'open';
  }
  if (status === 2) {
    return 'to-pay';
  }
  if (status === 3) {
    return 'pending';
  }
  if (status === 4) {
    return 'paid';
  }
  return 0;
};

export const componseFullDate = (year, month, day) => `${year}.${month}.${day}`;
export const compareExactDates = (message1, message2) => Date.parse(message1.datetime)
 - Date.parse(message2.datetime);
export const compareDates = (message1, message2) => Date.parse(message1.datetime?.split('T')[0])
 - Date.parse(message2.datetime?.split('T')[0]);

export const utilityStatisticReducer = (utilityBills, summaryId, utilityNumber) => utilityBills
  .reduce(
    (total, utilityBill) => {
      if (utilityBill.type === utilityNumber
        && utilityBill.billSummaryId.toString() === summaryId) {
        return total + Number(utilityBill.amount);
      } return total;
    },
    0,
  );

export const utilityMonthsAggregator = (
  intervalData, monthValue, type,
) => (intervalData
  .filter((data) => (data.month === monthValue))
  .reduce(
    (total, currentValue) => total + currentValue[type],
    0,
  ));

export const dateCompute = (month, year) => (`${month} ${year}`);

export const computeLastYearDate = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  if (currentMonth !== 12) {
    return { month: currentMonth + 1, year: currentYear - 1 };
  }
  return { month: 1, year: currentYear };
};

export const verifyDateInTimePeriodSelected = (fromDate, untilDate, month, year) => {
  const fromYear = fromDate[0];
  const fromMonth = fromDate[1];

  const untilYear = untilDate[0];
  const untilMonth = untilDate[1];

  if (fromYear < year && untilYear > year) {
    return true;
  }
  if (fromYear === year && untilYear > year) {
    if (fromMonth <= month) {
      return true;
    }
    return false;
  }
  if (fromYear < year && untilYear === year) {
    if (untilMonth >= month) {
      return true;
    }
    return false;
  }
  if (fromYear === year && untilYear === year) {
    if (fromMonth <= month && untilMonth >= month) {
      return true;
    }
    return true;
  }
  return false;
};

export const findFirstUtilityBill = (data) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  return (
    data.reduce(([smallestYear, smallestMonth], utilityBill) => {
      if (Number(utilityBill.year) === smallestYear) {
        if (utilityBill.month < smallestMonth) {
          return [Number(utilityBill.year), utilityBill.month];
        }
      } else if (Number(utilityBill.year) < smallestYear) {
        return [Number(utilityBill.year), utilityBill.month];
      } return [smallestYear, smallestMonth];
    }, [currentYear, currentMonth]));
};
