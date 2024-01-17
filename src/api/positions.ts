import { client } from "./fetchCli";

import { ResponcePositions } from "../types/types";

export const getPositions = () => {
  return client.get<ResponcePositions>("/positions");
};
