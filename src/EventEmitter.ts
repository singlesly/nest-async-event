/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class EventEmitter
 */
import { ListenerInterface } from "./ListenerInterface";
import { HashMap } from "./HashMap";
import { EventInterface } from "./EventInterface";
import { LISTENER } from "./constant/constant";
import 'reflect-metadata';
import { EventEmitterInterface } from "./EventEmitterInterface";

export class EventEmitter implements EventEmitterInterface {

    private readonly listeners: HashMap<ListenerInterface> = new HashMap<ListenerInterface>();

    constructor(listeners: ListenerInterface[] = []) {
        listeners.forEach(listener => this.addListener(listener));
    }

    public addListener(listener: ListenerInterface): void {
        const events = Reflect.getMetadata(LISTENER, listener);
        if(!Array.isArray(events) || !events.length) {
            throw new Error("Specify event of listener");
        }
        events.forEach(event => this.listeners.add(event, listener));
    }

    public async emit(event: EventInterface): Promise<void> {
        const listeners = this.listeners.get(event.name);
        await Promise.all(listeners.map(async listener => listener.listen(event)));
    }
}
