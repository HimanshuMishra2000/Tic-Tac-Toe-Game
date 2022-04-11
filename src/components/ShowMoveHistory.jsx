import React from 'react'
import { Square } from './Square';
import styles from "./styles/Grid.module.css";
import {Animated} from "react-animated-css";


const ShowMoveHistory=({ticTac, moveNumber,  highLight})=>{

     const [show, setShow] = React.useState(false)
    return(
        <div className={styles.main_moves} >

            <Animated animationIn='zoomInDown' className={styles.main_moves_btn}>
              <button className={styles.move} onClick={()=>setShow(!show)}>Move-{moveNumber}</button>
            </Animated>

            <div>

            { show &&
                <Animated animationIn='bounceInDown'>
                <div className={styles.board}>
                    {ticTac?.map((el, i) => {
                    return el.map((no, j) => (
                        <Square
                        key={i + j}
                        className={styles.cell}
                        no={no}
                        highLight={highLight}
                        />
                    ));
                    })}

                </div>
            </Animated> 
            }
            </div>
            
        </div>
    )
}

export {ShowMoveHistory}