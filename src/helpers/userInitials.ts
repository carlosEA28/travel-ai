export function getInitials(fullName: string) {
  if (fullName) {
    const parts = fullName.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`;
    } else if (parts.length === 1) {
      return parts[0][0];
    }
  }
  return "?"; // Default fallback if no name information is available
}
