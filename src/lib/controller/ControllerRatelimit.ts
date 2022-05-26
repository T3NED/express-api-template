import type { Controller, ControllerConstructor } from "./Controller";
import type { RateLimit as Limit } from "#struct";

export function RateLimit(ratelimit: Limit) {
	return (controller: Controller, propertyKey: string) => {
		const ratelimits = Reflect.getMetadata("ratelimits", controller) ?? [];
		ratelimits.push({ controller, propertyKey, ratelimit });

		Reflect.defineMetadata("ratelimits", ratelimits, controller);
	};
}

export interface ControllerRatelimitMetadata {
	controller: ControllerConstructor;
	ratelimit: Limit;
	propertyKey: string;
}
