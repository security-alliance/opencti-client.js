import { CaseIncident, CaseRfi, CaseRft, CryptocurrencyWallet } from "./types.js";

declare module "@security-alliance/stix/2.1" {
    export interface CustomProperties {
        x_opencti_score: number;
    }

    export interface StixCyberObservableObjectTypeMap {
        "cryptocurrency-wallet": CryptocurrencyWallet;
        "case-rfi": CaseRfi;
        "case-rft": CaseRft;
        "case-incident": CaseIncident;
    }
}
