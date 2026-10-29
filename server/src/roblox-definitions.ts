export interface GlobalDefinition {
    name: string;
    detail: string;
    documentation: string;
}

export const ROBLOX_GLOBAL_DEFINITIONS: GlobalDefinition[] = [
    {
        name: "game",
        detail: "DataModel",
        documentation: "The root DataModel for the Roblox experience."
    },
    {
        name: "workspace",
        detail: "Workspace",
        documentation: "The Workspace service containing the 3D world."
    },
    {
        name: "script",
        detail: "LuaSourceContainer",
        documentation: "The currently executing script instance."
    },
    {
        name: "shared",
        detail: "table",
        documentation: "A shared environment table."
    },
    {
        name: "Instance",
        detail: "Library",
        documentation: "Provides Roblox instance creation."
    },
    {
        name: "Vector2",
        detail: "Datatype",
        documentation: "A two-dimensional vector."
    },
    {
        name: "Vector3",
        detail: "Datatype",
        documentation: "A three-dimensional vector."
    },
    {
        name: "CFrame",
        detail: "Datatype",
        documentation: "A 3D position and orientation."
    },
    {
        name: "UDim",
        detail: "Datatype",
        documentation: "A dimension with scale and offset."
    },
    {
        name: "UDim2",
        detail: "Datatype",
        documentation: "A two-dimensional GUI dimension."
    },
    {
        name: "Color3",
        detail: "Datatype",
        documentation: "An RGB color."
    },
    {
        name: "BrickColor",
        detail: "Datatype",
        documentation: "A Roblox brick color."
    },
    {
        name: "Enum",
        detail: "Library",
        documentation: "Provides Roblox enumerations."
    },
    {
        name: "task",
        detail: "Library",
        documentation: "Provides task scheduling functions."
    },
    {
        name: "typeof",
        detail: "Function",
        documentation: "Returns the Luau type name of a value."
    },
    {
        name: "warn",
        detail: "Function",
        documentation: "Writes a warning to output."
    },
    {
        name: "print",
        detail: "Function",
        documentation: "Writes values to output."
    },
    {
        name: "require",
        detail: "Function",
        documentation: "Loads a module and returns its result."
    }
];