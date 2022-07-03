import { styled } from '@mui/material/styles';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';


export const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: "#5856b3",
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: "#3e3d74",
    },
    '&:active': {
      backgroundColor: "#3e3d74",
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

export const CustomClientPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsFull',
})(({ theme, dayIsFull, PastDayNotFull }) => ({
  ...(dayIsFull && {
    borderRadius: '50%',
    backgroundColor: "#ef6060",
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: "#3e3d74",
    },
  }),
  ...(PastDayNotFull && {
    borderRadius: '50%',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    '&:hover, &:focus': {
      backgroundColor: "#3e3d74",
    },
  }),

}));

