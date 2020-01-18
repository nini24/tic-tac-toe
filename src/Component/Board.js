import React, {Component} from 'react'
import Square from './Square'
import * as utils from '../utils/functions'


export default class Board extends Component {
    constructor(props) {
        super(props)
        
        //the component state
        this.state = {
            //fills the array with null values
            squares: Array(9).fill(null),
            history: [],
            //xNext determines which player should make a move
            xNext:true
        }

    }
    

    //To handle clicks on the squares
    BoxClick(index) {
        //to get present state of squares
        const squares = this.state.squares.slice()
       
        //to get present state of history
        let history = this.state.history

        //end the game if the board contains winning combinations 
        if (utils.getWinner(squares) || squares[index]) {
            return 
        }

        //end the game if all the squares are filled
        if (utils.areSquaresFilled(squares)===true) {
            return
        }

        //Mark the square as x or o
        squares[index] = this.state.xNext ? 'X' : 'O'

        //push this move to the game's history
        history.push(this.state.xNext ? 'X' : 'O')


        //update the component state
        this.setState({
            squares:squares,
            history:history,
            xNext: !this.state.xNext
        })
    }


    // The board restart function sets the component state to its initial state
    boardRestart = () => {
        this.setState({
            squares: Array(9).fill(null),
            history: [],
            xNext: true
        })
    }
    render() {
        
            //get winner
            const winner = utils.getWinner(this.state.squares)
            
            
            const filled = utils.areSquaresFilled(this.state.squares)
            
            //Game status message
            let status

            if (winner) {
                status = `The winner is: ${winner}`
            
            }

            //If the game is drawn
            else if (!winner && filled) {
                status = 'Game drawn'
              
            }

            //if there is no winner
            else {
                status = `It is ${(this.state.xNext ? 'X': 'O')}'s turn.`
            }
            
            return (
                <>
                <div className = "boardWrap">
                    <div className ="board">
                        <h2 className = "status"> {status}</h2>
                        <div className = "boardRow">
                            <Square value = {this.state.squares[0]} onClick = {() => this.BoxClick(0)} />
                            <Square value = {this.state.squares[1]} onClick = {() => this.BoxClick(1)} />
                            <Square value = {this.state.squares[2]} onClick = {() => this.BoxClick(2)} />

                        </div>
                        <div className = "boardRow">
                        <Square value = {this.state.squares[3]} onClick = {() => this.BoxClick(3)} />
                        <Square value = {this.state.squares[4]} onClick = {() => this.BoxClick(4)} />
                        <Square value = {this.state.squares[5]} onClick = {() => this.BoxClick(5)} />
                        </div>

                        <div className = "boardRow">
                        <Square value = {this.state.squares[6]} onClick = {() => this.BoxClick(6)} />
                        <Square value = {this.state.squares[7]} onClick = {() => this.BoxClick(7)} />
                        <Square value = {this.state.squares[8]} onClick = {() => this.BoxClick(8)} />
                        </div>

                    </div>
                    <div  className ="boardHistory">
                        <h2 className ="boardHeading">Moves so far: </h2>
                        <ul className ="historyList"> 
                            {this.state.history.length === 0 && <span> No moves to show.</span>}
                            {this.state.history.length !==0 && this.state.history.map((move,index) => {
                                return <li key = {index}> Move {index + 1}: <b>{move}</b></li>
                            })}
                        </ul>
                        
                    </div>

                    {/* Start a new game button */}
                    {winner && <div className = "Footer">
                        <button className ="btn" onClick = {this.boardRestart}> Start new game</button>
                    
                         
                         </div>}

                </div>
                </>
            )

        
        }
}
