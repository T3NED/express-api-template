import type { Controller, ControllerConstructor } from "./Controller";
import type { ObjectSchema } from "joi";

export function Validate(schema: ControllerValidationSchema) {
	return (controller: Controller, propertyKey: string) => {
		const validation = Reflect.getMetadata("validation", controller) ?? [];
		validation.push({ controller, propertyKey, schema });

		Reflect.defineMetadata("validation", validation, controller);
	};
}

export function createValidationDecorator(type: keyof ControllerValidationSchema) {
	return (schema: ObjectSchema) => Validate({ [type]: schema });
}

export const Query = createValidationDecorator("query");
export const Params = createValidationDecorator("params");
export const Body = createValidationDecorator("body");

export interface ControllerValidateMetadata {
	controller: ControllerConstructor;
	schema: ControllerValidationSchema;
	propertyKey: string;
}

export interface ControllerValidationSchema {
	query?: ObjectSchema;
	params?: ObjectSchema;
	body?: ObjectSchema;
}
