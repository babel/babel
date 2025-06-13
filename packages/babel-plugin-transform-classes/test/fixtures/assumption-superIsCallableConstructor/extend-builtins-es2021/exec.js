class MergedError extends AggregateError {}

expect(new MergedError([])).toBeInstanceOf(MergedError);
expect(new MergedError([])).toBeInstanceOf(AggregateError);
