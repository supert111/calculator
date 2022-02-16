import { useState } from "react";
import classNames from 'classnames';
import calculatorsData from "./calculator.json";
import styles from "../components/Calculator.module.css";

function MyFirstComponent () {
    const [curentTariff, setCurentTariff] = useState("ALLSIMPLE");
    const [ipOoo, setIpOoo] = useState("IP");
    const [usndUsndrOsno, setUsndUsndrOsno] = useState("USN_d");
    const [, setTypesPerformance] = useState("");
    const [result, setResult] = useState([]);
    const [turnoverPerMonth, setTurnoverPerMonth] = useState("");
    const [employees, setEmployees] = useState(null);
    const [сashierOneUnit, setCashierOneUnit] = useState("");
    const [combinationWithPatent, setCombinationWithPatent] = useState("");
    const [currencyAccounts, setCurrencyAccounts] = useState(null);
    const [newPartnersPerMonth, setNewPartnersPerMonth] = useState(null);

function handleClickTariff (element) {
    element.preventDefault();
    const name = element.currentTarget.id;

    switch (name) {
        case "ALLSIMPLE": setCurentTariff("ALLSIMPLE");
            break;
        case "FREE": setCurentTariff("FREE");
            break;
        default: return;
    }
}

function handleClickToggle (element)  {
    element.preventDefault();
    const { value } = element.target;

    switch (value) {
        case "IP": setIpOoo("IP");
            break;
        case "OOO": setIpOoo("OOO");
            break;
        default: return;
    }
}

function handleClickToggleSecond (element) {
    element.preventDefault();
    const { value } = element.target;

    switch (value) {
        case "USN_d": setUsndUsndrOsno("USN_d");
            break;
        case "USN_d_r": setUsndUsndrOsno("USN_d_r");
            break;
        case "OSNO": setUsndUsndrOsno("OSNO");
            break;
        default: return;
    }
}

function handleInputChange (event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const perfomensValue = target.value;

    if (perfomensValue) {
        setTypesPerformance(perfomensValue);
    }
        
    if (value) {
        result.push(perfomensValue);
    } 
    else {
        const valuesResult = result;
        const valuesResultDelete = valuesResult.filter(valueResult => valueResult !== perfomensValue);
        setResult(valuesResultDelete);
    }
}

function handleChange (event) {
    const target = event.target;
    const { value } = target;

    if ( value < 0 ) {
        return;
    }
    const tariffForFields = curentTariff;
    const nameFields = target.name;

    if (tariffForFields === "ALLSIMPLE") {
        switch (nameFields) {
            case "turnoverPerMonth": 
                const valuePerMonth = Math.floor(value/1000)*50;
                setTurnoverPerMonth(valuePerMonth);
                break;
            case "employees": setEmployees(null);
                break;
            case "сashierOneUnit": 
                const valueCashier = value * 1000;
                setCashierOneUnit(valueCashier);
                break;
            case "combinationWithPatent": 
                const valuePatent = value * 3000;
                setCombinationWithPatent(valuePatent);
                break;
            case "currencyAccounts": setCurrencyAccounts(null);
                break;
            case "newPartnersPerMonth": setNewPartnersPerMonth(null);
                break;
            default: return;
        }
    }

    if (tariffForFields === "FREE") { 
        switch (nameFields) {
            case "turnoverPerMonth": setTurnoverPerMonth(null);
                break;
            case "employees": 
                const valueEmployees = value * 900;
                setEmployees(valueEmployees * 900);
                break;
            case "сashierOneUnit": setCashierOneUnit(null);
                break;
            case "combinationWithPatent": setCombinationWithPatent(null);
                break;
            case "currencyAccounts": setCurrencyAccounts(null);
                break;
            case "newPartnersPerMonth": 
                const valuePartners = value * 500;
                setNewPartnersPerMonth(valuePartners);
                break;
            default: return;
        }
    }
}

    const keysTariff = Object.keys(calculatorsData);
    const resultNumber = result.map(item => calculatorsData[curentTariff].performance[usndUsndrOsno][ipOoo][item]);
    const sumResultNumber = resultNumber.reduce((sumPerfomens, value) => sumPerfomens + value, 0 );        
    const totalTariffToggle = calculatorsData[curentTariff][ipOoo][usndUsndrOsno] + sumResultNumber;
    const totalFeilds = + + turnoverPerMonth + + employees + + сashierOneUnit + + combinationWithPatent + + currencyAccounts + + newPartnersPerMonth;
    const totalSum = totalTariffToggle + totalFeilds;
    const total = totalSum.toLocaleString('ru-RU');

    return (
        <>
                <form>
                <div className={styles.frameCalculator}>
                    <div className={styles.wrapperButtons}>
                        <div className={styles.buttonBlock}>
                            <button className={classNames(styles.buttonStylesText, styles.buttonLeft, {active: ipOoo === "IP"} )} 
                                value="IP" onClick={handleClickToggle}>ИП</button>
                            <button className={classNames(styles.buttonStylesText, styles.buttonRight, {active: ipOoo === "OOO"})} 
                                value="OOO" onClick={handleClickToggle}>ООО</button>
                        </div>
                
                        <div className={styles.buttonBlockSmall}>
                            <button className={classNames(styles.buttonStylesText, styles.buttonLeftSmall, {active: usndUsndrOsno === "USN_d"})} 
                                value="USN_d" onClick={handleClickToggleSecond}>УСН-Д</button>
                            <button className={classNames(styles.buttonStylesText, styles.buttonCenterSmall, {active: usndUsndrOsno === "USN_d_r"})} 
                                value="USN_d_r" onClick={handleClickToggleSecond}>УСН Д-Р</button>
                            <button className={classNames(styles.buttonStylesText, styles.buttonRightSmall, {active: usndUsndrOsno === "OSNO"})} 
                                value="OSNO" onClick={handleClickToggleSecond}>ОСНО </button>
                        </div>   
                    </div>

                    <ul className={styles.performance}><span className={styles.performanceTitle}>Вид деятельности</span>
                        <li className={styles.liPerformance}>
                            <label className={styles.check}>
                                <input className={styles.check__input}
                                    value="itServices"
                                    type="checkbox"
                                    onChange={handleInputChange.bind(this)} />
                                    <span className={styles.check__box}></span>
                                IT и услуги
                            </label>
                        </li>

                        <li className={styles.liPerformance}>
                            <label className={styles.check}>
                                <input className={styles.check__input}
                                    value="trade"
                                    type="checkbox"
                                    onChange={handleInputChange.bind(this)} />
                                    <span className={styles.check__box}></span>
                                Торговля
                            </label>
                        </li>

                        <li className={styles.liPerformance}>
                            <label className={styles.check}>
                                <input className={styles.check__input}
                                    value="productionAndConstruction"
                                    type="checkbox"
                                    onChange={handleInputChange.bind(this)} />
                                    <span className={styles.check__box}></span>
                                Производство и стройка
                            </label>
                        </li>

                        <li className={styles.liPerformance}>
                            <label className={styles.check}>
                                <input className={styles.check__input}
                                    value="publicCatering"
                                    type="checkbox"
                                    onChange={handleInputChange.bind(this)} />
                                    <span className={styles.check__box}></span>
                                Общепит
                            </label>
                        </li>
                
                    </ul>

                    <label className={styles.labelFields}>Оборот в месяц, руб.
                        <input className={styles.inputFields} 
                            placeholder="Поступления на расчетный счет" 
                            name="turnoverPerMonth"
                            type="number"
                            minLength={2} 
                            onChange={handleChange.bind(this)} />
                    </label>
                    <div className={styles.inputFieldsDoublePosition}>
                        <label className={styles.labelFields}>Сотрудников <br></br>
                            <input className={styles.inputFieldsDouble} 
                                placeholder="Количество"
                                name="employees"
                                type="number" 
                                onChange={handleChange.bind(this)} />
                        </label>
                        <label className={styles.labelFields}>Кассы <br></br>
                            <input className={styles.inputFieldsDouble} 
                                placeholder="Количество" 
                                name="сashierOneUnit"
                                type="number" 
                                onChange={handleChange.bind(this)} />
                        </label>
                    </div>
                    <label className={styles.labelFields}>Совмещений с патентом
                        <input className={styles.inputFields} 
                            placeholder="Укажите количество, если есть" 
                            name="combinationWithPatent"
                            type="number" 
                            onChange={handleChange.bind(this)} />
                    </label>
                    <label className={styles.labelFields}>Новых контрагентов в месяц
                        <input className={styles.inputFields} 
                            placeholder="Заказчиков, поставщиков и т.п." 
                            name="currencyAccounts"
                            type="number" 
                            onChange={handleChange.bind(this)} />
                    </label>
                    <label className={styles.labelFields}>Валютных счетов
                        <input className={styles.inputFields} 
                            placeholder="Укажите количество, если есть" 
                            name="newPartnersPerMonth"
                            type="number" 
                            onChange={handleChange.bind(this)} />
                    </label>

                    <div className={styles.blockTariffPrice}>
                        <div className={styles.smallBlockTariffPrice}>
                            <p className={styles.blockTariffTitle}>Примерная цена:</p>
                            <span className={styles.priceTariff}>{total} ₽</span>
                        </div>
                    </div>
                </div>


                <ul className={styles.tariffs}><span className={styles.titleSectionTariff}>Тарифы </span>               
                    <div className={styles.wrapperTariffList}>
                        <li className={styles.blockTariff} id={keysTariff[0]}  key={keysTariff[0]} onClick={handleClickTariff}>
                            <p className={styles.informationTariff}>Всё просто<br>
                                </br>от<span className={styles.tariffPriceFrom}> 3 000 ₽</span>
                            </p>
                            <div className={styles.line}></div>
                            <p className={styles.informationEmployees}>Ведение неограниченного количества сотрудников</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationDocument}>Количество исходящих документов не ограничено</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationAdvances}>Количество авансовых отчётов не ограничено</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationAgents}>Количество агентских отчётов не ограничено</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationСonsultations}>Количество бухгалтерских консультаций не ограничено</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationLawyer}><span className={styles.priceStyle}>2 000 ₽/час</span> юриста, если потребуется</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationAssistant}><span className={styles.priceStyle}>2 000 ₽/час</span> бизнес-ассистента, если потребуется</p>
                            </li> 
                        <li className={styles.blockTariff} id={keysTariff[1]}  key={keysTariff[1]} onClick={handleClickTariff}>
                            <p className={styles.informationTariff}>Свободный<br>
                                </br>от<span className={styles.tariffPriceFrom}> 4 000 ₽</span>
                            </p>
                            <div className={styles.line}></div>
                            <p className={styles.informationEmployeesFree}>Ведение <span className={styles.priceStyle}>1 сотрудника</span> включено 
                                <span className={styles.priceStyle}>500 ₽</span> за каждого свыше
                            </p>
                            <div className={styles.line}></div>
                            <p className={styles.informationDocumentFree}><span className={styles.priceStyle}>50 ₽</span> за исходящий документ. 
                                Документы по обязательным платежам — зарплата, налоги, взносы и которые сделал клиент не учитываются
                            </p>
                            <div className={styles.line}></div>
                            <p className={styles.informationAdvances}>авансовый отчёт <span className={styles.priceStyle}>200 ₽ + 10 ₽</span> за строку</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationAgents}><span className={styles.priceStyle}>500 ₽</span> за обработку отчёта агента, если будут</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationСonsultationsFree}><span className={styles.priceStyle}>2 000 ₽/час</span> бухгалтера, если потребуется</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationLawyer}><span className={styles.priceStyle}>2 000 ₽/час</span> юриста, если потребуется</p>
                            <div className={styles.line}></div>
                            <p className={styles.informationAssistant}><span className={styles.priceStyle}>2 000 ₽/час</span> бизнес-ассистента, если потребуется</p>
                        </li>    
                    </div>
                </ul>
             
                </form>
        </>
    );
}

export default MyFirstComponent;
//////////////////////////////////////////////////////////////////////////////////////////
// import {DebounceInput} from 'react-debounce-input';
// import { Component } from "react";
// import classNames from 'classnames';
// import calculatorsData from "./calculator.json";
// import styles from "../components/Calculator.module.css";

// class MyFirstComponent extends Component  {
//     state = {
//         curentTariff: "ALLSIMPLE",
//         ipOoo: "IP", // IP | ООО
//         usndUsndrOsno: "USN_d",  // USN_d | USN_d_r | OSNO
//         result: [],
//         turnoverPerMonth: "",
//         employees: null,
//         сashierOneUnit: "",
//         combinationWithPatent: "",
//         currencyAccounts: null,
//         newPartnersPerMonth: null,
//     }

//     handleClickTariff = (element) => {
//         element.preventDefault();
//         const name = element.currentTarget.id;

//         switch (name) {
//             case "ALLSIMPLE": this.setState({...this.state, curentTariff: "ALLSIMPLE"});
//                 break;
//             case "FREE": this.setState({...this.state, curentTariff: "FREE"});
//                 break;
//             default: return;
//         }
//     }

//     handleClickToggle = (element) => {
//         element.preventDefault();
//         const { value } = element.target;

//         switch (value) {
//             case "IP": this.setState({...this.state, ipOoo: "IP",});
//                 break;
//             case "OOO": this.setState({...this.state, ipOoo: "OOO",});
//                 break;
//             default: return;
//     }
// }

//     handleClickToggleSecond = (element) => {
//         element.preventDefault();
//         const { value } = element.target;

//         switch (value) {
//             case "USN_d": this.setState({...this.state, usndUsndrOsno: "USN_d",});
//                 break;
//             case "USN_d_r": this.setState({...this.state, usndUsndrOsno: "USN_d_r",});
//                 break;
//             case "OSNO": this.setState({...this.state, usndUsndrOsno: "OSNO",});
//                 break;
//             default: return;
//         }
//     }

//     handleInputChange(event) {
//         const target = event.target;
//         const value = target.type === "checkbox" ? target.checked : target.value;
//         const perfomensValue = target.value;

//         if (perfomensValue) {
//             this.setState({...this.state});
//         }

//         if (value) {
//             this.state.result.push(perfomensValue);
//         } else {
//             const valuesResult = this.state.result;
//             const valuesResultDelete = valuesResult.filter(valueResult => valueResult !== perfomensValue);
//             this.setState({...this.state, result: valuesResultDelete});
//         }
//     }

//     handleChange (event) {
//         const target = event.target;
//         const { value } = target;

//         if (value < 0) {
//             return;
//         }
//         const tariffForFields = this.state.curentTariff;
//         const nameFields = target.name;
//         switch (tariffForFields) {
//             case "ALLSIMPLE": 
//                 switch (nameFields) {
//                     case "turnoverPerMonth": 
//                         const valuePerMonth = Math.floor(value/1000)*50;
//                         this.setState({...this.state, turnoverPerMonth: valuePerMonth,});
//                         break;
//                     case "employees": this.setState({...this.state, employees: null,});
//                         break;
//                     case "сashierOneUnit": 
//                         const valueCashier = value * 1000;
//                         this.setState({...this.state, сashierOneUnit: valueCashier,});
//                         break;
//                     case "combinationWithPatent": 
//                         const valuePatent = value * 3000;
//                         this.setState({...this.state, combinationWithPatent: valuePatent,});
//                         break;
//                     case "currencyAccounts": this.setState({...this.state, currencyAccounts: null,});
//                         break;
//                     case "newPartnersPerMonth": this.setState({...this.state, newPartnersPerMonth: null,});
//                         break;
//                     default: return;
//                 }
//                 break;
//             case "FREE": 
//                 switch (nameFields) {
//                     case "turnoverPerMonth": this.setState({...this.state, turnoverPerMonth: null,});
//                         break;
//                     case "employees": 
//                         const valueEmployees = value * 900;
//                         this.setState({...this.state, employees: valueEmployees * 900,});
//                         break;
//                     case "сashierOneUnit": this.setState({...this.state, сashierOneUnit: null,});
//                         break;
//                     case "combinationWithPatent": this.setState({...this.state, combinationWithPatent: null,});
//                         break;
//                     case "currencyAccounts": this.setState({...this.state, currencyAccounts: null,});
//                         break;
//                     case "newPartnersPerMonth": 
//                         const valuePartners = value * 500;
//                         this.setState({...this.state, newPartnersPerMonth: valuePartners,});
//                         break;
//                     default: return;
//                 }
//                 break;
//             default: return;
//         }
//     }

//     render() {
//         const { ipOoo, curentTariff, usndUsndrOsno, result, turnoverPerMonth, employees, сashierOneUnit, 
//             combinationWithPatent, currencyAccounts, newPartnersPerMonth } = this.state;
//         const keysTariff = Object.keys(calculatorsData);
//         const resultNumber = result.map(item => calculatorsData[curentTariff].performance[usndUsndrOsno][ipOoo][item]);
//         const sumResultNumber = resultNumber.reduce((sumPerfomens, value) => sumPerfomens + value, 0 );        
//         const totalTariffToggle = calculatorsData[curentTariff][ipOoo][usndUsndrOsno] + sumResultNumber;
//         const totalFeilds = + + turnoverPerMonth + + employees + + сashierOneUnit + + combinationWithPatent + + currencyAccounts + + newPartnersPerMonth;
//         const totalSum = totalTariffToggle + totalFeilds;
//         const total = totalSum.toLocaleString('ru-RU');

//         return (
//             <>
//                 <form>
//                 <div className={styles.frameCalculator}>
//                     <div className={styles.wrapperButtons}>
//                         <div className={styles.buttonBlock}>
//                             <button className={classNames(styles.buttonStylesText, styles.buttonLeft, {active: this.state.ipOoo === "IP"} )} 
//                                 value="IP" onClick={this.handleClickToggle}>ИП</button>
//                             <button className={classNames(styles.buttonStylesText, styles.buttonRight, {active: this.state.ipOoo === "OOO"})} 
//                                 value="OOO" onClick={this.handleClickToggle}>ООО</button>
//                         </div>
                
//                         <div className={styles.buttonBlockSmall}>
//                             <button className={classNames(styles.buttonStylesText, styles.buttonLeftSmall, {active: this.state.usndUsndrOsno === "USN_d"})} 
//                                 value="USN_d" onClick={this.handleClickToggleSecond}>УСН-Д</button>
//                             <button className={classNames(styles.buttonStylesText, styles.buttonCenterSmall, {active: this.state.usndUsndrOsno === "USN_d_r"})} 
//                                 value="USN_d_r" onClick={this.handleClickToggleSecond}>УСН Д-Р</button>
//                             <button className={classNames(styles.buttonStylesText, styles.buttonRightSmall, {active: this.state.usndUsndrOsno === "OSNO"})} 
//                                 value="OSNO" onClick={this.handleClickToggleSecond}>ОСНО </button>
//                         </div>   
//                     </div>

//                     <ul className={styles.performance}><span className={styles.performanceTitle}>Вид деятельности</span>
//                         <li className={styles.liPerformance}>
//                             <label className={styles.check}>
//                                 <input className={styles.check__input}
//                                     value="itServices"
//                                     type="checkbox"
//                                     onChange={this.handleInputChange.bind(this)} />
//                                     <span className={styles.check__box}></span>
//                                 IT и услуги
//                             </label>
//                         </li>

//                         <li className={styles.liPerformance}>
//                             <label className={styles.check}>
//                                 <input className={styles.check__input}
//                                     value="trade"
//                                     type="checkbox"
//                                     onChange={this.handleInputChange.bind(this)} />
//                                     <span className={styles.check__box}></span>
//                                 Торговля
//                             </label>
//                         </li>

//                         <li className={styles.liPerformance}>
//                             <label className={styles.check}>
//                                 <input className={styles.check__input}
//                                     value="productionAndConstruction"
//                                     type="checkbox"
//                                     onChange={this.handleInputChange.bind(this)} />
//                                     <span className={styles.check__box}></span>
//                                 Производство и стройка
//                             </label>
//                         </li>

//                         <li className={styles.liPerformance}>
//                             <label className={styles.check}>
//                                 <input className={styles.check__input}
//                                     value="publicCatering"
//                                     type="checkbox"
//                                     onChange={this.handleInputChange.bind(this)} />
//                                     <span className={styles.check__box}></span>
//                                 Общепит
//                             </label>
//                         </li>
                
//                     </ul>

//                     <label className={styles.labelFields}>Оборот в месяц, руб.
//                         <DebounceInput className={styles.inputFields} 
//                             placeholder="Поступления на расчетный счет" 
//                             name="turnoverPerMonth"
//                             type="number"
//                             minLength={2} 
//                             debounceTimeout={1000}
//                             value={this.state.value} 
//                             onChange={this.handleChange.bind(this)} />
//                     </label>
//                     <div className={styles.inputFieldsDoublePosition}>
//                         <label className={styles.labelFields}>Сотрудников <br></br>
//                             <input className={styles.inputFieldsDouble} 
//                                 placeholder="Количество"
//                                 name="employees"
//                                 type="number" 
//                                 value={this.state.value} 
//                                 onChange={this.handleChange.bind(this)} />
//                         </label>
//                         <label className={styles.labelFields}>Кассы <br></br>
//                             <input className={styles.inputFieldsDouble} 
//                                 placeholder="Количество" 
//                                 name="сashierOneUnit"
//                                 type="number" 
//                                 value={this.state.value} 
//                                 onChange={this.handleChange.bind(this)} />
//                         </label>
//                     </div>
//                     <label className={styles.labelFields}>Совмещений с патентом
//                         <input className={styles.inputFields} 
//                             placeholder="Укажите количество, если есть" 
//                             name="combinationWithPatent"
//                             type="number" 
//                             value={this.state.value} 
//                             onChange={this.handleChange.bind(this)} />
//                     </label>
//                     <label className={styles.labelFields}>Новых контрагентов в месяц
//                         <input className={styles.inputFields} 
//                             placeholder="Заказчиков, поставщиков и т.п." 
//                             name="currencyAccounts"
//                             type="number" 
//                             value={this.state.value} 
//                             onChange={this.handleChange.bind(this)} />
//                     </label>
//                     <label className={styles.labelFields}>Валютных счетов
//                         <input className={styles.inputFields} 
//                             placeholder="Укажите количество, если есть" 
//                             name="newPartnersPerMonth"
//                             type="number" 
//                             value={this.state.value} 
//                             onChange={this.handleChange.bind(this)} />
//                     </label>

//                     <div className={styles.blockTariffPrice}>
//                         <div className={styles.smallBlockTariffPrice}>
//                             <p className={styles.blockTariffTitle}>Примерная цена:</p>
//                             <span className={styles.priceTariff}>{total} ₽</span>
//                         </div>
//                     </div>
//                 </div>


//                 <ul className={styles.tariffs}><span className={styles.titleSectionTariff}>Тарифы </span>               
//                     <div className={styles.wrapperTariffList}>
//                         <li className={styles.blockTariff} id={keysTariff[0]}  key={keysTariff[0]} onClick={this.handleClickTariff}>
//                             <p className={styles.informationTariff}>Всё просто<br>
//                                 </br>от<span className={styles.tariffPriceFrom}> 3 000 ₽</span>
//                             </p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationEmployees}>Ведение неограниченного количества сотрудников</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationDocument}>Количество исходящих документов не ограничено</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationAdvances}>Количество авансовых отчётов не ограничено</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationAgents}>Количество агентских отчётов не ограничено</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationСonsultations}>Количество бухгалтерских консультаций не ограничено</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationLawyer}><span className={styles.priceStyle}>2 000 ₽/час</span> юриста, если потребуется</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationAssistant}><span className={styles.priceStyle}>2 000 ₽/час</span> бизнес-ассистента, если потребуется</p>
//                             </li> 
//                         <li className={styles.blockTariff} id={keysTariff[1]}  key={keysTariff[1]} onClick={this.handleClickTariff}>
//                             <p className={styles.informationTariff}>Свободный<br>
//                                 </br>от<span className={styles.tariffPriceFrom}> 4 000 ₽</span>
//                             </p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationEmployeesFree}>Ведение <span className={styles.priceStyle}>1 сотрудника</span> включено 
//                                 <span className={styles.priceStyle}>500 ₽</span> за каждого свыше
//                             </p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationDocumentFree}><span className={styles.priceStyle}>50 ₽</span> за исходящий документ. 
//                                 Документы по обязательным платежам — зарплата, налоги, взносы и которые сделал клиент не учитываются
//                             </p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationAdvances}>авансовый отчёт <span className={styles.priceStyle}>200 ₽ + 10 ₽</span> за строку</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationAgents}><span className={styles.priceStyle}>500 ₽</span> за обработку отчёта агента, если будут</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationСonsultationsFree}><span className={styles.priceStyle}>2 000 ₽/час</span> бухгалтера, если потребуется</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationLawyer}><span className={styles.priceStyle}>2 000 ₽/час</span> юриста, если потребуется</p>
//                             <div className={styles.line}></div>
//                             <p className={styles.informationAssistant}><span className={styles.priceStyle}>2 000 ₽/час</span> бизнес-ассистента, если потребуется</p>
//                         </li>    
//                     </div>
//                 </ul>
             
//                 </form>
//             </>
//         );
//     }

// }

// export default MyFirstComponent;
