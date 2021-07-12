const maze = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "+", "+", "0", "+", "+", "#", "#"],
    ["#", "#", "#", "#", "+", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "+", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "+", "+", "+", "+", "+"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ];
  
  function findStart(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let k = 0; k < arr[i].length; k++) {
        if (arr[i][k] === "0") {
          return { row: i, col: k };
        }
      }
    }
  
    throw new Error("start was not found");
  }
  
  const colsLength = maze[0].length - 1;
  const rowsLength = maze.length - 1;
  let res = [];
  
  function isFinish(pointer) {
    if (
      pointer.col >= colsLength ||
      pointer.row >= rowsLength ||
      pointer.col === 0 ||
      pointer.row === 0
    ) {
      console.log("Finish!", res);
  
      return res;
    }
  }
  
  function goFurther(pointer, arr) {
    while (!isFinish(pointer)) {
      const up = {
        row: pointer.row - 1,
        col: pointer.col,
        direction: "up",
      };
  
      const down = {
        row: pointer.row + 1,
        col: pointer.col,
        direction: "down",
      };
  
      const left = {
        row: pointer.row,
        col: pointer.col - 1,
        direction: "left",
      };
  
      const right = {
        row: pointer.row,
        col: pointer.col + 1,
        direction: "right",
      };
  
      const pointsAroundPointer = [up, right, down, left];
      for (let i = 0; i < pointsAroundPointer.length; i++) {
        const point = pointsAroundPointer[i];
  
        if (arr[point.row][point.col] === "+") {
          res.push(point.direction);
          arr[point.row][point.col] = "-";
          return goFurther(point, arr);
        }
      }
  
      res = [];
      return goFurther(start, arr);
    }
  
    return res;
  }
  
  const start = findStart(maze);
  goFurther(start, maze);
  