function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; ++i) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; ++j) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    swap(arr, i, minIdx)
  }
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 1; j < arr.length - i; ++j) {
      if (arr[j - 1] > arr[j]) {
        swap(arr, j - 1, j)
      }
    }
  }
}

function quickSort(arr) {
  _quickSort(arr, 0, arr.length - 1)
}

function _quickSort(arr, low, high) {
  if (low >= high) {
    return
  }

  let pivotIdx = Math.floor(Math.random() * (high + 1 - low) + low)
  let pivot = arr[pivotIdx]
  swap(arr, pivotIdx, high)
  let lp = partition(arr, low, high, pivot)

  _quickSort(arr, low, lp - 1)
  _quickSort(arr, lp + 1, high)
}

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
    swap(arr, lp, rp)
  }

  if (arr[lp] > arr[high]) {
    swap(arr, lp, high)
  } else {
    lp = high
  }
  return lp
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return
  }

  const length = arr.length
  const midIdx = Math.floor(length / 2)
  const left = new Array(midIdx)
  const right = new Array(length - midIdx)

  for (let i = 0; i < midIdx; ++i) {
    left[i] = arr[i]
  }
  for (let i = midIdx; i < length; ++i) {
    right[i - midIdx] = arr[i]
  }

  mergeSort(left)
  mergeSort(right)
  merge(arr, left, right)
}

function merge(arr, left, right) {
  const leftSize = left.length
  const rightSize = right.length

  let leftIdx = 0
  let rightIdx = 0
  let arrIdx = 0

  while (leftIdx < leftSize && rightIdx < rightSize) {
    if (left[leftIdx] <= right[rightIdx]) {
      arr[arrIdx] = left[leftIdx]
      ++leftIdx
    } else {
      arr[arrIdx] = right[rightIdx]
      ++rightIdx
    }
    ++arrIdx
  }

  while (leftIdx < leftSize) {
    arr[arrIdx] = left[leftIdx]
    ++leftIdx
    ++arrIdx
  }

  while (rightIdx < rightSize) {
    arr[arrIdx] = right[rightIdx]
    ++rightIdx
    ++arrIdx
  }
}
