export const onPushStateGoForwardSkip = (history) => (event) => {
  history.goForward();
  // Prevent the default behavior of the event
  event.preventDefault();
};
