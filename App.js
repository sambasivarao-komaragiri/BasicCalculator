

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';


type Props = {};
export default class App extends Component<Props> {

    constructor() {
        super()
        this.state = {
            resultValue: "0",
            calculationValue: "",
            operators : ['C','Del', '+', '*', '/', '-']
        }
    }

    calculateResult(){
        console.log("entered method")
        this.setState({
            resultValue: eval(this.state.calculationValue)
        })

    }

    operationPressed(txt) {
        if (txt == 'C') {
            this.setState(
                {
                    calculationValue:"",
                    resultValue: "0",
                })
        }else if(txt == 'Del'){

            this.setState({
                calculationValue: this.state.calculationValue.substring(0, this.state.calculationValue.length - 1)
            })


        } else if(!this.state.operators.includes(this.state.calculationValue.substring(this.state.calculationValue.length - 1, this.state.calculationValue.length))){
            //alert("entered")
            this.setState(
                {
                    calculationValue: this.state.calculationValue + txt
                })

        }
    }

    buttonPressedNum(txt) {

        if (txt != '=') {

        this.setState(
            {
                calculationValue: this.state.calculationValue + txt
            })

    }else
        {
           this.calculateResult()

        }
    }

    render() {

        let rows = []
        let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
        for (let i = 0; i < 4; i++) {
            let row = []
            for (let j = 0; j < 3; j++) {
                row.push(
                    <TouchableOpacity key={nums[i][j]} style={styles.button}
                                      onPress={() => this.buttonPressedNum(nums[i][j])}>

                        <Text style={styles.buttonText}>{nums[i][j]}</Text>
                    </TouchableOpacity>)
                //console.log(i + " " + j)
            }
            rows.push(<View style={styles.row} key={i}>{row}</View>)
        }


        let operation = []

        for (let i = 0; i < this.state.operators.length; i++) {
            operation.push(<TouchableOpacity key={this.state.operators[i]} style={styles.button} onPress={()=>this.operationPressed(this.state.operators[i])}>
                <Text style={styles.buttonText}>{this.state.operators[i]}</Text>
            </TouchableOpacity>)
        }

        return (
            <View style={styles.container}>

                <View style={styles.calculationText}>
                    <Text style={styles.resultCalText}>{this.state.calculationValue}</Text>
                </View>

                <View style={styles.resultText}>

                    <Text style={styles.resultCalText}>{this.state.resultValue}</Text>

                </View>

                <View style={styles.keypad}>
                    <View style={styles.numberPad}>
                        {rows}
                    </View>

                    <View style={styles.operatorPad}>
                        {operation}
                    </View>
                </View>

            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        calculationText: {
            flex: 2,
            backgroundColor: "black",
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        resultText: {
            flex: 1,
            backgroundColor: "black",
            alignItems: 'flex-end',
            justifyContent: 'center'

        },
        keypad: {
            flex: 7,
            flexDirection: "row"
        },
        numberPad: {
            flex: 8,
            backgroundColor: "#d2d3d5"
        },
        operatorPad: {
            flex: 2,
            backgroundColor: "#ff8900"
        },
        row: {
            flexDirection: 'row',
            flex: 1,
            alignContent: 'center'
        },
        button: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around'
        },
        buttonText: {
            fontSize: 26
        },
        resultCalText: {
            color: '#FFFFFF',
            fontSize: 28

        }
    });
