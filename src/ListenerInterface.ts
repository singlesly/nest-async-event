/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @interface ListenerInterface
 */
import { EventInterface } from "./EventInterface";

export interface ListenerInterface {
    listen(event: EventInterface): Promise<void>;
}
