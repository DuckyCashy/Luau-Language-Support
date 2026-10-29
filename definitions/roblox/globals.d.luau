-- Minimal declarations for common Roblox globals.
-- These declarations are reference material, not a complete Roblox API.

declare game: DataModel
declare workspace: Workspace
declare script: LuaSourceContainer
declare shared: { [any]: any }

declare Instance: {
    new: (className: string, parent: Instance?) -> Instance
}

declare Vector2: any
declare Vector3: any
declare CFrame: any
declare UDim: any
declare UDim2: any
declare Color3: any
declare BrickColor: any
declare Enum: any
declare RaycastParams: any
declare OverlapParams: any
declare TweenInfo: any
declare Random: any

declare task: {
    wait: (duration: number?) -> number,
    spawn: (callback: (...any) -> ()) -> thread,
    defer: (callback: (...any) -> ()) -> thread,
    delay: (duration: number, callback: (...any) -> ()) -> thread,
    cancel: (thread: thread) -> ()
}

declare print: (...any) -> ()
declare warn: (...any) -> ()
declare error: (message: any, level: number?) -> never
declare assert: (value: any, message: string?) -> any
declare typeof: (value: any) -> string
declare require: (module: ModuleScript) -> any
declare pcall: (callback: (...any) -> ...any, ...any) -> (boolean, ...any)
declare xpcall: (callback: (...any) -> ...any, errorHandler: (any) -> any, ...any) -> (boolean, ...any)