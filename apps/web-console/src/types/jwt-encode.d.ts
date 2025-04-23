declare module 'jwt-encode' {
  function jwtEncode(
    payload: any,
    secret: string,
    options?: { alg?: string }
  ): string;
  
  export default jwtEncode;
} 