const PI: number = 3.14159265359;

function f2u(x: number): number {
  const u: number = Number.MAX_SAFE_INTEGER & x;
  return u;
}

function u2f(u: number): number {
  const x: number = u;
  return x;
}

function fmul_fast(a: number, b: number): number {
  const ia: number = f2u(a);
  const ib: number = f2u(b);
  return u2f((ia + ib - 0x3F800000) + (((ia ^ ib) & 0x007FFFFFu) >> 4));
}

function fdiv_fast(a: number, b: number): number {
  const ia: number = f2u(a);
  const ib: number = f2u(b);
  return u2f((ia - ib + 0x3F800000) - (((ia ^ ib) & 0x007FFFFFu) >> 4));
}

function finv_fast(x: number): number {
  const ix: number = f2u(x);
  return u2f((0x7F000000 - ix) + ((ix & 0x007FFFFFu) >> 3));
}

function fsqrt_fast(x: number): number {
  const ix: number = f2u(x);
  return u2f((ix >> 1) + 0x1FC00000 + ((ix & 0x007FFFFFu) >> 5));
}

function frsqrt_fast(x: number): number {
  const ix: number = f2u(x);
  return u2f((0x5F400000 - (ix >> 1)) + ((ix & 0x007FFFFFu) >> 4));
}

function fcos_fast(x: number): number {
  const x2: number = fmul_fast(x, x);
  return 1.0 + x2 * (-0.5 + x2 * (0.04166652 + fmul_fast(-0.0013854855, x2)));
}

function fsine_fast(x: number): number {
  const B: number = 4 / PI;
  const C: number = -4 / (PI * PI);

  let y: number = B * x + C * x * Math.abs(x);

  // #ifdef EXTRA_PRECISION
  //   const float Q = 0.775;
  //   const float P = 0.225;

  //   y = P * (y * abs(y) - y) + y;   // Q * y + P * y * abs(y)
  // #endif

  return y;
}