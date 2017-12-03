declare namespace base62 {
    export function setCharacterSet(characters: string): void
    export function encode(number: number): string
    export function decode(string: string): number
}

export = base62
