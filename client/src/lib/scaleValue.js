export default function scaleValue(
  input,
  minInput,
  maxInput,
  minOutput,
  maxOutput,
  clip = false
) {
  const rangeInput = maxInput - minInput;
  const rangeOutput = maxOutput - minOutput;
  const ratio = rangeOutput / rangeInput;
  const scaledValue = minOutput + (input - minInput) * ratio;
  const realOutputMin = Math.min(minOutput, maxOutput);
  const realOutputMax = Math.max(minOutput, maxOutput);
  if (clip) {
    if (scaledValue > realOutputMax) return realOutputMax;
    if (scaledValue < realOutputMin) return realOutputMin;
  }
  return scaledValue;
}
