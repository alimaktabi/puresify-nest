export const PhoneNumberField = (v: string | any) =>
  /^(\+98|0)?9\d{9}$/.test(v) ||
  'فرمت شماره تلفن درست نمی باشد'
