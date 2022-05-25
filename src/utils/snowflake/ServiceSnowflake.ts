import { Snowflake } from "./Snowflake";
import { serviceEpoch } from "#constants/snowflake";

export const ServiceSnowflake = new Snowflake(serviceEpoch);
