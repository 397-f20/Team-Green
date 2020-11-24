/*
    Constants file for the timer intervals
    Follows 8 cycles of study --> break --> study ...
*/


const INTERVALS = [
    {
      length: 25,
      type: 'study'
    },
    {
      length: 5,
      type: 'break'
    },
    {
      length: 25,
      type: 'study'
    },
    {
      length: 5,
      type: 'break'
    },
    {
      length: 25,
      type: 'study'
    },
    {
      length: 5,
      type: 'break'
    },
    {
      length: 25,
      type: 'study'
    },
    {
      length: 20,
      type: 'break'
    }
  ]

  export default INTERVALS;