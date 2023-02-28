export default function (arr: number[], idx: number | null, position: 'left' | 'right', is_far?: boolean) {
  if (idx == null) return null;
  let real_idx = arr.indexOf(idx);
  if (real_idx == -1) throw Error('Index not found');

  let distance = 1;
  if (is_far) distance = 2;
  if (position == 'left') {
    console.log(arr, idx, position, arr[real_idx - distance]);
    return arr[real_idx - 1];
  } else {
    console.log(arr, idx, position, arr[real_idx + distance]);
    return arr[real_idx + 1];
  }
}
