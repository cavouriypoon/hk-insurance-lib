const dateWithDashPattern: RegExp = /^([12]\d{3})-(0\d|1[012])-(0\d|[12]\d|3[012])$/
const dateWithSlashPattern: RegExp = /^(0\d|[12]\d|3[012])(\/)(0\d|1[012])(\/)[12](\d{3})$/

export const calculateAgeByStrs = (dateOfBirthStr: string, policyInceptionDateStr: string): AgeCalculationResult => {
    return calculateAge(convertDateStrToDate(dateOfBirthStr), convertDateStrToDate(policyInceptionDateStr));
}
export const calculateAgeByDobStr = (dateOfBirthStr: string): AgeCalculationResult => {
    let policyInceptionDate: Date = new Date();
    return calculateAge(convertDateStrToDate(dateOfBirthStr), policyInceptionDate);
}
export const calculateAgeByDob = (dateOfBirth: Date): AgeCalculationResult => {
    let policyInceptionDate: Date = new Date();
    return calculateAge(dateOfBirth, policyInceptionDate);
}

export const calculateAge = (dateOfBirth: Date, policyInceptionDate: Date): AgeCalculationResult => {
    let diff = (policyInceptionDate.getTime() - dateOfBirth.getTime()) / 1000;
    if (diff < 0) {
        throw new Error(`Date of Birth ${dateOfBirth} cannot be after Policy Inception Date ${policyInceptionDate}`)
    }
    diff /= (60 * 60 * 24);
    const anb: number = Math.ceil(diff / 365.25);
    return new AgeCalculationResult(anb, anb - 1);
}
const convertDateStrToDate = (dateStr: string): Date => {
    if (dateWithDashPattern.test(dateStr)) {
        return new Date(dateStr)
    } else if (dateWithSlashPattern.test(dateStr)) {
        const dateArr = dateStr.split("/");
        dateStr = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
        return new Date(dateStr)
    } else {
        throw new Error(`${dateStr} does not match pattern "YYYY-MM-DD" or "DD/MM/YYYY`)
    }
}

export class AgeCalculationResult {
    ageNextBirth: number;
    attainedAge: number;

    constructor(ageNextBirth: number, attainedAge: number) {
        this.ageNextBirth = ageNextBirth;
        this.attainedAge = attainedAge;
    }
}