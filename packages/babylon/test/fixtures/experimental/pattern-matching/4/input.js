match (node) {
  { name: 'If', alternate }: // if with no else
      match(consequent) {
        {name}: name
      },
  { name: 'If', consequent }: // if with an else
      match(consequent) {
        {name}: name
      }
}