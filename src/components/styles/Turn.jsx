import styled from 'styled-components';


let Turn = styled.div`

  color : blue;

    &:before{
        
        ${props =>{
            if(props.no === 'o') 
            return "width:50px; height:50px;  border-radius:50% ; background-color: #053742; content: '';  position: absolute"
            else if(props.no === 'x')
            return "width: 8px ; height: 50px;  background-color: #053742; content: ''; position: absolute;transform: rotate(45deg); "
            
            else return ""
    
        } 
        }
    }

    &:after{
        ${props => {
            if(props.no === 'o')
            return " width:35px; height:35px; border-radius:50% ;background-color: white; content: '';  position: absolute; " 
            else if(props.no === 'x')
            return "width: 8px ; height: 50px;  background-color:#053742 ; content: ''; position: absolute;transform: rotate(-45deg); "
                
            else return ""}
            }
    }

    &:hover {
            cursor: ${props => props.no === undefined ? "pointer" : "not-allowed"};
    }

    &:hover:before{
    
        ${props =>{
            if(props.turn === 'o'  && props.no === undefined) 
            return "width:50px; height:50px;  border-radius:50% ; background-color: rgb(5, 55, 66,0.4) ; content: '';  position: absolute"
            else if(props.turn === 'x' && props.no === undefined)
            return "width: 8px ; height: 50px;  background-color: rgb(5, 55, 66,0.4); content: ''; position: absolute;transform: rotate(45deg); "
            
            else return ""
    
        } 
        }
      }

    &:hover:after{
        
        ${props => {
        if(props.turn === 'o'  && props.no === undefined)
        return " width:35px; height:35px; border-radius:50% ;background-color:white ; content: '';  position: absolute; " 
        else if(props.turn === 'x'  && props.no === undefined)
        return "width: 8px ; height: 50px;  background-color: rgb(5, 55, 66,0.4); content: ''; position: absolute;transform: rotate(-45deg); "
            
        else return ""}
        }
    }

    ${props => {
        if(props.highLight.length === 2){

            if(props.highLight[0] === 'horizontal'){
                
               if(props.highLight[1] === props.row){
                   return "background-color :rgb(163, 240, 163);"
               }
            }else if(props.highLight[0] === 'vertical'){
                
                if(props.highLight[1] === props.col){
                    return "background-color :rgb(163, 240, 163);"
                }
            }else if (props.highLight[0] === 'leftDiagonal'){
                
                if(props.row === props.col ){
                    return "background-color :rgb(163, 240, 163);"
                }
            } else if (props.highLight[0] === 'rightDiagonal'){
                
                if(props.row === 2-props.col ){
                    return "background-color :rgb(163, 240, 163);"
                }
            }else{
                return
            }
        }
    }}

    
`

export {Turn}
// background : ${props => props.no === undefined ? "brown" : "white"};



