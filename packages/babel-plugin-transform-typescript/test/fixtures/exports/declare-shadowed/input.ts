declare class Signal<T = any> {
	value: T
}

function Signal(this: Signal, value?: unknown) {
	this.value = value
}

export { Signal };


function Signal2(this: Signal2, value?: unknown) {
	this.value = value
}
declare class Signal2<T = any> {
	value: T
}

export { Signal2 };
