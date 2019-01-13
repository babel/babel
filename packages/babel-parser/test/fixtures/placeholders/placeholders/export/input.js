export %%DECL%%;

export { %%NAME%% };
export { %%NAME%% as alias };
export { name as %%ALIAS%% };
export { %%NAME%% as %%ALIAS%% };

export { %%NAME%% } from "file";
export { %%NAME%% as alias2 } from "file";
export { name as %%ALIAS%% } from "file";
export { %%NAME%% as %%ALIAS%% } from "file";

export { name } from %%FILE%%;
export { %%NAME%% } from %%FILE%%;

export * from %%FILE%%;
export * as %%STAR%% from "file";
export * as %%STAR%% from %%FILE%%;

export name2 from %%FILE%%;
export default from %%FILE%%;
export %%NAME%% from "file";
export %%NAME%% from %%FILE%%;
