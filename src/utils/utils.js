export const composeName = (lastName, firstName) => {
  if (lastName && firstName) {
    return `${lastName} ${firstName}`;
  }

  return '-';
};

//   statusIcon = '🔴';
//   statusIcon = '🟢';
//   statusIcon = '🟡';


export const composeLocation = (address, city) => {
  let statusIcon = '🟢';
  return `${statusIcon} ${address} - ${city}`;
};

export const componseFullDate = (year, month, day) => `${year}.${month}.${day}`;
export const compareExactDates = (message1, message2) => Date.parse(message1.datetime)
 - Date.parse(message2.datetime);
export const compareDates = (message1, message2) => Date.parse(message1.datetime?.split('T')[0])
 - Date.parse(message2.datetime?.split('T')[0]);



export const dateCompute = (month, year) => (`${month} ${year}`);

export const computeLastYearDate = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  if (currentMonth !== 12) {
    return { month: currentMonth + 1, year: currentYear - 1 };
  }
  return { month: 1, year: currentYear };
};


