import { Countries } from "./Countries";

it("can create a Countries", () => {
  const countries = Countries.create({});
  countries.fetchProjects()
});
