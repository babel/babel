({ a: target().value } = source);
({ a: missing.value = fallback() } = source);
({ ...target().value } = source);
