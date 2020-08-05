

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let bd =[]; // array of rows, each row is array of cells  (board[y][x])


function makeBoard()
 {

    bd = [
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
      ];

// for (let i =0;i<HEIGHT;i++)
//     {
//       bd.push(Array.from({length:WIDTH}));
 
//     }

 }

 function makeHtmlBoard()
{
    let board=document.getElementById('board');
    let top = document.createElement("tr"); 
    top.setAttribute("id", "column-top"); 
    top.addEventListener("click", handleClick);

//creating top row with id= x;
    for (let x = 0; x < WIDTH; x++)
    {
        let headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }

board.append(top);

    for(let y=0;y<HEIGHT;y++)
    {
           const row= document.createElement('tr');
           for(let x=0;x<WIDTH;x++)
            {
                let cell=document.createElement('td');
                cell.setAttribute("id",`${y}-${x}`);
                row.append(cell);
            }

            board.append(row);

    }
    console.log("this is board",bd);
}


function placeInTable(y, x) 
{
    //  make a div and insert into correct table cell

  let pc=document.createElement('div');
  pc.classList.add('piece');
  pc.classList.add(`p${currPlayer}`);

  
  let spot=document.getElementById(`${y}-${x}`);
spot.append(pc);
}
  
function findSpotForCol(x) {
  for(let i= 5;i>=0;i--)
  {
    if(!bd[i][x])
      return i;
  }

  return null;
}
/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    var x = evt.target.id;
    console.log(x);

    // get next spot in column (if none, ignore click)
     var y = findSpotForCol(x);
     
      if (y === null) {
       return;
     }
    // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  bd[y][x]=currPlayer;
 placeInTable(y, x);

  // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }

  // check for tie
  //  check if all cells in board are filled; if so call, call endGame
  
let result=bd.every(function(ele){
  return ele.every(function(e)
  {return e;});
});

console.log(result);
if(result)
return endGame("this game is tie");


  //  switch currPlayer 1 <-> 2
  currPlayer= currPlayer ===1 ? 2 : 1;
}
function endGame(msg) {
  
  alert(msg);
    //alert(location.hostname);
  }



function checkForWin()
{
//going through possible winning positions and storing them in a varibale 
  
  for(let y=0;y<HEIGHT;y++)
  {
    for(let x=0;x<WIDTH;x++)
    {
        let horiz=[[y, x],[y, x + 1], [y, x + 2], [y, x + 3]];
        let vert=[[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        let diagDR=[[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        let diagDL=[[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //check if those are satisfying condition 
           if(win(horiz)|| win(vert)||win(diagDR)||win(diagDL))
            return true;
    
    }
  }//end of for 

  function win(ar)

  // Check four cells to see if they're all color of current player
  //     //  - cells: list of four (y, x) cells
  //     //  - returns true if all are legal coordinates & all match currPlayer
  
  {
      let result=ar.every(([y,x])=>{

       return y >=0 && y < HEIGHT && x >=0 && x<WIDTH && bd[y][x]===currPlayer
      });
      return result;
  }

}



  makeBoard();
makeHtmlBoard();