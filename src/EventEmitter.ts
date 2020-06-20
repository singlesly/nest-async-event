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

export class EventEmitter {

    private readonly listeners: HashMap<ListenerInterface> = new HashMap<ListenerInterface>();

    constructor(listeners: ListenerInterface[] = []) {
        listeners.forEach(listener => this.addListener(listener));
    }

    public addListener(listener: ListenerInterface): void {
        const event = Reflect.getMetadata(LISTENER, listener);
        if(!event) {
            throw new Error("Please specify event of listener");
        }
        this.listeners.add(event, listener);
    }

    public async emit(event: EventInterface): Promise<void> {
        const listeners = this.listeners.get(event.name);
        await Promise.all(listeners.map(async listener => listener.listen(event)));
    }
}
