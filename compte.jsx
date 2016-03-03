    class CompteManager extends React.Component {

        constructor(props, context) {
            super(props, context);
            this.state = {
                total: this.props.initialValue,
                operations: []
            };
        }
        
        componentDidMount(){
            this.refs.fldOperationValue.value;
            this.refs.fldOperationName.placeholder = "Nom de l'opération";
        }

        operation(e) {
            e.preventDefault();
            let opName = this.refs.fldOperationName.value;
            let opValue = Number(this.refs.fldOperationValue.value);
            let newValue = Number(this.state.total) + opValue;
            let newOperations = [...this.state.operations, [opValue," '", opName, "'"]];
            this.setState({total: newValue, operations: newOperations});
            this.refs.fldOperationValue.value = "";
            this.refs.fldOperationName.value = "";
        }

        render() {
            let color = this.state.total > 0 ? '#0F0' : '#F00';
            let styleTotal = {fontSize: 20, color: color};
            let ops = this.state.operations;
            console.log('ops', ops);
            return <div>
                <h2>{this.props.nom}</h2>
                <div id="op-form">
                    <label style={{marginRight:20}}
                        htmlFor="fldOperationValue">Opération</label>
                    <input id="fldOperationValue" ref="fldOperationValue" style={{marginRight:10}}
                        type="number" />
                    <input id="fldOperationName" ref="fldOperationName" type="text" />
                    <button onClick={this.operation.bind(this)}>Valider</button>
                </div>
                <hr/>
                { ops.map(op => <li>{op}</li> ) }
                <hr/>
                <div style={styleTotal}> {this.state.total} €</div>
            </div>
        }
    };


    class Indecrementor extends React.Component {
        
            constructor(props, context){
                super(props, context);
                this.state = {
                    compteur: 0               
                };
            }
            
            componentDidMount(){
                this.refs.fldClientAccountValue;
                this.refs.fldClientName;
            }
            
            increment(e) {
                e.preventDefault();
                let newValeur = this.state.compteur + 1;
                let clientName = this.refs.fldClientName.value;
                let clientValue = this.refs.fldClientAccountValue.value;
                this.setState({compteur: newValeur});
                let div = document.createElement('div');
                document.body.appendChild(div);
                div.id = "container"+this.state.compteur;
                let container = document.getElementById(div.id);
                ReactDOM.render(
                    <CompteManager nom={clientName} initialValue={clientValue}/>,
                    document.getElementById(div.id)
                );
                document.getElementById("fldClientName").value = "";
                document.getElementById("fldClientAccountValue").value = "";
            }
            
            decrement(e) {
                e.preventDefault();
                let newValeur = this.state.compteur - 1;
                this.setState({compteur: newValeur});
                document.body.removeChild(document.body.lastChild);
            }
            
            render(){
                let styleLabel = {margin:10};
                return <span>
                    <button onClick={this.increment.bind(this)}>+</button>
                    <span>{this.state.compteur}</span>
                    <button onClick={this.decrement.bind(this)}>-</button>
                    <p>
                        <label for="fldClientName" style={styleLabel}>Nom du client</label>
                        <input id="fldClientName" ref="fldClientName" type="text"/>      
                        <label for="fldClientAccountValue" style={styleLabel}>Valeur initiale du compte</label>              
                        <input id="fldClientAccountValue" ref="fldClientAccountValue" type="number"/>
                    </p>
                </span>
            }
        }


    ReactDOM.render(
        <Indecrementor/>,
        document.getElementById('container')
    );

    // ReactDOM.render(
    //     <CompteManager nom="Mr Dupond" initialValue="2000"/>,
    //     document.getElementById('container')
    // );

    // ReactDOM.render(
    //     <CompteManager nom="Mr Bens" initialValue="500"/>,
    //     document.getElementById('second_container')
    // );