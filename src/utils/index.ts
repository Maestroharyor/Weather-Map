export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return {
      formattedDate: `${date.getMonth() + 1}/${date.getDate()}`,
      isToday: true,
      isTomorrow: false,
    };
  } else if (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  ) {
    return {
      formattedDate: `${date.getMonth() + 1}/${date.getDate()}`,
      isToday: false,
      isTomorrow: true,
    };
  } else {
    return {
      formattedDate: `${date.getMonth() + 1}/${date.getDate()}`,
      isToday: false,
      isTomorrow: false,
    };
  }
}

export function formatTemperature(kelvin: number) {
  return `${Math.round(kelvin - 273.15)} °C`;
}

export function capitalize(str: string): string {
  if (!str) return str; // handle empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}
