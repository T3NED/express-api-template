import type { Controller, ControllerConstructor } from "./Controller";
import type { AnySchema, ObjectSchema } from "joi";

export function Validate(schema: ControllerValidationSchema) {
	return (controller: Controller, propertyKey: string) => {
		const validation = Reflect.getMetadata("validation", controller) ?? [];
		validation.push({ controller, propertyKey, schema });

		Reflect.defineMetadata("validation", validation, controller);
	};
}

export interface ControllerValidateMetadata {
	controller: ControllerConstructor;
	schema: AnySchema;
	propertyKey: string;
}

export interface ControllerValidationSchema {
	query?: ControllerValidationSchemaObject;
	params?: ControllerValidationSchemaObject;
	body?: ControllerValidationSchemaObject;
}

export type ControllerValidationSchemaObject = ObjectSchema | Record<string, unknown>;
