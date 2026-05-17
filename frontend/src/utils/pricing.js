export const PRICING_CONFIG = {
  base: { same_city: 25, department: 40, international: 150 },
  per_kg: 5,
  multipliers: { standard: 1, express: 1.5 },
  extras: { pickup: 15, insurance_rate: 0.10 }
};

export const calculateShipping = (data) => {
  const { origin, weight, length, width, height, serviceLevel, extras } = data;
  const costBase = PRICING_CONFIG.base[origin] || 0;
  
  // Calcular peso volumétrico si hay dimensiones (regla general: L * W * H / 5000)
  let volumetricWeight = 0;
  if (length && width && height) {
    volumetricWeight = (length * width * height) / 5000;
  }
  
  // Cobrar por el mayor entre el peso real y el volumétrico
  const chargeableWeight = Math.max(weight, volumetricWeight);
  const costWeight = chargeableWeight * PRICING_CONFIG.per_kg;
  
  let total = (costBase + costWeight) * PRICING_CONFIG.multipliers[serviceLevel];
  
  const pickupCost = extras.includes('pickup') ? PRICING_CONFIG.extras.pickup : 0;
  const insuranceCost = extras.includes('insurance') ? (costBase * PRICING_CONFIG.extras.insurance_rate) : 0;
  
  const finalTotal = total + pickupCost + insuranceCost;

  return {
    breakdown: { 
      costBase, 
      costWeight: costWeight.toFixed(2), 
      pickupCost, 
      insuranceCost: insuranceCost.toFixed(2),
      chargeableWeight: chargeableWeight.toFixed(2),
      appliedVolumetric: volumetricWeight > weight
    },
    total: finalTotal.toFixed(2),
    timeEstimate: getTimeEstimate(origin, serviceLevel)
  };
};

const getTimeEstimate = (origin, service) => {
  const estimates = {
    same_city: { standard: "24 horas", express: "4 horas" },
    department: { standard: "2-3 días", express: "24 horas" },
    international: { standard: "7-10 días", express: "3-5 días" }
  };
  return estimates[origin][service];
};