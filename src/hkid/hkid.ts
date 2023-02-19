const pattern7Characters: RegExp = /^([A-Za-z]{1})([0-9]{6})$/
const pattern8Characters: RegExp = /^([A-Za-z]{2})([0-9]{6})$/
export const verifyHKIdCheckDigit = (HKIdWithoutCheckDigit: string, checkDigit: string): boolean => {
    try {
        if (calculateCheckDigit(HKIdWithoutCheckDigit) == checkDigit) {
            return true
        }
        return false;
    } catch (e) {
        return false;
    }
}

export const verifyFullHKId = (HKIdWithCheckDigit: string): boolean => {
    HKIdWithCheckDigit = HKIdWithCheckDigit.replace("(", "").replace(")", "");
    const HKIdWithoutCheckDigit: string = HKIdWithCheckDigit.substring(0, HKIdWithCheckDigit.length - 1)
    const checkDigit: string = HKIdWithCheckDigit.substring(HKIdWithCheckDigit.length - 1, HKIdWithCheckDigit.length)
    try {
        if (calculateCheckDigit(HKIdWithoutCheckDigit) == checkDigit) {
            return true
        }
        return false;
    } catch (e) {
        return false;
    }
}

const calculateCheckDigit = (HKIdWithoutCheckDigit: string): string => {
    let checkMatchPatternResult = checkMatchPattern(HKIdWithoutCheckDigit)
    if (checkMatchPatternResult === 7) {
        return checkDigitFor7chars(HKIdWithoutCheckDigit).toString()
    } else if (checkMatchPatternResult === 8) {
        return checkDigitFor8chars(HKIdWithoutCheckDigit).toString()
    } else {
        throw new Error(`${HKIdWithoutCheckDigit} does not match pattern ^([A-Za-z]{1,2})([0-9]{6})$`)
    }
}

const checkMatchPattern = (HKIdWithoutCheckDigit: string): number => {
    let matched
    if (pattern8Characters.test(HKIdWithoutCheckDigit)) {
        matched = 8
    } else if (pattern7Characters.test(HKIdWithoutCheckDigit)) {
        matched = 7
    } else {
        matched = 0
    }
    return matched
}

const checkDigitFor7chars = (HKIdWithoutCheckDigit: string): string => {
    let num = 36 * 9;
    num += convertLetterToInteger(HKIdWithoutCheckDigit.substring(0, 1)) * 8;
    for (let i = 1; i < 7; i++) {
        num += parseInt(HKIdWithoutCheckDigit.substring(i, i + 1)) * (8 - i);
    }
    return convertRemaining(num);
}

const convertRemaining = (number: number): string => {
    const remaining = number % 11;
    if (remaining == 0) {
        return "0";
    }
    if (remaining == 1) {
        return "A";
    } else {
        return (11 - remaining).toString();
    }
}

const checkDigitFor8chars = (HKIdWithoutCheckDigit: string): string => {
    let num = convertLetterToInteger(HKIdWithoutCheckDigit.substring(0, 1)) * 9;
    num += convertLetterToInteger(HKIdWithoutCheckDigit.substring(1, 2)) * 8;
    for (let i = 2; i < 8; i++) {
        num += parseInt(HKIdWithoutCheckDigit.substring(i, i + 1)) * (9 - i);
    }
    return convertRemaining(num);
}

const convertLetterToInteger = (letter: string): number => {
    switch (letter.toUpperCase()) {
        case "A":
            return 10;
        case "B":
            return 11;
        case "C":
            return 12;
        case "D":
            return 13;
        case "E":
            return 14;
        case "F":
            return 15;
        case "G":
            return 16;
        case "H":
            return 17;
        case "I":
            return 18;
        case "J":
            return 19;
        case "K":
            return 20;
        case "L":
            return 21;
        case "M":
            return 22;
        case "N":
            return 23;
        case "O":
            return 24;
        case "P":
            return 25;
        case "Q":
            return 26;
        case "R":
            return 27;
        case "S":
            return 28;
        case "T":
            return 29;
        case "U":
            return 30;
        case "V":
            return 31;
        case "W":
            return 32;
        case "X":
            return 33;
        case "Y":
            return 34;
        case "Z":
            return 35;
    }
    return 0;
}