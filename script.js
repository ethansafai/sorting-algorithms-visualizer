/*******************************************************************************
 * NOTE: Normally, I would organize a project much better than this (I mean come
 * on, there's only a single javascript file here). However, I wanted to
 * challenge myself to build this as quickly as possible and that remained my
 * goal throughout the build (which took around 6 hours in total). I do not have
 * any plans to refactor this code anytime soon as school is my number one
 * priority at the moment, but hey, maybe someday. ;)
 ******************************************************************************/

// Initialize global state vars
let arr = []
let __tmp = []
let animations = []
let sorting = false
let speed
const MAX_NUM = window.innerWidth > 400 ? 700 : 250

const sBtn = document.getElementById('select')
const mBtn = document.getElementById('merge')
const qBtn = document.getElementById('quick')
const bBtn = document.getElementById('bubble')
const iBtn = document.getElementById('init')

// Runs cb function of not actively sorting, alerts the user otherwise
function checkSorting(cb) {
  if (sorting) {
    alert('still sorting')
    return
  }
  cb()
}

// Handle button functionality
iBtn.addEventListener('click', () => {
  checkSorting(() => {
    initArray()
  })
})

sBtn.addEventListener('click', () => {
  checkSorting(() => {
    sort('s')
  })
})

mBtn.addEventListener('click', () => {
  checkSorting(() => {
    sort('m')
  })
})

qBtn.addEventListener('click', () => {
  checkSorting(() => {
    sort('q')
  })
})

bBtn.addEventListener('click', () => {
  checkSorting(() => {
    sort('b')
  })
})

// Grab the bars wrapper and initialize the first array
const wrapper = document.querySelector('.bars-wrapper')
initArray()

/**
 * Runs the specified sorting algorithm and shows the animations
 *
 * @param {string} algo
 */
function sort(algo) {
  sorting = true
  switch (algo) {
    case 's':
      speed = 200
      selectionSort(arr)
      break
    case 'm':
      speed = 200
      mergeSort(arr)
      break
    case 'q':
      speed = 45
      quickSort(arr)
      break
    default:
      speed = 4
      bubbleSort(arr)
      break
  }
  updateScreen().then(() => (sorting = false))
}

/**
 * Returns a random number between low and high (inclusive)
 *
 * @param {number} low
 * @param {number} high
 * @returns {number}
 */
function randIntFromRange(low, high) {
  return Math.floor(Math.random() * (high + 1 - low) + low)
}

/**
 * Initializes the array with unique random values
 */
function initArray() {
  const ARR_SIZE = window.innerWidth > 400 ? 75 : 50
  arr = new Array(ARR_SIZE)
  wrapper.innerHTML = ''
  for (let i = 0; i < ARR_SIZE; ++i) {
    let tmp
    // ensure uniqueness of new number in array
    while (arr.indexOf((tmp = randIntFromRange(10, MAX_NUM))) >= 0) {}
    arr[i] = tmp
    addBar(arr[i], i)
  }
  animations = []
  __tmp = []
}

/**
 * Adds a bar with the specified height to the screen
 *
 * @param {number} height
 * @param {number} idx
 */
function addBar(height, idx) {
  const bar = document.createElement('div')
  bar.classList.add('bar')
  bar.style.height = `${height}px`
  bar.id = idx
  wrapper.appendChild(bar)
}

/**
 * Sleeps for ms milliseconds (promise resolves after the time has elapsed)
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Cycle through the animations and display each at a delay of the current
 * speed (depends on the selected algorithm)
 */
async function updateScreen() {
  for (let i = 0; i < animations.length; ++i) {
    await sleep(speed)
    wrapper.innerHTML = ''
    for (let j = 0; j < animations[i].length; ++j) {
      addBar(animations[i][j], j)
    }
  }
  animations = []
  __tmp = []
  arr = []
}

/**
 * The merge sort function
 *
 * @param {number[]} _arr
 */
function mergeSort(_arr) {
  if (_arr.length < 2) {
    return
  }

  const length = _arr.length
  const midIdx = Math.floor(length / 2)
  const left = new Array(midIdx)
  const right = new Array(length - midIdx)

  for (let i = 0; i < midIdx; ++i) {
    left[i] = _arr[i]
  }
  for (let i = midIdx; i < length; ++i) {
    right[i - midIdx] = _arr[i]
  }

  mergeSort(left)
  mergeSort(right)
  merge(_arr, left, right)
}

/**
 * The merge part of merge sort
 *
 * @param {number[]} _arr
 * @param {number[]} left
 * @param {number[]} right
 */
function merge(_arr, left, right) {
  const leftSize = left.length
  const rightSize = right.length

  let leftIdx = 0
  let rightIdx = 0
  let arrIdx = 0

  const res = []

  while (leftIdx < leftSize && rightIdx < rightSize) {
    if (left[leftIdx] <= right[rightIdx]) {
      _arr[arrIdx] = left[leftIdx]
      res.push(left[leftIdx])
      ++leftIdx
    } else {
      _arr[arrIdx] = right[rightIdx]
      res.push(right[rightIdx])
      ++rightIdx
    }
    ++arrIdx
  }

  while (leftIdx < leftSize) {
    _arr[arrIdx] = left[leftIdx]
    res.push(left[leftIdx])
    ++leftIdx
    ++arrIdx
  }

  while (rightIdx < rightSize) {
    _arr[arrIdx] = right[rightIdx]
    res.push(right[rightIdx])
    ++rightIdx
    ++arrIdx
  }

  // add animation
  let i = 0
  let j = 0
  if (__tmp.length === 0) {
    __tmp = [...arr]
  } else {
    __tmp = [...__tmp]
  }
  while (j < __tmp.length) {
    if (_arr.indexOf(__tmp[j]) >= 0) {
      __tmp[j] = _arr[i++]
    }
    ++j
  }
  animations.push(__tmp)
}

/**
 * The quick sort function
 *
 * @param {number[]} arr
 */
function quickSort(arr) {
  quickSortUtil(arr, 0, arr.length - 1)
}

/**
 * This function exists so we don't have to manually pass low and high to
 * quickSort
 *
 * @param {number[]} arr
 * @param {number} low
 * @param {number} high
 */
function quickSortUtil(arr, low, high) {
  if (low >= high) {
    return
  }

  let pivotIdx = Math.floor(Math.random() * (high + 1 - low) + low)
  let pivot = arr[pivotIdx]
  swap(arr, pivotIdx, high)
  let lp = partition(arr, low, high, pivot)

  quickSortUtil(arr, low, lp - 1)
  quickSortUtil(arr, lp + 1, high)
}

/**
 * The partition part of quick sort
 *
 * @param {number[]} arr
 * @param {number} low
 * @param {number} high
 * @param {number} pivot
 */
function partition(arr, low, high, pivot) {
  let lp = low
  let rp = high - 1
  while (lp < rp) {
    while (arr[lp] <= pivot && lp < rp) {
      ++lp
    }
    while (arr[rp] >= pivot && lp < rp) {
      --rp
    }
    animations.push([...arr])
    swap(arr, lp, rp)
  }
  animations.push([...arr])

  if (arr[lp] > arr[high]) {
    animations.push([...arr])
    swap(arr, lp, high)
  } else {
    lp = high
  }
  animations.push([...arr])
  return lp
}

/**
 * Utility function to swap two numbers in an array
 *
 * @param {number[]} arr
 * @param {number} i
 * @param {number} j
 */
function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

/**
 * The bubble sort function
 *
 * @param {number[]} arr
 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 1; j < arr.length - i; ++j) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j)
      }
      animations.push([...arr])
    }
  }
}

/**
 * The selection sort function
 *
 * @param {number[]} arr
 */
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; ++i) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; ++j) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    animations.push([...arr])
    swap(arr, i, minIdx)
    animations.push([...arr])
  }
}
