export class Test {
  invite(options: { privacy: string } = {}) {
    const privacy = options.privacy || "Private"
    console.log(this)
  }
}