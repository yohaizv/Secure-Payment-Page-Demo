import { types,flow } from 'mobx-state-tree';
import {getCountriesInfo} from '../utils/creditCard.utils';
export const Countries = types
    .model("Countries", {
        countriesInfo: types.optional(types.array(types.string),[]),
    })
    .actions(self => ({
        fetchProjects: flow(function* fetchCountries() { // <- note the star, this a generator function!
            self.countriesInfo = []
            try {
                // ... yield can be used in async/await style
                self.countriesInfo = yield getCountriesInfo()
                console.log(self.countriesInfo);
            } catch (error) {
                // ... including try/catch error handling
                console.error("Failed to fetch projects", error)
            }
        })
    }))