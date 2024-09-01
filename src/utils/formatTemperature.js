// ----------------------------------------------------------------------

export function fKelvinToCelsius(kelvin) {
  return kelvin ? <>{Math.floor(kelvin - 273.15)}&deg;</> : "";
}
