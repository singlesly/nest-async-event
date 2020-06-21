[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A <a href="http://nodejs.org" target="blank">Node.js</a> library for building efficient and scalable server-side applications<p align="center">

## Description

This library inspired by [nestjs-event-emitter](https://github.com/nestjsx/nest-emitter) 
with the resolution of some flaws and additional features with async 
and more proper architecture

## Installation

```bash
npm i -S nest-async-event
```

## Register module

```typescript
import { NestAsyncEventModule } from "nest-async-event";

@Module({
    imports: [
        NestAsyncEventModule
    ]
})
export class AppModule {}
```

## Listener definition

```typescript
import { ListenerInterface, Listener } from "nest-async-event";
import { UserCreatedEvent } from "@/events/UserCreatedEvent";

@Listener("user.created")
export class UserCreateListener implements ListenerInterface {
    public async listen(event: UserCreatedEvent): Promise<void> {
        // do something with event
        // access to user event.target 
    }
}
```
* Register your listener in `providers`

## Event definition

```typescript
import { EventInterface } from "nest-async-event";
import { User } from "@/entity/User";

export class UserCreatedEvent implements EventInterface {
    public readonly name: string = "user.created";
    
    constructor(
        private readonly target: User
    ) {}
}
```

## Emit event
```typescript
import { EventEmitterInterface, InjectEventEmitter } from "nest-async-event";
import { User } from "@/entity/User";
import { CreateUserDto } from "@/dto/CreateUserDto";
import { UserCreatedEvent } from "@/events/UserCreatedEvent";

export class UserService {
    constructor(
        @InjectEventEmitter() private readonly emitter: EventEmitterInterface
    ) {}
    
    public async create(dto: CreateUserDto): Promise<User> {
        const user = new User(dto.email, dto.password);
        
        await this.emitter.emit(new UserCreatedEvent(user))

        return user;
    }

}
```

## In depth

* async works
```typescript    
// should be wait a listeners of created users event
// you can use it for mutate user object before other operations
await this.emitter.emit(new UserCreatedEvent(user))
```

```typescript
// no wait listeners. Listeners will be add in event loop
this.emitter.emit(new UserCreatedEvent(user))
```

* override event emitter
```typescript
import { EventEmitterInterface } from "nest-async-event"; 
import { NestAsyncEventModule } from "nest-async-event";

export class MyEventEmitter implements EventEmitterInterface {
    // your implementation
}

@Module({
    imports: [
        NestAsyncEventModule.register(new MyEventEmitter())
    ]
})
export class AppModule {}
```
