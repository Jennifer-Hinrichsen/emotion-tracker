export default function categorizeIntensity(average) {
  if (average >= 1 && average <= 1.5) {
    return "Low";
  } else if (average > 1.5 && average <= 2.5) {
    return "Medium";
  } else if (average > 2.5 && average <= 3) {
    return "High";
  }
}
