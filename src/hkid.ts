export class HKId {
    pattern7Characters: RegExp = /^([A-Za-z]{1})([0-9]{6})$/
    pattern8Characters: RegExp = /^([A-Za-z]{2})([0-9]{6})$/
    verifyHKIdCheckDigit = (hkIdWithoutCheckDigit: string, checkDigit: string): boolean => {
        try {
            if (this.calculateCheckDigit(hkIdWithoutCheckDigit) == checkDigit) {
                return true
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    calculateCheckDigit = (hkIdWithoutCheckDigit: string): string => {
        let checkMatchPatternResult = this.checkMatchPattern(hkIdWithoutCheckDigit)
        if (checkMatchPatternResult === 7) {
            return this.checkDigitFor7chars(hkIdWithoutCheckDigit).toString()
        } else if (checkMatchPatternResult === 8) {
            return this.checkDigitFor8chars(hkIdWithoutCheckDigit).toString()
        } else {
            throw new Error(`${hkIdWithoutCheckDigit} does not match pattern ^([A-Za-z]{1,2})([0-9]{6})$`)
        }
    }

    checkMatchPattern = (hkIdWithoutCheckDigit: string): number => {
        let matched
        if (this.pattern8Characters.test(hkIdWithoutCheckDigit)) {
            matched = 8
        } else if (this.pattern7Characters.test(hkIdWithoutCheckDigit)) {
            matched = 7
        } else {
            matched = 0
        }
        return matched
    }

    checkDigitFor7chars = (hkIdWithoutCheckDigit: string): string => {
        let num = 36 * 9;
        num += this.convertLetterToInteger(hkIdWithoutCheckDigit.substring(0, 1)) * 8;
        for (let i = 1; i < 7; i++) {
            num += parseInt(hkIdWithoutCheckDigit.substring(i, i + 1)) * (8 - i);
        }
        return this.convertRemaining(num);
    }

    convertRemaining = (number: number): string => {
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

    checkDigitFor8chars = (hkIdWithoutCheckDigit: string): string => {
        let num = this.convertLetterToInteger(hkIdWithoutCheckDigit.substring(0, 1)) * 9;
        num += this.convertLetterToInteger(hkIdWithoutCheckDigit.substring(1, 2)) * 8;
        for (let i = 2; i < 8; i++) {
            num += parseInt(hkIdWithoutCheckDigit.substring(i, i + 1)) * (9 - i);
        }
        return this.convertRemaining(num);
    }

    convertLetterToInteger = (letter: string): number => {
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
}