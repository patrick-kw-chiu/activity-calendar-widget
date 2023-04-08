/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'src/**',
  targets: [
    'react',
    'svelte',
    'vue3',
    'solid',
    // angular's generated components don't seem to import components, types nor functions correctly
    // 'angular',
    'qwik',
  ],
  dest: 'output',
  // dest: 'preview/src/output',
};
