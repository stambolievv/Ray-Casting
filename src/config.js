const config = {
  scene: {
    backgroundColor: '#111',
  },
  rays: {
    amount: 500,
    angle: [0, 360],
    singleLine: {
      length: 400,
      lineWidth: 1,
      gradient: {
        0: 'lightgray',
        0.1: 'darkgray',
        1: 'transparent',
      },
    },
  },
  lines: {
    amount: { min: 10, max: 15 },
    angle: { min: 0, max: 360 },
    length: { min: 100, max: 500 },
    singleLine: {
      lineWidth: 3,
      color: 'blue',
    },
  },
};

export default config;