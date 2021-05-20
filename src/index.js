import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
通过问自己以下三个问题，你可以逐个检查相应数据是否属于 state：（这里还未定义是哪个层级的state，所以可以是顶级的state，不要误以为是子组件的state）
    1. 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
    2. 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
    3. 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

    而在本例中：
        1. 原始列表由外部props传入（X）
        2. 搜索词（√）
        3. 实际列表由搜索词计算而来（X）
        4. 复选框是否选中（√）
*/

/* todo 最终例子 */
class ProductCategoryRow extends React.Component {
    render() {
        const {category} = this.props;

        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const {product} = this.props;
        const name = product.stocked ?
            product.name :
            <span style={{color: 'red'}}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const {inStockOnly, filterText} = this.props;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            if (product.name.indexOf(filterText) === -1) {
                return;
            }
            if (inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}
                    />
                );
            }
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}
                />
            );
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    render() {
        const {inStockOnly, filterText} = this.props;

        return (
            <form>
                <input
                    type={"text"}
                    placeholder={"Search..."}
                    value={filterText}
                    onChange={(e) => {
                        this.props.onFilterTextChange(e)
                    }}
                />
                <p>
                    <input type={"checkbox"}
                           checked={inStockOnly}
                           onChange={(e) => {
                               this.props.onInStockOnlyChange(e)
                           }}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false,
        };
    }

    onFilterTextChange = (e) => {
        this.setState({
            filterText: e.target.value,
        });
    };

    onInStockOnlyChange = (e) => {
        this.setState({
            inStockOnly: e.target.checked,
        });
    };

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onInStockOnlyChange={this.onInStockOnlyChange}
                    onFilterTextChange={this.onFilterTextChange}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS}/>,
    document.getElementById('root')
);


// function FancyBorder(props) {
//     return (
//         <div className={'FancyBorder FancyBorder-' + props.color}>
//             {/* todo 把传入的全部JSX作为children使用 */}
//             {props.children}
//         </div>
//     );
// }
//
// function Dialog(props) {
//     return (
//         <FancyBorder color="blue">
//             {/* todo 使用传入的props和children，并继续传入 */}
//             <h1 className="Dialog-title">
//                 {props.title}
//             </h1>
//             <p className="Dialog-message">
//                 {props.message}
//             </p>
//             {props.children}
//         </FancyBorder>
//     );
// }
//
// class SignUpDialog extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSignUp = this.handleSignUp.bind(this);
//         this.state = {login: ''};
//     }
//
//     render() {
//         return (
//             <Dialog
//                 /* todo 标签中的作为props传入 */
//                 title="Mars Exploration Program"
//                 message="How should we refer to you?"
//             >
//                 {/* todo 标签内的作为children传入 */}
//                 <input value={this.state.login} onChange={this.handleChange}/>
//                 <button onClick={this.handleSignUp}>
//                     Sign Me Up!
//                 </button>
//             </Dialog>
//         );
//     }
//
//     handleChange(e) {
//         this.setState({login: e.target.value});
//     }
//
//     handleSignUp() {
//         alert(`Welcome aboard, ${this.state.login}!`);
//     }
// }
//
// ReactDOM.render(
//     <SignUpDialog/>,
//     document.getElementById('root')
// );

// function toCelsius(fahrenheit) {
//     return (fahrenheit - 32) * 5 / 9;
// }
// /* 转换摄氏度至华氏度 */
// function toFahrenheit(celsius) {
//     return (celsius * 9 / 5) + 32;
// }
// /* 输入温度和处理函数，返回转换后结果 */
// function tryConvert(temperature, convert) {
//     const input = parseFloat(temperature);
//     if (Number.isNaN(input)) {
//         return '';
//     }
//     const output = convert(input);
//     const rounded = Math.round(output * 1000) / 1000;
//     return rounded.toString();
// }
//
// class BoilingVerdict extends React.Component{
//     render() {
//         if (this.props.celsius >= 100) {
//             return (
//                 <p>The water would boil.</p>
//             );
//         }
//         return (
//             <p>The water would not boil.</p>
//         );
//     }
// }
//
// const scaleNames = {
//     c: 'Celsius',
//     f: 'Fahrenheit',
// };
//
// class TemperatureInput extends React.Component{
//     handleChange = (e) => {
//         this.props.onTemperatureChange(e.target.value);
//     };
//
//     render() {
//         const {temperature, scale} = this.props;
//         return (
//             <fieldset>
//                 <legend>Enter temperature in {scaleNames[scale]}:</legend>
//                 <input
//                     value={temperature}
//                     onChange={this.handleChange}
//                 />
//             </fieldset>
//         );
//     }
// }
//
// class Calculator extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             temperature: '',
//             scale: 'c',
//         };
//     }
//
//     handleCelsiusChange = (temperature) => {
//         this.setState({
//             scale: 'c',
//             temperature: temperature,
//         });
//     };
//
//     handleFahrenheitChange = (temperature) => {
//         this.setState({
//             scale: 'f',
//             temperature: temperature,
//         });
//     }
//
//     render() {
//         const {scale, temperature} = this.state;
//         const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
//         const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
//         return (
//             <div>
//                 <TemperatureInput
//                     temperature={celsius}
//                     onTemperatureChange={this.handleCelsiusChange}
//                 />
//                 <TemperatureInput
//                     temperature={fahrenheit}
//                     onTemperatureChange={this.handleFahrenheitChange}
//                 />
//                 <BoilingVerdict celsius={parseFloat(celsius)} />
//             </div>
//         );
//     }
// }
//
// ReactDOM.render(
//     <Calculator/>,
//     document.getElementById('root')
// );

// class Reservation extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isGoing: true,
//             numberOfGuests: 2
//         };
//     }
//
//     handleInputChange = (event) => {
//         const {target} = event;
//         /* todo 通过区分事件来源类型，区分来自哪个控件 */
//         // const value = target.type === 'checkbox' ? target.checked : target.value;
//         const {name} = target;
//         /* todo 个人认为区分name更安全，type的通用性更高 */
//         const value = name === 'isGoing' ? target.checked : target.value;
//
//         this.setState({
//             /* todo ES6新语法 */
//             [name]: value,
//         });
//     };
//
//     render() {
//         return (
//             <form>
//                 <label>
//                     参与:
//                     <input
//                         name="isGoing"
//                         type="checkbox"
//                         checked={this.state.isGoing}
//                         onChange={this.handleInputChange}
//                     />
//                 </label>
//                 <br/>
//                 <label>
//                     来宾人数:
//                     <input
//                         name="numberOfGuests"
//                         type="number"
//                         value={this.state.numberOfGuests}
//                         onChange={this.handleInputChange}
//                     />
//                 </label>
//             </form>
//         );
//     }
// }
//
// ReactDOM.render(
//     <Reservation/>,
//     document.getElementById('root')
// );

// class FlavorForm extends React.Component {
//   constructor(props) {
//     super(props);
//     /* todo 默认值，此处需要与option里的value对齐 */
//     this.state = {
//       value: [],
//     };
//
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleChange(event) {
//     /* todo 通过改变数组实现多选，但不停渲染会造成闪烁 */
//     let newInValue = event.target.value;
//     let originalValues = this.state.value;
//     let index = originalValues.indexOf(newInValue);
//     if (index > -1) {
//       originalValues.splice(index, 1);
//     } else {
//       originalValues[originalValues.length] = newInValue;
//     }
//     this.setState({value: originalValues});
//   }
//
//   handleSubmit(event) {
//     alert('你喜欢的风味是: ' + this.state.value);
//     event.preventDefault();
//   }
//
//   render() {
//     return (
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             选择你喜欢的风味:
//             <select
//                 value={this.state.value}
//                 onChange={this.handleChange}
//                 multiple={true}>
//               <option value="grapefruit">葡萄柚</option>
//               <option value="lime">酸橙</option>
//               <option value="coconut">椰子</option>
//               <option value="mango">芒果</option>
//             </select>
//           </label>
//           <input type="submit" value="提交" />
//         </form>
//     );
//   }
// }
//
// ReactDOM.render(
//     <FlavorForm/>,
//     document.getElementById('root')
// );

// class NameForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {value: ''};
//     }
//
//     handleChange = (event) => {
//         this.setState({
//             /* todo 这里event的使用不太清楚 */
//             value: event.target.value,
//         });
//     }
//
//     handleSubmit = (event) => {
//         alert('提交的名字: ' + this.state.value);
//         /* todo 阻止默认的点击事件执行，在这里也就是不会提交了 */
//         event.preventDefault();
//     }
//
//     render() {
//         return (
//             /* todo onSubmit来提交 */
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     名字:
//                     <input type="text"
//                            {/* todo 值永远显示的是state里的value */}
//                            value={this.state.value}
//                            {/* todo 通过onChange改变state里的值 */}
//                            onChange={this.handleChange}
//                     />
//                 </label>
//                 <input type="submit" value="提交"/>
//             </form>
//         );
//     }
// }
//
// ReactDOM.render(
//     <NameForm/>,
//     document.getElementById('root')
// );

// class ListItems extends React.Component{
//     render() {
//         return (
//             <ul>
//                 {/* todo JSX允许在{}内写入任何代码，但滥用可能会影响可读性 */}
//                 {
//                     this.props.listItems.map(
//                         (item) => <li key={item}>{item}</li>
//                     )
//                 }
//             </ul>
//         );
//     }
// }
//
// ReactDOM.render(
//     <ListItems listItems={[1, 2, 3]}/>,
//     document.getElementById('root')
// );

// class ListItem extends React.Component {
//     render() {
//         return (
//             <li>
//                 {this.props.listItem}
//             </li>
//         );
//     }
// }
//
// class NumberList extends React.Component {
//     render() {
//         const listItems = this.props.listItem.map((number) =>
//             /* todo 在此处定义key，而不要到<li>里再定义 */
//             <ListItem listItem={number * 3} key={number.toString()}/>
//         );
//         return (
//             <ul>
//                 {listItems}
//             </ul>
//         );
//     }
// }
//
// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList listItem={numbers}/>,
//     document.getElementById('root')
// );

// function WarningBanner(props) {
//     if (!props.warn) {
//         /*todo 可以return null来直接阻止渲染，不过生命周期照常运行，只是没有渲染*/
//         return null;
//     }
//
//     return (
//         <div className="warning">
//             Warning!
//         </div>
//     );
// }
//
// class Page extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {showWarning: true};
//     }
//
//     handleToggleClick = () => {
//         this.setState(state => ({
//             showWarning: !state.showWarning
//         }));
//     }
//
//     render() {
//         return (
//             <div>
//                 <WarningBanner warn={this.state.showWarning} />
//                 <button onClick={this.handleToggleClick}>
//                     {this.state.showWarning ? 'Hide' : 'Show'}
//                 </button>
//             </div>
//         );
//     }
// }
//
// ReactDOM.render(
//     <Page />,
//     document.getElementById('root')
// );

// function Mailbox(props) {
//     const unreadMessages = props.unreadMessages;
//     return (
//         <div>
//             <h1>Hello!</h1>
//             {/*todo 通过&&实现空间的参数配置*/}
//             {unreadMessages.length > 0 &&
//             <h2>
//                 You have {unreadMessages.length} unread messages.
//             </h2>
//             }
//         </div>
//     );
// }
//
// const messages = ['React', 'Re: React', 'Re:Re: React'];
// ReactDOM.render(
//     <Mailbox unreadMessages={messages} />,
//     document.getElementById('root')
// );

// function UserGreeting(props) {
//     return <h1>Welcome back!</h1>;
// }
//
// function GuestGreeting(props) {
//     return <h1>Please sign up.</h1>;
// }
//
// function Greeting(props) {
//     const isLoggedIn = props.isLoggedIn;
//     if (isLoggedIn) {
//         return <UserGreeting />;
//     }
//     return <GuestGreeting />;
// }
//
// ReactDOM.render(
//     // Try changing to isLoggedIn={true}:
//     <Greeting isLoggedIn={false} />,
//     document.getElementById('root')
// );
//
// function LoginButton(props) {
//     return (
//         <button onClick={props.onClick}>
//             Login
//         </button>
//     );
// }
//
// function LogoutButton(props) {
//     return (
//         <button onClick={props.onClick}>
//             Logout
//         </button>
//     );
// }
//
// class LoginControl extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleLoginClick = this.handleLoginClick.bind(this);
//         this.handleLogoutClick = this.handleLogoutClick.bind(this);
//         this.state = {isLoggedIn: false};
//     }
//
//     handleLoginClick() {
//         this.setState({isLoggedIn: true});
//     }
//
//     handleLogoutClick() {
//         this.setState({isLoggedIn: false});
//     }
//
//     render() {
//         const isLoggedIn = this.state.isLoggedIn;
//         let button;
//         if (isLoggedIn) {
//             /*todo 把组件给对象，方便实现动态渲染*/
//             button = <LogoutButton onClick={this.handleLogoutClick} />;
//         } else {
//             button = <LoginButton onClick={this.handleLoginClick} />;
//         }
//
//         return (
//             <div>
//                 <Greeting isLoggedIn={isLoggedIn} />
//                 {button}
//             </div>
//         );
//     }
// }
//
// ReactDOM.render(
//     <LoginControl />,
//     document.getElementById('root')
// );

// class Toggle extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {isToggleOn: true};
//     }
//
//     handleClick = (e) => {
//         console.log("e", e);
//         this.setState(state => ({
//             isToggleOn: !state.isToggleOn
//         }));
//     }
//
//     render() {
//         return (
//             // todo 传参时建议使用bind，可以绑定事件对象
//             <button onClick={this.handleClick.bind(this, "eee")}>
//                 {this.state.isToggleOn ? 'ON' : 'OFF'}
//             </button>
//         );
//     }
// }
//
// ReactDOM.render(
//     <Toggle />,
//     document.getElementById('root')
// );