export function timeStringToFloatMinutes(time: string): number {
  const hoursMinutesSeconds = time.split(/[.:]/)
  const hours = parseInt(hoursMinutesSeconds[0], 10)
  const minutes = hoursMinutesSeconds[1]
    ? parseInt(hoursMinutesSeconds[1], 10)
    : 0
  const seconds = hoursMinutesSeconds[2]
    ? parseInt(hoursMinutesSeconds[2], 10)
    : 0
  return hours * 60 + minutes + seconds / 60
}

export function floatMinutesTommss(minutes: number): string {
  const sign = minutes < 0 ? '-' : ''
  const min = Math.floor(Math.abs(minutes))
  const sec = Math.floor((Math.abs(minutes) * 60) % 60)
  return sign + (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec
}

export function sortAlphabetically(a: any, b: any) {
  return a === b ? 0 : a < b ? -1 : 1
}

export function sortCounterAlphabetically(a: any, b: any) {
  return a === b ? 0 : a > b ? -1 : 1
}

export const promisify =
  (func: Function) =>
  (...args: any[]) =>
    new Promise((resolve, reject) =>
      func(...args, (err: Error, result: any) =>
        err ? reject(err) : resolve(result)
      )
    );