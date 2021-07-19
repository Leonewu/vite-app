/**
 * @description 计算乘积
 */
export const multiply = (...args: number[]) => {
  if (args.includes(0)) {
    return 0
  }
  let digits = 0
  const product = args.reduce((pre, cur) => {
    if (cur.toString().includes('.')) {
      const digit = cur.toString().length - cur.toString().indexOf('.') - 1
      pre *= Number((cur * 10 ** digit).toFixed(0))
      digits += digit
    } else {
      pre *= cur
    }
    return pre
  }, 1)
  return product / 10 ** digits
}

/**
 * 剔除不需要提交的参数
 * omit useless params like <undefined | [] | null | ''>
 */
export const omitParams = <T extends Record<string, any>>(params: T): T => {
  return Object.keys(params).reduce((pre, key) => {
    if (
      params[key] === undefined ||
      params[key] === null ||
      params[key] === ''
    ) {
      return pre
    }
    if (Array.isArray(params[key]) && !params[key].length) {
      return pre
    }
    ;(pre as Record<string, any>)[key] = params[key]
    return pre
  }, {} as T)
}

/**
  A string hashing function based on Daniel J. Bernstein's popular 'times 33' hash algorithm.
  @param {string} text - String to hash
  @return {number} Resulting number.
*/
export function hash(text: string): number {
  let res = 5381
  let index = text?.length
  while (index) {
    // eslint-disable-next-line no-plusplus
    res = (res * 33) ^ text.charCodeAt(--index)
  }
  return res >>> 0
}

export function pad(num: string | number, n: number) {
  num = num.toString()
  while (num.length < n) {
    num = `0${num}`
  }
  return num
}

/*
  const [value1, error1] = await wrap(fetch1());
  const [value2, error2] = await wrap(fetch2());
*/
export async function wrap(p: Promise<any>) {
  let value
  let error
  try {
    value = await p
    return [value, error]
  } catch (e) {
    error = e
    return [value, error]
  }
}
