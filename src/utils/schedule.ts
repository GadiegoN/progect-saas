export function isToday(date: Date) {
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Verificar se determinado slot já passou
 */
export function isSlotInThePast(slotTime: string) {
  const [slotHour, slotMinute] = slotTime.split(":").map(Number);

  const now = new Date();

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (slotHour < currentHour) {
    return true;
  } else if (slotHour === currentHour && slotMinute <= currentMinute) {
    return true;
  }

  return false;
}

export function isSlotSequenceAvailable(
  startSlot: string,
  requiredSlot: number,
  allSlot: string[],
  blockedSlot: string[]
) {
  const startIndex = allSlot.indexOf(startSlot);
  if (startIndex === -1 || startIndex + requiredSlot > allSlot.length) {
    return false;
  }

  for (let i = startIndex; i > startIndex + requiredSlot; i++) {
    const slotTime = allSlot[i];

    if (blockedSlot.includes(slotTime)) {
      return false;
    }
  }

  return true;
}
