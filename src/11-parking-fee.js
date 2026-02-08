/**
 * 🅿️ City Central Parking
 *
 * City Central Parking garage is the busiest in downtown. They need an
 * automated system to calculate parking fees. Different vehicle types
 * have different rates, and there's a daily maximum so customers
 * aren't overcharged.
 *
 * Rates (first hour / each additional hour):
 *   - "car":        $5 first hour, then $3/hour
 *   - "motorcycle": $3 first hour, then $2/hour
 *   - "bus":        $10 first hour, then $7/hour
 *
 * Daily Maximum (fee can never exceed this):
 *   - "car":        $30
 *   - "motorcycle": $18
 *   - "bus":        $60
 *
 * Rules:
 *   - Partial hours are rounded UP (e.g., 1.5 hours → 2 hours)
 *   - The fee should never exceed the daily maximum
 *   - If hours is 0 or negative, return -1
 *   - If vehicleType is not "car", "motorcycle", or "bus", return -1
 *
 * Examples:
 *   - car, 1 hour     → $5
 *   - car, 3 hours    → $5 + $3 + $3 = $11
 *   - car, 0.5 hours  → rounds up to 1 hour → $5
 *   - car, 24 hours   → $5 + 23×$3 = $74 → capped at $30
 *
 * @param {number} hours - Number of hours parked
 * @param {string} vehicleType - "car", "motorcycle", or "bus"
 * @returns {number} Parking fee or -1 for invalid input
 */
export function calculateParkingFee(hours, vehicleType) {
 
  if (hours <= 0 || typeof hours !== 'number') {
    return -1;
  }

  // 2. Round Up Hours (e.g., 1.2 becomes 2)
  const totalHours = Math.ceil(hours);
  
  let firstHourRate, additionalHourRate, dailyMax;

  // 3. Set Rates based on Vehicle Type
  switch (vehicleType.toLowerCase()) {
    case "car":
      firstHourRate = 5;
      additionalHourRate = 3;
      dailyMax = 30;
      break;
    case "motorcycle":
      firstHourRate = 3;
      additionalHourRate = 2;
      dailyMax = 18;
      break;
    case "bus":
      firstHourRate = 10;
      additionalHourRate = 7;
      dailyMax = 60;
      break;
    default:
      return -1; // Invalid vehicle type
  }

  // 4. Calculate Raw Fee
  // Fee = First hour + (remaining hours * additional rate)
  let rawFee = firstHourRate + (totalHours - 1) * additionalHourRate;

  // 5. Apply Daily Maximum Cap
  // Return the smaller of the raw fee or the max cap
  return Math.min(rawFee, dailyMax);
}

