import { CustomProperties } from "@security-alliance/stix/2.1";
import { CaseIncident, CaseRfi, CaseRft, CryptocurrencyWallet } from "./types.js";

declare module "@security-alliance/stix/2.1" {
    export interface CustomProperties {
        x_opencti_score: number;

        // extensions: {
        //     [EXTENSION_DEFINITION_OCTI_SDO]: {
        //         extension_type: 'new-sdo',
        //         id: string;
        //         type: string;
        //         created_at: string;
        //         updated_at: string;
        //         is_inferred: boolean;
        //         creator_ids: string[];
        //     }
        // }
    }

    export interface StixCyberObservableObjectTypeMap {
        "cryptocurrency-wallet": CryptocurrencyWallet;
        "case-rfi": CaseRfi;
        "case-rft": CaseRft;
        "case-incident": CaseIncident;
    }
}
