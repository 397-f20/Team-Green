export const fishArray = {
  0: {
    name: require('../../assets/deadfish.png'),
    ratio: .54
  },
  1: {
    name: require('../../assets/koifish.png'),
    ratio: 1.32
  },
  2: {
    name: require('../../assets/redfish.png'),
    ratio: 1
  },
  3: {
    name: require('../../assets/fatfish.png'),
    ratio: .64
  },
  4: {
    name: require('../../assets/pufferfish.png'),
    ratio: 1
  },
  5: {
    name: require('../../assets/magikarp.png'),
    ratio: 1
  },
}

export const fishArrayLength = () => {
  return Object.keys(fishArray).length;
}