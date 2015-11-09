export function formatTime(timestamp) {
  let d = new Date(0, 0, 0, 0, 0, 0, timestamp)
  return [
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
  ].map(t => t < 10 ? `0${t}` : t).join(":").replace(/(^00:0|^00:|^0)/, "")
}
