import { build } from 'esbuild'
import { globby } from 'globby'
import { exit } from 'process'

const run = async () => {
  const sharedOptions = {
    format: 'esm',
    outbase: '.',
    outdir: 'dist'
  }
  await build({
    ...sharedOptions,
    entryPoints: ['src/index.ts'],
    bundle: true,
    splitting: true
  })
  await build({
    ...sharedOptions,
    entryPoints: await globby('tests/**/*.test.ts')
  })
}

run().catch((error) => {
  console.error(error)
  exit(1)
})
