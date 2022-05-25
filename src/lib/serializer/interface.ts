export interface Serializer<S, D> {
	serialize(data: D): S;
	deserialize(data: S): D;
}
