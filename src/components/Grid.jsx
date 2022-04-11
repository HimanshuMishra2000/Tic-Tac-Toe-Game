import React from "react";
import { ShowMoveHistory } from "./ShowMoveHistory";
import { Square } from "./Square";
import styles from "./styles/Grid.module.css";
import {Animated} from "react-animated-css";

const Grid = () => {

  let matrix = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ];
  const [turn, setTurn] = React.useState("");
  const [matx, setMatx] = React.useState(matrix);
  const [win, setWin] = React.useState(null);
  const [row_matx, setRow] = React.useState(-1);
  const [col_matx, setCol] = React.useState(-1);
  const [selected, setSelected] = React.useState(false)
  const [moveHistory, setMoveHistory] = React.useState([])
  const [playAi, setPlayAi] = React.useState(null)
  const [aiturn, setAiTurn] = React.useState("")
  const[level, setLevel] = React.useState(null)
  const [highLightWinner, setHighLightWinner] = React.useState([])

  React.useEffect(()=>{

    if(playAi){
      if(turn === 'x'){
        setAiTurn('o')
      }else if(turn === 'o'){
        setAiTurn('x')
      }
    }

  },[turn])

  React.useEffect(()=>{

    if(playAi && level === 'easy'){

      let newMatx = matx.map((el) => {
        return [...el];
      });

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i === row_matx && j === col_matx) {
            newMatx[i][j] = turn;
            break;
          }
        }
      }
      
      // let available = []
      let flag = false;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (newMatx[i][j] === undefined ) {
            // available.push({i,j})
            newMatx[i][j] = aiturn;
            flag = true
            break;
           }
        }
        if(flag){
          break
        }
      }
      // console.log("newMatx", newMatx);

      setMatx(newMatx);
  
      setMoveHistory([...moveHistory,newMatx])



    }else if(playAi && level === 'hard'){

      let newMatx = matx.map((el) => {
        return [...el];
      });

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i === row_matx && j === col_matx) {
            newMatx[i][j] = turn;
            break;
          }
        }
      }

      bestMove(newMatx)
    }

  },[row_matx, col_matx])

  function bestMove(board){
    // console.log(board)

    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] === undefined) {
          board[i][j] = aiturn;
          let score = minimax(board, 0, false);

          // console.log('score',score)

          board[i][j] = undefined;
          if (score > bestScore) {
            bestScore = score;
            // console.log(bestScore)
            move = { i, j };
          }
        }
      }
    }
    console.log(move)

    if(move !== undefined){


      board[move.i][move.j] = aiturn;
      // console.log(board)
      setMatx(board)
      setMoveHistory([...moveHistory,board])
      // currentPlayer = human;
    }else{
      setMatx(board)
      setMoveHistory([...moveHistory,board])
      return
    }
  }

  let scores = {
    [aiturn]: 10,
    [turn]: -10,
    draw: 0
  };
  // console.log(scores)

  function minimax(board, depth, isMaximizing) {
    let result = conclusion(board);
    // console.log(result)
    if (result !== false) {
      return scores[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] === undefined) {
            board[i][j] = aiturn;
            let score = minimax(board, depth + 1, false);
            board[i][j] = undefined;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] === undefined) {
            board[i][j] = turn;
            let score = minimax(board, depth + 1, true);
            board[i][j] = undefined;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  React.useEffect(() => {

    if(!playAi){

      if (turn === "x" || turn === "o") {
  
        let newMatx = matx.map((el) => {
              return [...el];
            });
        // console.log("newMatx", newMatx);
  
  
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (i === row_matx && j === col_matx) {
              newMatx[i][j] = turn;
              break;
            }
          }
        }
        // console.log("after", newMatx);
  
        setMatx(newMatx);
  
        setMoveHistory([...moveHistory,newMatx])
  
        if (turn === "x") {
          setTurn("o");
        } else if (turn === "o") {
          setTurn("x");
        } else {
          setTurn("");
        }
        // console.log(turn);
      }
    } 

  }, [row_matx, col_matx]);


  React.useEffect(() => {
    let winner = conclusion(matx);
    // console.log("winner", winner);

    if (winner === "x") {
      setWin("X");
      setTurn('')
    } else if (winner === "o") {
      setWin("O");
      setTurn('')

    } else if (winner === "draw") {
      setWin("Draw");
      setTurn('')

    }
  }, [matx]);


  const handleTurn = (row, col) => {
    // console.log(typeof row, col, typeof row_matx);
    if(turn === 'x' || turn === 'o'){

        setRow(row);
        setCol(col);
    }
  };



  function conclusion(matx) {
    //Row and Column Check
    
        if(!playAi){

          for (let i = 0; i < matx.length; i++) {
            if ( matx[i][0] === matx[i][1] && matx[i][1] === matx[i][2] && matx[i][0] !== undefined && matx[i][1] !== undefined && matx[i][2] !== undefined) {
          
              if (matx[i][0] === "x") {
                setHighLightWinner(['horizontal', i])
                return "x";
              } else {
                setHighLightWinner(['horizontal',i])
                return "o";
              }
            } else if ( matx[0][i] === matx[1][i] && matx[1][i] === matx[2][i] && matx[0][i] !== undefined && matx[1][i] !== undefined && matx[2][i] !== undefined) {
            
              if (matx[0][i] === "x") {
                setHighLightWinner(['vertical',i])
                return "x";
              } else {
                setHighLightWinner(['vertical',i])
                return "o";
              }
            }
          }
  
      //Upper Diagonal Check
  
          if( matx[0][0] === matx[1][1] && matx[1][1] === matx[2][2] && matx[0][0] !== undefined && matx[1][1] !== undefined && matx[2][2] !== undefined){
              if (matx[0][0] === "x") {
                  setHighLightWinner(['leftDiagonal'])
                  return "x";
              } else {
                  setHighLightWinner(['leftDiagonal'])
                  return "o";
              }
          }
  
      //Lower Diagonal Check
     
          if(matx[0][2] === matx[1][1] && matx[1][1] === matx[2][0] && matx[0][2]!== undefined && matx[1][1] !== undefined && matx[2][0] !== undefined){
              if (matx[0][2] === "x") {
                setHighLightWinner(['rightDiagonal'])
                  return "x";
              } else {
                setHighLightWinner(['rightDiagonal'])
                  return "o";
              }
          }
      
      //Check Draw
          let flag = false
          for(let i=0; i<matx.length; i++){
              for(let j=0; j<matx.length; j++){
      
                  if(matx[i][j] === undefined){
                      return false
                  }else{
                    flag = true
                  }
              }
          }
      
          if(flag){
              return 'draw'
          }
          // return false;
      }else{

        for (let i = 0; i < matx.length; i++) {
          if ( matx[i][0] === matx[i][1] && matx[i][1] === matx[i][2] && matx[i][0] !== undefined && matx[i][1] !== undefined && matx[i][2] !== undefined) {
        
            if (matx[i][0] === "x") {
              return "x";
            } else {
              return "o";
            }
          } else if ( matx[0][i] === matx[1][i] && matx[1][i] === matx[2][i] && matx[0][i] !== undefined && matx[1][i] !== undefined && matx[2][i] !== undefined) {
          
            if (matx[0][i] === "x") {
              return "x";
            } else {
              return "o";
            }
          }
        }

    //Upper Diagonal Check

        if( matx[0][0] === matx[1][1] && matx[1][1] === matx[2][2] && matx[0][0] !== undefined && matx[1][1] !== undefined && matx[2][2] !== undefined){
            if (matx[0][0] === "x") {
                return "x";
            } else {
                return "o";
            }
        }

    //Lower Diagonal Check
   
        if(matx[0][2] === matx[1][1] && matx[1][1] === matx[2][0] && matx[0][2]!== undefined && matx[1][1] !== undefined && matx[2][0] !== undefined){
            if (matx[0][2] === "x") {
                return "x";
            } else {
                return "o";
            }
        }
    
    //Check Draw
        let flag = false
        for(let i=0; i<matx.length; i++){
            for(let j=0; j<matx.length; j++){
    
                if(matx[i][j] === undefined){
                    return false
                }else{
                  flag = true
                }
            }
        }
    
        if(flag){
            return 'draw'
        }

      }
  }




  return (
    <div>

       <Animated animationIn='zoomInDown' animationInDuration={2000} >
          <h1>👋🏻Let's Play Tic-Tac-Toe!</h1>
         </Animated> 
        <div>
        {
          playAi ? <>
          
          <Animated animationIn='flipInY' >
              
            <h2> ⚔️Choose Difficulty Level : 
              <span>

                <button className={styles.easy} onClick={()=>{level ===null ? setLevel('easy') : alert('Please Reset To change Level')}}>Easy</button>
                <button className={styles.hard} onClick={()=>{level ===null ? setLevel('hard'): alert('Please Reset To change Level')}}>Hard</button>
                  <button className={styles.cancel} onClick={()=>{
                      setMatx(matrix)
                      setWin(null)
                      setTurn('')
                      setSelected(false)
                      setMoveHistory([])
                      setPlayAi(null)
                      setAiTurn('')
                      setHighLightWinner([])
                      setLevel(null)
                    }}>Cancel</button>
              </span>
            </h2>
            
          </Animated>
          
          </> : <div> 
            <Animated animationIn="flipInX" animationOut="fadeOut" animationInDuration={4000}>
              <button className={styles.play} onClick={()=>{playAi === null ? setPlayAi(false) : alert('Please Reset')}}>Play with a friend</button> 
            {/* </Animated> */}

            {/* <Animated  animationIn="bounceInLeft"> */}
             <button  className={styles.play} onClick={()=>{ playAi===null ? setPlayAi(true) : alert('Please Reset')}}>Play with Computer</button> 
            </Animated>
            </div>
        }
        {/* <button onClick={()=>setPlayAi(true)}>Play with Computer</button> */}
     </div>

      
      <div>
          {
            win !== null ?
            <div>
              <button className={styles.play}  onClick={()=>{
                  setMatx(matrix)
                  setWin(null)
                  setTurn('')
                  setSelected(false) 
                  setMoveHistory([])
                  setPlayAi(null)
                  setAiTurn('')
                  setHighLightWinner([])
                  setLevel(null)

                  }}>
                  Play Game Again
                </button> 
                  
            </div> : !selected && playAi!==null ?
            <>
            <Animated animationIn='flipInX' animationInDuration={3000}> 
              <button className={styles.x_o} onClick={() => {
                  setTurn("x") 
                  //  console.log('x')
                  setSelected(true) 
                  }}> X </button>

              <button className={styles.x_o} onClick={() => { setTurn("o"); setSelected(true) }}>O</button>

              <button className={styles.play}   onClick={()=>{
                  setMatx(matrix)
                  setWin(null)
                  setTurn('')
                  setSelected(false)
                  setMoveHistory([])
                  setPlayAi(null)
                  setAiTurn('')
                  setHighLightWinner([])
                  setLevel(null)

                }}>
                Reset
            </button>
            </Animated>
            </>
            : playAi!==null &&
            <>
            <button className={styles.play}   onClick={()=>{
                  setMatx(matrix)
                  setWin(null)
                  setTurn('')
                  setSelected(false)
                  setMoveHistory([])
                  setPlayAi(null)
                  setAiTurn('')
                  setHighLightWinner([])
                  setLevel(null)

                }}>
                Reset
            </button>
            </>
          }
      </div>
     
   
    {
        win !== null ? <Animated animationIn='zoomInUp'> <h2>-----{win === 'X' ? "✨🎉 X Wins 🎉✨" : win === 'O' ? "✨🎉 O wins 🎉✨" : "🔥 Match Draw 🔥"}-----</h2></Animated> : <h3 style={{visibility: 'hidden'}}>Results</h3>

    }

    <Animated animationIn="bounceInLeft" animationInDuration={3000} >
     <div className={styles.board}>
        {matx?.map((el, i) => {
          return el.map((no, j) => (
            <Square
              key={i + j}
              className={styles.cell}
              row={i}
              col={j}
              handle={handleTurn}
              no={no}
              turn={turn}
              highLight={highLightWinner}
            />
          ));
        })}

      </div>
      </Animated>
    
      <div className={styles.main}>
        {
          moveHistory.length>0 &&  <h1>Moves : </h1>
        }
        
      {
          moveHistory?.map((el,i) => <ShowMoveHistory  key={i} ticTac ={el} moveNumber={i+1}  highLight={highLightWinner}/>)
      }
      </div>
    </div>
  );
};

export { Grid };
