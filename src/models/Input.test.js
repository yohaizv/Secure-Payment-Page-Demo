import {Input} from './Input';

it("can create a Input", () => {
    const input = Input.create({
        name: "testInput",
        rulesTypes: ["testRule"],
    });

    expect(input.rulesTypes).toEqual(["testRule"]);
    expect(input.value).toBe("");

    input.changeValue("newValue");
    expect(input.value).toBe("newValue");

    input.changeError(true);
    expect(input.error).toBe(true);

});