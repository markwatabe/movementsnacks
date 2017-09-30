export default (seconds, showMs = false) => {
  let mins = `${Math.floor(seconds / 60)}`
  const numSeconds = seconds % 60
  let secs = numSeconds < 10 ? `0${numSeconds}` : `${numSeconds}`
  if (!showMs) {
    return `${mins}:${secs}`
  }
  if (mins.length === 1) {
    mins = `0${mins}`
  }
  if (secs.length === 2) {
    secs += '.00'
  }
  if (secs.length === 4) {
    secs += '0'
  }
  return `${mins}:${secs}`
}
