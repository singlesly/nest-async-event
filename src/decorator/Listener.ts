/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @function Listener
 */
import { LISTENER } from "../constant/constant";
import "reflect-metadata";

export function Listener(...events: string[]): ClassDecorator {
    return function (target) {
        if(!Array.isArray(events) || !events.length) {
            throw new Error("@Listener specify event names please");
        }
        Reflect.defineMetadata(LISTENER, events, target.prototype);
        Reflect.defineMetadata(LISTENER, events, target);
    }
}
