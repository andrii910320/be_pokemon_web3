export const isValidStatus = (status) => {
  const validStatusFromWS = new Set(["start", "attack"]);
  return validStatusFromWS.has(status);
};
