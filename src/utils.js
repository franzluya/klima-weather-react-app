export const formatTime = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    hour12: true,
  }).format(date);
};
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    hour12: true,
  }).format(date);
};
