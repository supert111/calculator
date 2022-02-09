import { Component } from "react";
import MyFirstComponent from './components/MyFirstComponent';


class App extends Component {

    render() {
        return (
            <div className="App">
                <section className="container">
                    <MyFirstComponent />
                </section> 
            </div>
    
        );
    }
}
export default App;