import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
    cwd: __dirname,
    only: [join(__dirname, 'src')],
    presets: ['module:@babel/preset-typescript'],
    extensions: ['.ts', '.js'],
}
