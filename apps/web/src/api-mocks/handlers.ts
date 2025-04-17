import { cardsHandlers } from "./handlers/cards";
import { userHandlers } from "./handlers/users";

export const handlers = [...cardsHandlers, ...userHandlers];
