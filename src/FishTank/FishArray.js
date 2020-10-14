export const fishArray = {
  0: {
    name: require('../../assets/goldfish.png'),
    ratio: .61
  },
  1: {
    name: require('../../assets/deadfish.png'),
    ratio: .54
  },
  2: {
    name: require('../../assets/koifish.png'),
    ratio: 1.32
  },
  3: {
    name: require('../../assets/redfish.png'),
    ratio: 1
  },
  4: {
    name: require('../../assets/fatfish.png'),
    ratio: .64
  },
  5: {
    name: require('../../assets/dory.png'),
    ratio: .78
  },
  6: {
    name: require('../../assets/pufferfish.png'),
    ratio: 1
  },
  7: {
    name: require('../../assets/magikarp.png'),
    ratio: 1
  },

}

export const fishArrayLength = () => {
  return Object.keys(FishArray).length;
}