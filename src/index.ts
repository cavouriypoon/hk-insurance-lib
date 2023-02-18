import {HKId} from "./hkid";

export const verifyHKIdCheckDigit = (hkidWithoutCheckDigit: string, checkDigit: string): boolean => {
    return new HKId().verifyHKIdCheckDigit(hkidWithoutCheckDigit, checkDigit)
}