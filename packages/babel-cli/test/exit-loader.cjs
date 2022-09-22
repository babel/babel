// eslint-disable-next-line no-process-exit
process.on("message", () => process.exit(0));
process.channel.unref();
