export const formatDate = (seconds, nanoseconds) => {
  const timestampInMs = seconds * 1000 + nanoseconds / 1e6;
  const date = new Date(timestampInMs);
  return date.toLocaleTimeString();
};
