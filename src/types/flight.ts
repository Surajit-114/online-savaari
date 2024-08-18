
export interface SI {
    id: string;
    fD: FD;
    stops: number;
    so: any[];
    duration: number;
    da: Da;
    aa: Aa;
    dt: string;
    at: string;
    iand: boolean;
    isRs: boolean;
    sN: number;
  }
  interface Aa {
    code: string;
    name: string;
    cityCode: string;
    city: string;
    country: string;
    countryCode: string;
    terminal?: string;
  }
  interface Da {
    code: string;
    name: string;
    cityCode: string;
    city: string;
    country: string;
    countryCode: string;
    terminal?: string;
  }
  interface FD {
    aI: AI;
    fN: string;
    eT: string;
  }
  interface AI {
    code: string;
    name: string;
    isLcc: boolean;
  }
export interface TotalPriceList {
    fd: Fd;
    fareIdentifier: string;
    id: string;
    msri: any[];
    messages: any[];
    tai: Tai;
    icca: boolean;
  }
  interface Tai {
    tbi: Tbi;
  }
  interface Tbi {
    '247': _247[];
  }
  interface _247 {
    ADULT: BI;
  }
  interface Fd {
    ADULT: ADULT;
  }
  interface ADULT {
    fC: FC;
    afC: AfC;
    sR: number;
    bI: BI;
    rT: number;
    cc: string;
    cB: string;
    fB: string;
    mI: boolean;
  }
  interface BI {
    iB: string;
    cB: string;
  }
  interface AfC {
    TAF: TAF;
  }
  interface TAF {
    AGST: number;
    OT: number;
    YQ: number;
  }
  interface FC {
    BF: number;
    TAF: number;
    TF: number;
    NF: number;
  }