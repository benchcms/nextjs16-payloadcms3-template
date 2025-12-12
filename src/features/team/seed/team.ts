import { Payload } from "payload";
import type { SeedContext } from "@features/types";
import { seedTeamDefault } from "./teamDefault";
import { seedTeamRestaurant } from "./teamRestaurant";
import { seedTeamTechCompany } from "./teamTechCompany";
import { seedTeamManufacturer } from "./teamManufacturer";

export async function seedTeam(payload: Payload, context: SeedContext) {
  switch (context) {
    case "restaurant":
      return seedTeamRestaurant(payload);
    case "tech-company":
      return seedTeamTechCompany(payload);
    case "manufacturer":
      return seedTeamManufacturer(payload);
    default:
      return seedTeamDefault(payload);
  }
}
