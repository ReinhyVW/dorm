export const deleteMeetingData = () => {
  for (let key in localStorage) {
    // Use parentheses to group conditions properly
    if (key.endsWith("-meetingData") || key.endsWith("-action")) {
      localStorage.removeItem(key);
    }
  }
};