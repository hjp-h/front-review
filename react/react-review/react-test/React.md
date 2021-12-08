## React

### 一、React简介

#### 1.react是什么？

官网：React是一个构建用户界面的JS库，是一个将**数据渲染**为HTML视图的开源JS库。

- 谁开发的?

  由FaceBook的一名软件工程师写的。

- 为什么要学？

  （1）原生JS操作DOM繁琐，效率低（DOM-API操作UI）

  （2）原生JS直接操作DOM，浏览器会进行大量的重绘重排。

  （3）原生JS没有组件化的编码方案，代码复用率低。

#### 2. react的特点

（1）采用组件化模式、声明式编码（告诉目的就行，不用详述），提高开发效率及组件复用率。

（2）在React Native中可以使用React语法进行移动端开发。

（3）使用了**虚拟DOM+优秀的Diff算法**，尽量减少与真实DOM的交互。 

![image-20210322095813077](C:\Users\asus\AppData\Roaming\Typora\typora-user-images\image-20210322095813077.png)
- 后来数据改变之后，就进行虚拟DOM的比较，相同的不变（复用），只把不同的添加进去。

### 二、React入门

#### 1.Hello React 案例

- 依赖包

  （1）babel.js

  - 将es6  => es5 
  - 将jsx => js

  （2）react.development.js  **核心库**

  （3）react-dom.development.js 扩展库

- 步骤：

  （1）定义一个容器（html）

  （2）导入依赖包

  （3）<script type="text/babel"></script>

  （4）创建虚拟DOM

  （5）渲染

  ```javascript
   //创建虚拟DOM
  const vdom = (
              <div>
                  <h2 id="{id}" className="title">
                      <span style={{color:'white',fontSize:'25px'}}>{data}</span>
                  </h2>
                  <input type="text" placeholder="你好"/>
              </div>
              
          )
          //渲染
    ReactDOM.render(vdom,document.getElementById("test")); 
  ```

  

#### 2.JSX语法

- 全称：JavaScript XML

- react定义的一种类似于xml的js扩展语法 js+xml

- 本质是React.createElement(标签，属性，内容)方法的语法糖。

- 作用：用来简化创建虚拟DOM,在创建虚拟dom的时候

- 语法

  ```shell
   1.定义虚拟DOM,不要写引号
          2.标签中混入js表达式时要用{}
          3.样式的类名不要用class,要用className,防止和es6的class冲突
          4.内联样式，要用style={{key:value}}
          5.只能有一个根标签
          6.标签必须闭合 
          7.标签首字母
              （1）若小写字母开头，则转为html同名元素，若html无该标签，就报错
              （2）若是大写字母，会被当成组件
  ```

#### 3.模块与组件

##### 3.1模块

- 理解

  向外提供**特定功能**的js程序，一般就是一个js文件 

- 为什么要模块化？

  随着业务逻辑的增加，代码越来越多且复杂。

- 作用

  复用js,简化js的编写，提高js运行效率。

##### 3.2组件

- 理解

  用来实现局部功能效果的代码和资源的集合（html,css,js,img、、、）

- 为什么要组件化？

  当一个界面的功能很复杂的时候，拆成一个一个的模块，就会使得页面很整洁。

- 作用：

  复用代码，简化项目编码，提高运行效率。

##### 3.3模块化

- 当应用的js都是以模块来编写的，这个应用就是一个模块化的应用

##### 3.4组件化

- 当应用是一个又一个的组件组合而成的，那么这个应用就是组件化的。

### 三、React面向组件编程

#### 1.基本理解和使用

##### 1.1函数式组件

```javascript
<script type="text/babel">
        //1.创建函数式组件
        function MyComponent() {
            console.log(this);//babel翻译了之后，启动了严格模式，禁止了自定义函数中的this指向window,所以这里是undefined
            return <h2>我是用函数定义的组件（适用于【简单组件】的定义）</h2>
        }
        //2.渲染组件到页面
        ReactDOM.render(<MyComponent/>,document.getElementById("test"));
        /*注意：
        1.函数式组件开头要大写
        2.渲染时要用标签的形式
        */
       /*
       ReactDOM.render之后执行过程：
       1.React解析目标标签，找到了MyComponent组件
       2.发现目标组件是使用函数定义的，随后调用函数，将返回的虚拟DOM转换为真实DOM,随后呈现在页面中
       */
    </script>
```



##### 1.2类式组件

```javascript
<script type="text/babel">
        //1.创建类式组件 
        /*
        (1)必须继承一个React中内置的类
        (2)render()方法
        (3)有返回值
        */
        class MyComponent extends React.Component{
            /*
            （1）render 放在哪里？--MyComponent原型对象上   
            （2）谁使用？ --供实例使用
            （3）render中的this是谁？ --MyComponent组件实例对象
            */
            render(){
                console.log('render中的this:',this);
                return <h2>我是类定义的组件【复杂组件】的定义</h2>
            }
        }
        //2.渲染组件到页面 
        ReactDOM.render(<MyComponent/>,document.getElementById('test'));
         /*
       ReactDOM.render之后执行过程：
       1.React解析目标标签，找到了MyComponent组件
       2.发现目标组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
       3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中
       */
</script>
```

##### 1.3简单组件和复杂组件

人      状态   影响    行为

组件   状态（state）   影响    驱动（页面展示）

- 有state就是复杂组件，没有state就是简单组件

#### 2.组件实例的三大核心属性（函数组件没有实例）

##### 2.1  **state**

- 标准模式

  ```javascript
  <script type="text/babel">
         //1.创建类式组件
         class Weather extends React.Component{
             //构造器调用几次？   ---1次
             //通过构造器初始化state状态
              constructor(props){
                  console.log('constrctor');
                  super(props);
                  console.log(this);//关于this的操作都要放在super()后面
                  //原本state是null 继承而来
                  this.state = {isHot:false,wind:'微风'};
                  //把这个函数绑定给实例对象 解决titleClick中this的指向问题
                  this.titleClick = this.titleClick.bind(this);
             }
             render(){ //render调用几次？  ---状态更新几次就调用几次
                 //对象的解构
                 console.log('render');
                 const {isHot,wind} = this.state;
                 //console.log(this);
                 /*注意:
                 （1）c要大写 titleClick没有括号 React内部帮你调用
                 （2）onClick={this.titleClick} 这样只是赋值了函数的引用  调用时相当于直接调用
                 （3）类中的方法局部开启了严格模式，所以this无法指向window,就是undefined
                 */
                 return <h1 onClick={this.titleClick}>今天天气很{isHot ?'炎热':'凉爽'},{wind}</h1>
              }
              //titleClick调用几次？ --点几次调用几次
              titleClick(state){
                  console.log('titleClick');
                  //console.log(this);    
                  //注意：状态（state）不能直接更改，下面是错误的写法
                  //this.state.isHot = !this.state.isHot;
  
                  //注意：状态的修改必须通过this.setState({})来修改,这是一种合并，把不同的换掉
                  this.setState({isHot:!this.state.isHot});
              }
         }
         //2.渲染组件到页面
         ReactDOM.render(<Weather/>,document.getElementById("test"));
      </script>
  ```

- 简写模式

  ```javascript
   <script type="text/babel">
         //1.创建类式组件
         class Weather extends React.Component{
             //创建状态
             state = {isHot:false,wind:'微风'};
             render(){ 
                 console.log('render');
                 const {isHot,wind} = this.state;
          
                 return <h1 onClick={this.titleClick}>今天天气很{isHot ?'炎热':'凉爽'},{wind}</h1>
              }
              //自定义方法  赋值语句+箭头函数
              titleClick = () => {
                  console.log('titleClick');
                  this.setState({isHot:!this.state.isHot});
              }
         }
         //2.渲染组件到页面
         ReactDOM.render(<Weather/>,document.getElementById("test"));
      </script>
  ```

##### 2.2 props

- 不能去修改props的内容，会报错

- 在类式组件中使用

  ```javascript
  //props就是外部往里面传东西
  //组件标签中的属性都会被收集到props这个对象中
  <script type="text/babel">
          //1.创建一个类式组件
          class Person extends React.Component{
              render(){
                  //props的结构
                  const {name,age,sex} = this.props;
                  //props是只读的
                  //this.props.name = 'mark';//报错
                  return (
                      <ul>
                          <li>姓名：{name}</li>
                          <li>年龄：{age+1}</li>
                          <li>性别：{sex}</li>
                      </ul>
                  )
              }
              //简写  在类中使用 static 可以在类本身添加属性 
              //不适用static 是在类实例中使用
              static propTypes = {...}
              statuc defaultProps = {...}
          }
          //对Person组件的属性进行限制
          Person.propTypes = {
              name:PropTypes.string.isRequired,
              age:PropTypes.number,
              sex:PropTypes.string,
              speak:PropTypes.func
          }
          Person.defaultProps = {
              age:18,
              sex:'男'
          }
          function speak() {
              console.log('我说话了');
          }
          //2.渲染组件
          ReactDOM.render(<Person name="kobe" speak={speak} age={24} sex="男"/>,document.getElementById("test"));
          //批量传递
          const p = {name:'小李',age:18,sex:'男'}
          ReactDOM.render(<Person {...p}/>,document.getElementById("test1"));
          //注意：这里不是对象赋值的语法  {}是分隔符 表示要写js代码了 ...是react和babel这两个库的作用下才能让你这么写 
          //但它只适用于标签内使用
          //传统的js中，对象赋值是  let b = {...a}
      </script>
  ```

- 在函数式组件中使用（利用函数能传参的特点）

  ```javascript
  <script type="text/babel">
          //创建函数式组件
          function Person(props){
              //利用函数能够传参的特点
              const {name,age,sex} = props;
              return (
                  <ul>
                      <li>姓名：{name}</li>
                      <li>年龄：{age}</li>
                      <li>性别：{sex}</li>
                  </ul>
              )
          }
          //不能写在函数中 因为它和类不一样
          Person.propTypes = {
              name:PropTypes.string.isRequired,
              age:PropTypes.number,
              sex:PropTypes.string,
              speak:PropTypes.func
          }
          Person.defaultProps = {
              age:18,
              sex:'男'
          }
          //2.渲染组件
          //批量传递
          const p = {name:'小李'}
          ReactDOM.render(<Person {...p}/>,document.getElementById("test1"));
         
      </script>
  ```


##### 2.3 ref

- 字符串形式的ref

  ```javascript
   <script type="text/babel">
         //创建类式组件
          class Demo extends React.Component{
              render(){
                  return (
                      <div>
                          <input ref="input1" type="text" placeholder="请输入文本"/> &nbsp;
                          <button onClick={this.showMsg}>点击显示左边的内容</button>&nbsp;
                          <input ref="input2" onBlur={this.showMsg2} type="text" placeholder="请输入文本"/>
                      </div>
                  )
              }
              showMsg = () => {
                  const input1 = this.refs.input1;
                  alert(input1.value);
              }
              showMsg2 = () => {
                  const input2 = this.refs.input2;
                  alert(input2.value);
              }
          }
          //将组件渲染到页面
          ReactDOM.render(<Demo/>,document.getElementById("test"));
      </script>
  ```

- 回调内联形式的ref

  ```javascript
  <script type="text/babel">
         //创建类式组件
          class Demo extends React.Component{
              /*
              回调函数满足的三个条件：
              （1）你写的
              （2）不是你调用的
              （3）执行了，别人帮你调用的
              */
              render(){
                  return (
                      <div>
                          <input ref={c => this.input1 = c} type="text" placeholder="请输入文本"/> &nbsp;
                          <button onClick={this.showMsg}>点击显示左边的内容</button>&nbsp;<br/>
                          <input ref={c => this.input2 = c} onBlur={this.showMsg2} type="text" placeholder="请输入文本"/>&nbsp;
                         
                      </div>
                  )
              }
              showMsg = () => {
                  const input1 = this.input1;
                  alert(input1.value);
              }
              showMsg2 = () => {
                  const input2 = this.input2;
                  alert(input2.value);
              }
          }
          //将组件渲染到页面
          ReactDOM.render(<Demo/>,document.getElementById("test"));
      </script>
  ```

- 类式回调

  ```javascript
  <script type="text/babel">
         //创建类式组件
          class Demo extends React.Component{
              /*
              内联回调ref调用次数的问题：
              （1）当状态state更新时,页面会重新渲染，第一次调用结点值是null,第二次才是有效的值。
              */
              state = {isHot:true}
              render(){
                  return (
                      <div>     
                          <h2>今天天气很{this.state.isHot?'炎热':'凉爽'}</h2>
                          {/*官方推荐*/}
                          <input ref={this.input1Ref} type="text" placeholder="请输入文本"/> &nbsp;
                          {/*内联回调*/}
                          {/*<input ref={c => {this.input1 = c;console.log('@',c)}} type="text" placeholder="请输入文本"/> &nbsp;*/}
                          <button onClick={this.showMsg}>点击显示左边的内容</button>&nbsp;<br/>
                          <input ref={c => this.input2 = c} onBlur={this.showMsg2} type="text" placeholder="请输入文本"/>&nbsp;
                          <button onClick={this.changeWether}>点击切换天气</button>
                      </div>
                  )
              }
              showMsg = () => {
                  const input1 = this.input1;
                  alert(input1.value);
              }
              showMsg2 = () => {
                  const input2 = this.input2;
                  alert(input2.value);
              }
              changeWether = () => {
                  //修改状态
                  this.setState({isHot:!this.state.isHot});
              }
              input1Ref = (c) => {
                  this.input1 = c;
                  console.log('@',c)
              }
          }
          //将组件渲染到页面
          ReactDOM.render(<Demo/>,document.getElementById("test"));
      </script>
  ```

- React.createRef()

  ```javascript
  <script type="text/babel">
         //创建类式组件
          class Demo extends React.Component{
              /*
              React.createRef()创建出来的容器是‘专人专用的’，也就是说每个标签属性的ref使用的ref都是唯一的
              别的标签要用，就得重新 React.createRef()
              */
             //创建ref容器 放在实例身上 当标签的ref属性被解析之后 就会将节点放入容器中
              myRef = React.createRef();
              myRef1 = React.createRef();
              render(){
                  return (
                      <div>
                          <input ref={this.myRef} type="text" placeholder="请输入文本"/> &nbsp;
                          <button onClick={this.showMsg}>点击显示左边的内容</button>&nbsp;<br/>
                          <input ref={this.myRef1} onBlur={this.showMsg2} type="text" placeholder="请输入文本"/>&nbsp;
                         
                      </div>
                  )
              }
              showMsg = () => {
                  const value = this.myRef.current.value;
                  alert(value);
              }
              showMsg2 = () => {
                  const value = this.myRef1.current.value;
                  alert(value);
              }
          }
          //将组件渲染到页面
          ReactDOM.render(<Demo/>,document.getElementById("test"));
          /*
          ref总结：
          （1）字符串形式的ref,效率低
          （2）内联回调函数，会回调两次（问题不大，比较常用）
          （3）绑定类的形式回调，回调一次
          （4）createRef
          */
      </script>
  ```

#### 3.事件处理

- *通过onXxx属性指定事件处理函数（注意大小写）*

  ​      *a. React使用的是自定义（合成）的事件，而不是使用的原生的DOM事件 ---为了更好的兼容性*

  ​      *b. React中的事件是通过事件委托的方式处理的（委托给组件最外层的元素） --为了高效*

- 通过event.target得到发生事件的DOM元素对象 -- 不要过度使用ref

#### 4.收集表单数据

- 非受控组件

  ```javascript
  <script type="text/babel">
      //非受控组件 现用现取
          class Login extends React.Component{
              handleLogin = (event) => {
                  //阻止默认行为 防止页面跳转
                  event.preventDefault(); 
                  const {username,password} = this;
                  if(username.value==='hjp' && password.value==='666'){
                      alert('登录成功！');
                  }else{
                      alert('登录失败！');
                  }
              }
              render(){
                  return (
                      <form action="http://www.baidu.com" onSubmit={this.handleLogin}>
                          <input ref={c => this.username = c} type="text" name="username" placeholder="请输入用户名"/><br/>
                          <input ref={c => this.password = c} type="text" name="password" placeholder="请输入密码"/><br/>
                          <input type="submit" value="登录"/>
                      </form>
  
                  )
              }
          }
          ReactDOM.render(<Login/>,document.getElementById("test"));
      </script>
  ```

- 受控组件

  ```javascript
  <script type="text/babel">
      //受控组件 将值放到state中 用到时再去state取
          class Login extends React.Component{
              state = {
                  username:'',
                  password:''
              }
              handleLogin = (event) => {
                  //阻止默认行为 防止页面跳转
                  event.preventDefault(); 
                  const {username,password} = this.state;
                  if(username==='hjp' && password==='666'){
                      alert('登录成功！');
                  }else{
                      alert('登录失败！');
                  }
              }
              saveUsername = (event) => {
                  this.setState({username:event.target.value});
              }
              savePassword = (event) => {
                  this.setState({password:event.target.value});
              }
              render(){
                  return (
                      <form action="http://www.baidu.com" onSubmit={this.handleLogin}>
                          <input onChange={this.saveUsername} type="text" name="username" placeholder="请输入用户名"/><br/>
                          <input onChange={this.savePassword} type="text" name="password" placeholder="请输入密码"/><br/>
                          <input type="submit" value="登录"/>
                      </form>
  
                  )
              }
          }
          ReactDOM.render(<Login/>,document.getElementById("test"));
      </script>
  ```

#### 5.函数的柯里化

-  高阶函数：

  如果一个函数符合下面2个规范中的一个，那该函数就是高阶函数*

  ​      *1.若A函数，接收的参数是一个函数，那么A就是一个高阶函数。*

  ​      2.若A函数，返回值依然是一个函数，那么A就是一个高阶函数。

- 函数的柯里化

  通过函数调用的形式，继续返回一个函数，实现多次接收参数最后统一处理的函数编码形式。

  ```javascript
  sum(a){
          return (b)=>{
              return (c) => {
                  return a+b+c
              }
          }
      }
  ```

#### 6.组件的生命周期

- 旧版本

  <img src="D:\学习\大二\前端\react\react全家桶资料\02_原理图\react生命周期(旧).png" style="zoom:80%;" />

- 总结：
  1. 初始化阶段：由ReactDOM.render()触发 ---初次渲染
     1. constructor()
     2. componentWillMount()
     3. render()
     4. componentDidMount()  ----常用    一般在这个钩子中开启定时器、发送网络请求，订阅消息
  2. 更新阶段：由组件内部 this.setState() 或者父组件重新render 触发
     1. shouldComponentUpdate()[this.setState()]  componentWillReceiveProps() [父组件重新render]
     2. componentWillUpdate()    [forceUpdate()直接来到这一步]
     3. render()    ---必须使用的
     4. componentDidUpdate()
  3. 卸载组件，由ReactDOM.unmountComponentAtNode()触发
     1. componentWillUnmount()     ----常用   一般这个钩子做一些首尾的工作，关闭定时器，取消订阅消息
  
- 新版本

  <img src="D:\学习\大二\前端\react\react全家桶资料\02_原理图\react生命周期(新).png" style="zoom: 67%;" />

- 总结

  1. 初始化阶段：由ReactDOM.render()触发 ---- 初次渲染
     1. constructor()
     2. getDerivedStateFromProps()
     3. render()   (常用)
     4. componentDidMount()  （常用）
  2. 更新阶段：由组件内部this.setState()或父组件重新render触发
     1. getDerivedStateFromProps()
     2. shouldComponentUpdate()
     3. render()  
     4. getSnapshotBeforeUpdate()
     5. componentDidUpdate()
  3. 卸载组件:由ReactDOM.unmountComponentAtNode()触发
     1. componentWillUnmount()    （常用）

#### 7.面试题

*经典面试题:*

1). react/vue中的key有什么作用？（key的内部原理是什么？）

 2). 为什么遍历列表时，key最好不要用index?

​      *1. 虚拟DOM中key的作用：*

​          *1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。*

​          2). 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】,

​                 随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

​                  *a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：*

​                        *(1).若虚拟DOM中内容没变, 直接使用之前的真实DOM*

​                        (2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

​                  *b. 旧虚拟DOM中未找到与新虚拟DOM相同的key*

​                        根据数据创建新的真实DOM，随后渲染到到页面       

​      *2. 用index作为key可能会引发的问题：*

​                1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:

​                        会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

​                2. 如果结构中还包含输入类的DOM：

​                        会产生错误DOM更新 ==> 界面有问题。

​                *3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，*

​                  仅用于渲染列表用于展示，使用index作为key是没有问题的。 

​      *3. 开发中如何选择key?:*

​                *1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。*

​                *2.如果确定只是简单的展示数据，用index也是可以的。*

### 四、React应用（基于CLI脚手架）

1. 项目的初始化

   - 全局安装create-react-app

     npm install create-react-app@4.0.0 -g

### 五、Redux

- redux原理图

![](D:\学习\大二\前端\react\react全家桶资料\02_原理图\redux原理图.png)

原理：

1. ReactComponents要用到共享的变量，共享的变量放在redux里面，此时就不能简单地使用之前的this.setState()方法，而要通过redux实现。
2. 通过ActionsCreators(非必要)创建一个动作和数据的对象，然后通过dispatch({type,data})发送给Store
3. **Store是个很重要的角色**，它类似于一个调度者，就像生活中的老板，负责指挥，具体的事情不用它来干，而让手下的Reducers来办
4. Store传（preState,action）给Reducers，让它完成具体的功能，完成后将最新的状态发送Store.
5. 然后Store可将最新的状态发送给需要的Components。

注意：Reducers用于加工和初始化。

使用：

1. 首先创建reducer (reducer是一个纯函数)

   ```
   function countReducer(preState=initialState,action){
   	const {type,data} = action;
   	// 根据type对preState做一些操作
   }
   ```

2. 创建actions(创建动作对象)

   ```
   // 同步action
   export const incrementAction = data => ({type:'increment',data})
   // 异步action (前提是使用了redux-thunk,是action能是一个函数)
   export const incrementAsyncAction = (data,delay) => {
   	return dispatch => {
   		// 这里我们可以去发一些网络请求
   		setTimeout(()=>{
   			dispatch(incrementAvtion(data))
   		},delay)
   	}
   }
   ```

3. 创建store  传入reducer,注意当有多个reducer的时候要使用combineReducer

   ```
   // combineReducers里面的对象长啥样 到时候取数据的时候就啥样 state.count
   const reducers = combineReducers({
     count:countReducer,
     person:personReducer
   });
   createStore(reducer,applyMiddleWare(redux-thunk))
   ```

4. 创建容器对象，在react-redux中引入connect，连接redux和UI

   ```
   function CountUI(props){
    ...
   }
   const matchStateToProps = state => ({count:state.count,person:state.person})
   const matchDispatchToProps = dispatch => ({increment:data => dispatch(incrementAction(data))})
   export default connect(matchStateToProps,matchDispatchToProps)(countUI)
   ```

   

总结：react-redux、redux的联合使用。

1. 当使用了react-redux的时候，我们就需要使用容器和UI了，容器实质上也是个组件，但不是通过简单的rcc创建的，它要连接UI和redux，通过connect(state,dispatch{action})(UI)，注意redux是通过属性的方式传进来的，<container store={store}/>
2. 我们可以在index,js中，在App组件的最外层包一个<Provider>来为各个容器提供store
3. 在使用redux的时候，首先创建一个actions文件夹，在里面创建各个容器的action，接着创建reducers文件夹，在里面创建各个容器的reducer(注意返回的是一个纯函数)
4. 在Store.js中,要在创建store的时候传入reducer,看看是否有异步的action，在决定要不要使用redux-thunk这个中间件，当有多个reducer是，要使用combineReducer({count,person})将他们联系起来，注意{}中是啥，redux保存的状态就是啥。

### 六、React-Router

1. 一些概念你必须懂，在vue中，我已经说过了，这里不赘述。

   ```
   前端渲染，spa，前端路由，hashRouter,history
   ```

2. 使用React-Router

   组件式跳转与注册

   1. 在需要用到路由的地方编写路由链接（包含传参）

      ```
      import {Link,NavLink} from 'react-router-dom'
      <Link to="/home">主页</Link>
      <NavLink to="/home">主页</NavLink>
      
      navlink和link的区别：navlink可以添加activeStyle,activeClassName属性
      
      // 传参的方式有三种：params,search,state
      // 分别对应
      <Link to="/me/1">主页</Link>  =>  注册：<Route path="/me/:id" component={Me}/>
      <Link to="/me?id=1">主页</Link> => 正常注册
      <Link to="{pathname:'/me',state:{id:1}}">主页</Link> => 正常注册
      
      // 路由组件接收参数
      params: props.match.params
      query:  props.location.search => (?id=1&name=hjp)
      state:  props.location.state
      ```

   2. 注册路由(找到路径和组件的对应关系）

      ```
      import {Route,Redirect} from 'react-router-dom'
      import Home from '...'
      // 可以在编写路由链接的页面写 也可以放在App.js中写。
      <Switch> //只能选一个路径进行匹配
      	<Route exact path="/" component={}> //精准匹配
      	<Route path="/home" component={Home}/>
      	<Redirect to="/home"/>
      </Switch>
      ```

   编程式跳转

   1. 一般的组件中，props是没有history这个属性的，但是我们要手动的跳转就需要history这个属性，使用react-router-dom的withRouter高阶组件，把我们需要手动跳转的组件传进去即可。

      ```
      function RouterTest(props) {
        const toCounter = () => {
          console.log(props);
          props.history.push("/counter?id=1&name=hjp");
        };
        ...
       }
       export default withRouter(RouterTest);
      ```

   2. 注册路由和组件式跳转一模一样

3. renderRoutes的使用

   ```
   组件式注册路由，看起来会非常的混乱。一般项目中对路由统一管理。有个专门的route
   const routes = [
     { 
       path: '/',
       exact: true,
       component:Home
     },
     { 
       path:'/counter',
       component:Counter
       // 子路由
       // routes:[
       //   { 
       //     path:'/counter/a',
       //     component:
       //   }
       // ]
     },
     { 
       path: '/person',
       component:Person
     }
   ]
   export default routes;
   
   // App.js中(也可以在别的文件中，视具体情况)
   import {renderRoutes} from 'react-router-config'
   function App() {
     return (
       <div>
        <Home/>
        {renderRoutes(routes)};
       </div>
     );
   }
   export default App;
   
   ```


### 七、React  Hook

1. 导言

   react hook解决了函数式组件的一些问题，在react hook出现之前，函数式组件没有自己的状态，没有自己的生命周期，使得函数式组件得不到很好的使用，react hook的出现解决了上面的问题。

2. 有哪些hook

   这里我把他们分为4类，定义状态(标识)的hook，生命周期的hook，变量共享的hook，性能优化的hook，自定义hook.

   - 定义状态(标识)的hook

     ```
     (1)useState
       const [count,setCount] = useState(0)
       
     (2)useReducer
       const [state,dispatch] = useReducer(reducer纯函数,初始值)
       
     (3)useRef
       const inputRef = useRef()
     ```

   - 生命周期的hook

     ```
     (1)useEffect
      useEffect(() => {
      
      },[依赖数组，可传可不传])
      
     (2)useLayoutEffect
     useLayoutEffect(() => {
     
     },[依赖数组，可传可不传])
     ```

   - 变量共享的hook

     ```
     (1)createContext
        const MyContext = createContext()
        // 组件中使用
        <MyContext.Provider value="...">
        </MyContext.Provider>
        
     (2)useContext
       //组件中调用
       const data = useContext(MyContext)
       // 也可以用组件的方式接受
       <MyContext.Consumer>
       	{
       		value => {`${value}`}
       	}
       </MyContext.Consumer>
     ```

   - 性能优化的hook

     ```
     (1)useCallback -- 处理函数的
     const addCount = useCallback(() => {
     	setCount(count+1);
     },[count]);
     
     (2)useMemo -- 处理回调函数的返回值
     const addCount = useMemo(() => ({name:'hjp'}),[]);
     
     (3)useImperativeHandle(搭配forwardRef使用)
     const JPButton = forwardRef((props,ref) => {
     	const inputRef = useRef();
     	// 参数：绑定的对象  绑定的属性 依赖数组（依赖变时重新绑定）
     	useImperativeHandle(ref,() => ({
     		focus:() => {inputRef.focus()},
     		value:inputRef.current.value
     	},[inputRef])
     	return (
     		<input></input>
     	)
     })
     ```

   - 自定义hook

     ```
     就是将一些公共的逻辑抽取出来，放在一个函数中，类似于函数的封装，类名必须用use开头。
     ```

     

### 八、React拓展

#### 1.setState

setstate是异步更新状态，如果需要拿到更新后的状态的值，就要在回调函数中获取。

- setState({},callback)  第一个参数是个对象
- setState((state,prop) => {},callback)  第一个参数是个函数，参数有state，prop可写可不写。

#### 2.路由的懒加载

- 在react这个库中引入lazy
- const Count  =  lazy(() => import('./counter'))
- 在注册路由的时候需要在最外面包一个 <Suspend fallback={组件}></Suspend>，通过<Suspense> fallback指定在加载得到路由打包文件前显示一个自定义loading界面

#### 3.Hock

- useState

```javascript
//useState钩子 使得函数组件也有自己的状态 返回的是数组
       function Demo() {
           //只要状态发生变化，Demo就重新调用，但是useState()不会覆盖原来的值
           const [count,setCount] = React.useState(0);
           const [name,setName] = React.useState('jerry');
           function add(){
            setCount(count+1)
           }
           function changeName(){
            setName('tom')
           }
           return (
               <div>
                <h2>当前求和为 {count}</h2>
                <button onClick={add}>点我+1</button>
                <h2>名字：{name}</h2>
                <button onClick={changeName}>点我改名</button>
               </div>
           )
       }
       ReactDOM.render(<Demo/>,document.getElementById("test1"));
```

- useEffect()

  ```javascript
   function Demo() {
             //只要状态发生变化，Demo就重新调用，但是useState()不会覆盖原来的值
             const [count,setCount] = React.useState(0);
             const [name,setName] = React.useState('jerry');
             function add(){
              setCount(count+1)
             }
             function changeName(){
              setName('tom')
             }
             function unmount(){
                ReactDOM.unmountComponentAtNode(document.getElementById("test1")); 
             }
             /*
             useEffect()这个钩子可以相当于类式组件的三个生命周期
             分别是componentDidMount,componentDidUpdate,componentWillUnmount
             1.至于是哪一个componentDidMount,componentDidUpdate
             取决于useEffect的第二个参数，默认不传参数是监听所有组件的变化，也就是componentDidUpdate
                             如果传的是一个空数组那么就是谁也不见监听，相当于componentDidMount
              2.componentWillUnmount 就相当于第一个参数里返回的那个函数 
             */
             //开启一个定时器，在类式组件中相当于在componentDidMount中开启
             React.useEffect(() => {
                 let timer = setInterval(() => {
                     setCount(count => count+1)
                 },1000);
                 return () => {
                     clearInterval(timer);
                 }
             }, [])
             return (
                 <div>
                  <h2>当前求和为 {count}</h2>
                  <button onClick={add}>点我+1</button>
                  <h2>名字：{name}</h2>
                  <button onClick={changeName}>点我改名</button>
                  <button onClick={unmount}>卸载组件</button>
                 </div>
             )
         }
         ReactDOM.render(<Demo/>,document.getElementById("test1"));
  ```

#### 4.context

```javascript
 const MyContext = React.createContext()
        const {Provider,Consumer} = MyContext
        class A extends React.Component{
            state = {name:'hjp',age:18}
            render(){
                const {name,age} = this.state;
                return (
                    <div className="div1">
                        <h2>我是A组件</h2>
                        <p>我是{name},年龄{age}</p>
                        <Provider value={{name,age}}>
                            <B/>
                        </Provider>
                        
                    </div>
                )
                
            }
        }
        class B extends React.Component{
            render(){
                return(
                    <div className="div2">
                        <h2>我是B组件</h2>
                        <C></C>
                    </div>
                )
                
            }
        }
        /*
        class C extends React.Component{
            //类式组件接收context
            static contextType = MyContext;
            render(){
                const {name,age} = this.context
                return (
                    <div className="div3">
                        <h2>我是C组件</h2>
                        <p>我从A组件接收的用户名{name},年龄{age}</p>
                    </div>
                )
                
            }
        }
        */
        function C(){
            return (
                <div className="div3">
                    <h3>我是C组件</h3>
                    <h4>我从A组件接收到的用户名:
                    <Consumer>
                        {value => `${value.name},年龄是${value.age}`}
                    </Consumer>
                    </h4>
                </div>
            )
        }
        ReactDOM.render(<A/>,document.getElementById("test"));
```

#### 5.pureComponent

1. 问题
   - 在开发中，组件内只要重新调用this.setState()方法，组件就会重新渲染，纵使状态没有任何的变化。
   - 当父组件没有给子组件传递props时，父组件的重新渲染，也会带着子组件一起渲染
   - 因此，性能常常得不到优化。
2. 解决
   - 我们可以重写shouldComponentUpdate这个钩子，shouldComponentUpdate(preProp,preState)
   - 比较之前的prop和state和当前的一不一样，来决定是否放行
   - 但是，当state,prop比较复杂的时候，判断的东西越来越多，比较麻烦
   - 这时，我们使用PureComponent代替Component
   - 但是，PureCompoennt只是进行的浅比较，当你setState的对象和之前的对象是同一个对象的时候，就不会重新render.

#### 6. renderProps

```javascript
class A extends React.Component{
            render(){
                return (
                    <div className="div1">
                        <h2>我是A组件</h2>   
                        <B render={(name,age) => <C name={name} age={age}/>}>BBBB</B>
                    </div>
                )
            }
        }
        class B extends React.Component{
            state = {name:'lqh',age:17}
            render(){
                const {name,age} = this.state;
                return(
                    <div className="div2">
                        <h2>我是B组件</h2>
                        {this.props.children}
                        {this.props.render(name,age)}
                    </div>
                )  
            }
        }
        class C extends React.Component{
            render(){
                const {name,age} = this.props;
                return (
                    <div className="div3">
                        <h2>我是C组件</h2>
                        <p>我从B组件接收的用户名{name},年龄{age}</p>
                    </div>
                )   
            }
        }
        ReactDOM.render(<A/>,document.getElementById("test"));
```

#### 7.错误边界

理解：

错误边界：用来捕获后代组件错误，渲染出备用页面

特点：

**只能捕获后代组件生命周期产生的错误**，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

使用方式：

getDerivedStateFromError配合componentDidCatch

```js
state = {hasError:''}
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

#### 8.组件通信方式总结

方式：

		props：
			(1).children props
			(2).render props
		消息订阅-发布：
			pubs-sub、event等等
		集中式管理：
			redux、dva等等
		conText:
			生产者-消费者模式

### 七、初识Fiber

1. fiber是什么？有什么作用？

   ```shell
   1.fiber是用来性能优化的，防止页面卡顿，提高用户体验。fiber就是一个执行的单元碎片，这些执行单元会组合成一个fiber tree,和ReactElement tree一一对应。
   
   2.
   	我们看到的页面渲染和GUI息息相关，我们看到的页面效果都是一帧一帧渲染的，一帧之内可能会做很多的操作，很多时候一帧并做不完很多事情，又因为JS的执行和GUI是同一个线程的，JS执行时会阻塞GUI,反之亦然。当JS代码执行时，页面还停留在上一帧，就会让用户刚到卡顿。
   	fiber的出现解决了上面的问题，当出现一些耗时的操作的时候，会做一些协同（recodiation）,即将这些耗时的操作分成多个fiber,将控制权交给浏览器，让浏览器先做完用户的响应，等到浏览器空闲下来的时候，浏览器会返回requestIdleCallback()的一个函数，我们只需要将fiber传给它，让它执行即可
   ```

   ### 八、ReactHooks的原理

   1.useState的原理

   ```shell
   1.useState本质上用的是dispatcher的useState,而这个dispatcher最终来自于ReactCurrentDispatcher.current,而其中的dispatcher就是一种类型，初始状态下调用的是DispatcherOnMountedtype,传入的初始值hook.memoizedState = hook.baseState = initialState,memoizedState永远存储的是最新的值，用到的数据结构是链表。
   ```

   

