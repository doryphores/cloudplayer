export function formatTime(timestamp) {
  let d = new Date(timestamp)
  return [
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
  ].map(t => t < 10 ? `0${t}` : t).join(":").replace(/^00:/, "")
}
