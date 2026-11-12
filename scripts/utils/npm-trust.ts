export function getTrustCommand(name: string) {
  return `npm trust github ${name} --file release.yml --repository babel/babel --environment npm --allow-publish --yes`;
}
