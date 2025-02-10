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

// utils.js
export const formatTimeOnly = (isoString) => {
  if (!isoString) {
    return "No time provided"; // Handle null or undefined input
  }

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    // Check for truly invalid dates
    return "Invalid Time"; // Handle cases where the date is truly invalid
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, 
  }).format(date);
};
