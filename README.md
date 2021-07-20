# Vue-TodoList

Vue.js 웹앱 제작 강의에서 구현한 To Do List 클론 코딩입니다.

 ## 🛠 Skill & Tool
 **`HTML5`**  **`CSS3`**  **`Javascript`**  **`Vue.js`** **`fontawesome`**


## 💡 기능
### To-Do List Create, Read, Update, Delete 구현 📜
 - 할 일 체크 여부에 따른 순서 정렬
 
### localStorage에 데이터 저장 💾
 - localStorage와 JSON 객체의 API를 사용해 브라우저 저장소에서 데이터 저장하여 동기화 
 
### Vuex를 통한 상태 관리 🗂
 - 상태와 로직을 컴포넌트에서 분리하여 컴포넌트 간 통신과 데이터를 효율적으로 전달 및 관리
 
## 📖 프로젝트를 하며 배운 것
 - **화면의 DOM 조작을 위한 Vue Directive**    
    HTML 태그의 속성에 v- 접두사가 붙은 특별한 속성으로 화면의 DOM 조작을 쉽게 할 수 있는 문법들을 제공
    - **v-bind** : HTML 태그의 속성 값을 데이터 값을 사용할 경우
    - **v-for** : for-loop을 구현하기 위해 사용 (e.g 리스트 목록 렌더링). 두 번째 인자로 리스트의 index를 자동으로 부여해주어 별도의 로직 없이 index 사용 가능.
    - **v-on** : 이벤트 핸들링
      ```
      // TodoList.vue  
        <ul>
          <li v-for="(todoItem, index) in this.storedTodoItems" v-bind:key="todoItem.item" class="shadow">
            <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete({todoItem, index})"></i>
            <span v-bind:class="{textCompleted: todoItem.completed}">{{todoItem.num}}. {{ todoItem.item }}</span>
            <span class="removeBtn" v-on:click="removeTodo({todoItem, index})"><i class="fas fa-trash-alt"></i></span>
          </li>
        </ul>
      ```
        
    - **v-model** : Vue 인스턴스 내부 데이터에 변화를 주는 방법 중 하나로 2-way-binding이 가능
      ```
      // TodoInput.vue
      <template>
        <div class="inputBox shadow">
          <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        </div>
      </template>

      <script>
      export default {
        data() {
          return {
            newTodoItem: ''
          }
        },
      }
      </script>
      ```
          
          
 - **브라우저 저장소인 localStorage에 데이터 저장 및 삭제**    
   - **localStorage.setItem(key, value)** : 로컬 스토리지에 데이터 저장시키는 API
   - **JSON.stringify(Object)** : 객체(Object)를 String으로 변환해주는 API. 객체를 string으로 변환하지 않고 그대로 object를 저장하면
   로컬 스토리지의 value에 [object Object]로 저장이 되어 값을 확인할 수 없어서 string으로 변환해주어야 한다.
      ```
      // TodoInput.vue
      <template>
        <div>
          <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo"/>
          <button v-on:click="addTodo">add</button>
        </div>
      </template>

      <script>
        export default {
          data() {
            return {
              newTodoItem: '',
            }
          }
          method: {
            addTodo() {
              if(this.newTodoItem !== '') {
                var obj = { completed: false, item: this.newTodoItem}
                localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
                this.clearInput();
              }
            },
            clearInput() {
              this.newTodoItem = '';
            }
          }
        }
      </script>
      ```
          
    
   - **localStorage.removeItem()** : 로컬 스토리지에서 데이터를 지울 때 사용하는 API
   - **localStorage.getItem(localStorage.key(i))** : 로컬 스토리지의 key에 해당하는 value를 가져오는 API
   - **JSON.parse()** : String을 객체(Object)로 바꿔주는 API
     ```
     // TodoList.vue
      <template>
        <ul>
          <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item">
            <i class="check" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
              v-on:click="toggleComplete(todoItem, index)" >check</i>
            // 객체를 받아 왔으니 객체의 속성에 접근해야 원하는 값을 보여줄 수 있다. 
            <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
            <span v-on:click="removeTodo(todoItem, index)">remove</span>
          </li>
        </ul>
      </template>

      <script>
        export default {
          data() {
            return {
              todoItems: [],
            }
          },
          method() {
            removeTodo(todoItem, index) {
              localStorage.removeItem(todoItem);
              this.todoItems.splice(index, 1);
            },
            toggleComplete(todoItem, index) {
              todoItem.completed = !todoItem.completed; // true, false 토글 로직
              // localStorage의 데이터를 갱신
              localStorage.removeItem(todoItem.item);
              localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
            }
          },
          created() {
            if(localStorage.length > 0) { // localStorage에 item이 있다면
              for (var i=0; i < localStorage.length; i++) {
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                  this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

                  //this.todoItems.push(localStorage.key(i))
                }
              }
            }
          },
        }
      </script>
      ```
        
    - **localStorage.clear()** : 로컬 스토리지의 데이터를 전부 지우는 API
      ```
      // TodoFooter.vue
      <template>
        <div>
          <span v-on:click="clearTodo">Clear All</span>
        </div>
      </template>

      <script>
        export default {
          method: {
            clearTodo() {
              localStorage.clear();
            }
          }
        }
      </script>
      ```
        
 - **컴포넌트 통신(Props, Event emit)**    
 다 같은 데이터를 각각의 컴포넌트에서 따로 데이터를 관리하고 있어 데이터 전달이 되지 않아 동기화가 되지 않는다. 
 따라서 전체 컴포넌트에서 하나의 데이터만 바라볼 수 있도록 상위 컴포넌트에서 데이터를 동기화 하고 props로 하위 컴포넌트들에 데이터를 내려주고,
 하위 컴포넌트에서 발생한 추가 이벤트는 $emit을 사용하여 상위 컴포넌트로 전달한다.    
      
    - **props** : 부모 컴포넌트에서 자식 컴포넌트에 데이터를 전달할 때 사용한다.
        
        
        `v-bind:내려 보낼 props의 속성이름 = "현재 위치의 컴포넌트 데이터 속성"`    
        

        ```
        // App.vue
        <template>
          <div id="app">
            <TodoList v-bind:propsdata="todoItems" />
          </div>
        </template>
        ```
        `props:['상위 컴포넌트에서 보낸 데이터 속성 이름']`
        ```
        // TodoList.vue
        <template>
          <ul>
            <li v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item">
          </ul>
        </template>

        <script>
        export default {
          props: ['propsdata'],
          ...
        }
        </script>
        ```
    
	- **Evnet emit** : 자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달하기 위해 이벤트를 발생시킨다.    
  
      `v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메소드 명"`
          
      ```
      // App.vue
      <template>
        <div id="app">
          <TodoInput v-on:addTodoItem="addOneItem"/>
        </div>
      </template>
      
      <script>
        import ...
        export default {
          data() {
            return {
              todoItems: [],
            }
          },
          method: {
            addOneItem(todoItem) {
              var obj = { completed: false, item: todoItem}
              localStorage.setItem(todoItem, JSON.stringify(obj));
              this.todoItems.push(obj);
            }
          },
          ...
         }
        </script>
        ```
        `this.$emit('이벤트 이름', 인자1, 인자2, ...);`
        ```
        // TodoInput.vue
        <template>
        ...
        </template>
        <script>
        export default {
          data() {
            return {
              newTodoItem: '',
            }
          }
          method: {
            addTodo() {
              if(this.newTodoItem !== '') {
                this.$emit("addTodoItem", this.newTodoItem);
              }
            }
          }
        }
      </script>
      ```
          
  - **Vue의 모달 컴포넌트와 Slot**    
  
    Vue에서는 모달 컴포넌트를 제공하고 있고 slot 이라는 기능으로 특정 컴포넌트의 일부 UI들을 재사용 할 수 있다. 
    ```
    // Modal.vue
    <template>
       <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  default header
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

            </div>
          </div>
        </div>
      </transition>
    </template>
    ```
        
    slot은 name 속성을 지정하여 여러 개를 사용할 수도 있다. 
    ```
    // TodoInput.vue
    <template>
      ...
      <Modal>
        <h3 slot="header">경고!</h3>
        <p slot="body">...</p>
      </Modal>
     </template>
     
     <script>
     import Modal from './common/Modal.vue';
     ...
     </script>
     ```    
     
  - **Vue의 트랜지션**    
  Vue는 CSS의 transition 효과를 더 빠르고 간단하게 구현하기 위해 전용 컴포넌트(태그)를 제공한다.    
  transition-group의 name에 지정한 클래스에 따라서 CSS 트랜지션 클래스가 붙는다. tag는 HTML 태그를 의미한다.      
  
    transition-group name="`list`" tag="p"  
    ```
    <transition-group name="list" tag="p">
      <span v-for="item in items" v-bind:key="item" class="list-item">
        {{ item }}
      </span>
    </transition-group>
    ```
    .`list`-enter-active등 name에 지정해 준 클래스명 뒤에 붙는 것들은 Vue.js에서 자체적으로 지원해주는 클래스들이다.
    ```
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
    }
    ```
  
  - **상태 관리를 위한 Vuex (스토어 구현)**    
    <https://iambom.notion.site/Vuex-b2fd44716d534ab5a040196f2dae723f>
 
 
 
         
    
    