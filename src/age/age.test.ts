import {AgeCalculationResult, calculateAge, calculateAgeByStrs} from "../age/age"

test("Calculate age with date of Birth and policy inception date success", () => {
    expect(calculateAge(new Date("08/04/1986"), new Date("2023-02-18"))).toStrictEqual(new AgeCalculationResult( 37, 36));
});

test("Calculate age with DOB string and polict inception date string success", () => {
    expect(calculateAgeByStrs("1958-01-30","2023-09-23")).toStrictEqual(new AgeCalculationResult(66, 65));
});