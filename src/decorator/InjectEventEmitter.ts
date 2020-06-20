/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @function InjectEventEmitter
 */
import { Inject } from "@nestjs/common";
import { EVENT_EMITTER_INTERFACE } from "../constant/constant";

export function InjectEventEmitter(): (target: object, key: string | symbol, index?: number) => void {
    return Inject(EVENT_EMITTER_INTERFACE);
}

