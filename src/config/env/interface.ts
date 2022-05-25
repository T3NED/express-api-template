export interface EnvResolver<T> {
	(key: string, required: false, defaultValue: T): T;
	(key: string, required: false, defaultValue?: T): T | undefined;
	(key: string, required?: true, defaultValue?: T): T;
	(key: string, required?: boolean, defaultValue?: T): T | undefined;
}
