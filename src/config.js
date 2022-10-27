const config = {
  scene: {
    backgroundColor: '#111'
  },
  rays: {
    amount: 1000,
    length: 500,
    angle: [0, 360],
    gradient: {
      0: 'white',
      0.1: 'gray',
      1: 'transparent'
    },
    lineWidth: 1,
  },
  line: {
    lineWidth: 3,
    color: 'blue',
  }
};

export default config;