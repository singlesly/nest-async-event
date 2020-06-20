import { ListenerInterface } from "./ListenerInterface";
import { EventInterface } from "./EventInterface";

/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @interface EventEmitterInterface
 */
export interface EventEmitterInterface {
    addListener(listener: ListenerInterface): void;
    emit(event: EventInterface): Promise<void>;
}
