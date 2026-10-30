/**
 * Geographic calculation service for HarvestRoute
 * Computes Haversine great-circle distance, road route multiplier, and cargo transit duration.
 */

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Great-circle distance between two GPS coordinates in kilometers
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates estimated road driving distance using regional road tortuosity factor (1.28x)
 */
function getRoadDistance(lat1, lon1, lat2, lon2) {
  const directKm = haversineDistance(lat1, lon1, lat2, lon2);
  // If origin and market are within the same town/APMC radius
  if (directKm < 5) {
    return Math.max(5, Math.round(directKm * 1.15 * 10) / 10);
  }
  const roadKm = directKm * 1.28;
  return Math.round(roadKm * 10) / 10;
}

/**
 * Calculates transit hours for cargo trucks (average 40 km/h on Indian highways + loading buffer)
 */
function getTransitDurationHours(distanceKm, speedKmph = 40) {
  const baseHours = distanceKm / speedKmph;
  // Add 0.25h (15 mins) for urban ingress/egress & toll halts
  return Math.round((baseHours + 0.25) * 10) / 10;
}

module.exports = {
  haversineDistance,
  getRoadDistance,
  getTransitDurationHours
};

