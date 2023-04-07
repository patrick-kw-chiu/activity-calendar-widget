/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: 'src/**',
  targets: [
    'react',
    'svelte',
    'vue3',
    'solid',
    'angular',
    'qwik',
  ],
  dest: 'preview/src/output',
};
