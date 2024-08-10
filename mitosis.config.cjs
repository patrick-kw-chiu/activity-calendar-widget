/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
  files: 'src/**',
  targets: ['react', 'svelte', 'solid', 'vue', 'qwik', 'angular'],
  dest: 'output',
  commonOptions: {
    typescript: true,
  },
  options: {
    react: {
      stylesType: 'style-tag',
    },
    svelte: {},
    qwik: {},
  },
};
