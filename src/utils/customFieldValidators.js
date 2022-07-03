import { EMAIL_FORMAT_REGEX, PASSWORD_FORMAT_REGEX } from 'utils/constants';

export const emaiFormatValidator = (value) => new RegExp(EMAIL_FORMAT_REGEX).test(value);
export const passwordFormatValidator = (value) => new RegExp(PASSWORD_FORMAT_REGEX).test(value);
