function findOdd(series) {
  let oddOneOut = null;

  for (let i = 0; i < series.length; i++) {
    let prevDiff = null;
    let currDiff = null;

    for (let j = 0; j < series[i].length - 1; j++) {
      currDiff = Math.abs(
        series[i].charCodeAt(j) - series[i].charCodeAt(j + 1),
      );

      if (prevDiff !== null && prevDiff !== currDiff) {
        oddOneOut = series[i];
        break;
      }

      prevDiff = currDiff;
    }
  }

  return oddOneOut;
}

console.log(findOdd(["ABC", "BCD", "EFG", "DCB"]));
