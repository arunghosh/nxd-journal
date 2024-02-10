export const Logger = {
  debug(message: any, ...optionsParams: any[]) {
    console.log(message, ...optionsParams);
  },
  error(message: any, ...optionsParams: any[]) {
    console.error(message, ...optionsParams);
  },
};
