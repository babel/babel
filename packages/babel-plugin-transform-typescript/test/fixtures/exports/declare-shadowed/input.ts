declare class Signal<T = any> {
	value: T
}

function Signal(this: Signal, value?: unknown) {
	this.value = value
}

export { Signal };
