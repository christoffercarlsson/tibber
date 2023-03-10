import { build } from 'esbuild'
import { globby } from 'globby'
import { exit } from 'process'

const run = async () => {
  const sharedOptions = {
    format: 'esm',
    outbase: '.',
    outdir: 'dist',
    platform: 'neutral',
    sourcemap: true
  }
  await build({
    ...sharedOptions,
    entryPoints: ['src/index.ts'],
    bundle: true
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
