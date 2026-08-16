import { EligibilityFormData, EligibilityResult } from "@/types";

/**
 * Calculates eligibility based on age, weight, gender and donation history according to Hemora rules.
 */
export function calculateEligibility(data: EligibilityFormData): EligibilityResult {
  // Logic will be implemented in the eligibility step
  return { status: "eligible" };
}

/**
 * Calculates the next eligible donation date if interval condition is not yet met.
 */
export function getNextEligibleDate(lastDonationDate: string, gender: "male" | "female"): string {
  // Logic will be implemented in the eligibility step
  return "";
}
