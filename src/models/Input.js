import { types } from 'mobx-state-tree';

export const Input = types
    .model("Input", {
        value: "",
        name: types.string,
        rulesTypes: types.optional(types.array(types.string), []),
        errorMessage: "Invalid Input",
        required: true,
        error: false
    })
    .actions(self => ({
        changeValue(newValue) {
            self.value = newValue;
        },
        changeError(newError) {
            self.error = newError;
        }
    }));