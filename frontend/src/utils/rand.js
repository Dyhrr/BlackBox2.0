// Cryptographically secure randomness helpers using Web Crypto API

function ensureCrypto() {
  const c = (typeof window !== 'undefined' && (window.crypto || window.msCrypto))
  if (!c || !c.getRandomValues) {
    throw new Error('Secure RNG not available')
  }
  return c
}

export function randomUint32() {
  const crypto = ensureCrypto()
  const arr = new Uint32Array(1)
  crypto.getRandomValues(arr)
  return arr[0] >>> 0
}

// Returns an integer in [0, maxExclusive) without modulo bias
export function randomInt(maxExclusive) {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
    throw new Error('maxExclusive must be a positive integer')
  }
  const maxUint32 = 0x100000000 // 2^32
  const limit = Math.floor(maxUint32 / maxExclusive) * maxExclusive
  while (true) {
    const x = randomUint32()
    if (x < limit) return x % maxExclusive
  }
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function randomIdHex(bytes = 8) {
  const crypto = ensureCrypto()
  const arr = new Uint8Array(bytes)
  crypto.getRandomValues(arr)
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('')
}

