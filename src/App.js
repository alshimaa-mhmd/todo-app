import { useState } from 'react';
import lightbg from './/images/bglight.jpg'
import darkbg from './/images/bg-desktop-dark.jpg'
import TodoItem from './TodoItem';


let todoListItems =[
  {
    id:111111110,
    checked : false,
    describtion:"to do 1",
  },
  {
    id:12222,
    checked : false,
    describtion:"to do 2",
  },
  {
    id:2333333333,
    checked : false,
    describtion:"to do 3",
  }
]

 function App() {

  const [item, setItem] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [todoList, setTodoList] = useState(todoListItems);
  const [filtered, setFiltered] = useState('all');

  const filteredItems = todoList.filter( (item) => {
    if(filtered === 'completed'){
      return item.checked;
    }else if(filtered === 'active') {
      return !item.checked ;
    }
    return true;
  });

  function clearCompleted(){
    setTodoList((items) => items.filter(item => !item.checked ))
  }

  const generateId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  function addItem (e) {
      setTodoList ( [...todoList, 
        {
          id: generateId(),
          checked: false,
          describtion: e.target.value,
        }
      ])
  }

  function handleAddButton () {
      if(!item) return;
      setTodoList ( [...todoList, 
        {
          id: generateId(),
          checked: false,
          describtion: item,
        }
      ]);
      setItem("");
  }

  function deleteItem(id){
    const newItems = todoList.filter( item => item.id !== id);
    setTodoList(newItems);
  };

  function handleKeyPress(e) {
      if(e.key === "Enter"){
        if(!item) return;
        addItem(e);
        setItem('');

      }
  };

  function handleCheckbox(id){
    setTodoList((items) => items.map(item => item.id === id ? {...item, checked :!item.checked} : item))
  }

  function handleDarkMode(){
    setIsDark( isDark => !isDark);
  }

  return (
    <div className="flex flex-col items-center transition-all duration-300 h-dvh">
      <div className=" w-[100%] h-56 flex flex-col items-center gap-10 p-8 transition-all duration-300 "
      style={{ backgroundImage: isDark ? `url(${darkbg})` : `url(${lightbg})` }}
      >
        <div className="flex items-center justify-evenly gap-32  w-[100%] text-white">
          <p className='font-bold tracking-[10px] text-[27px]'>TODO</p>
          <div className='cursor-pointer' onClick={handleDarkMode}>
          { !isDark ? 
          <span><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg></span> : <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
          </span>
          }
          </div>
        </div>
        <div>
        <button className={`${isDark ? 'bg-[#25273c] text-slate-300 border-0' : 'bg-white text-black'} w-[45px] h-[45px] rounded-l-md transition-all duration-300 text-opacity-35`} onClick={handleAddButton}>
        ◯</button>
        <input placeholder='Create a new todo...' className={`w-[305px] h-[45px] px-4 rounded-r-md focus:ring-0 focus:inset-0 ${isDark ? 'bg-[#25273c] text-slate-300 border-0' : 'bg-white text-black'} transition-all duration-300 sm:w-[535px] md:w-[515px] outline-none`} type="text" value={item} onChange={(e) => setItem(e.target.value)} onKeyUp={handleKeyPress}/>
        </div>
      </div>


      <div className={`h-[70%] relative w-full ${isDark ? 'bg-[#181824]' : 'bg-[#f8f8f8]'}`}>
        <div className={`absolute top-[105px] left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg border-slate-200 w-[350px] pt-4 overflow-y-auto max-h-screen h-[300px] scrollbar-none transition-all duration-300 sm:w-[580px] md:w-[560px] ${isDark ? 'bg-[#25273c] text-slate-300 ' : 'bg-white  text-black'}`}>
            {filteredItems.reverse().map((todoItem) => <TodoItem todoItem={todoItem} key={todoItem.id} onDelete={deleteItem} onToggle={handleCheckbox} isDark={isDark}/>)}
          </div>
      </div>
      <div className={`border-t flex items-center justify-between w-[350px] sm:w-[580px] md:w-[560px] text-[#6c7187] absolute bottom-0 px-5 py-3 z-[100] ${isDark ? 'bg-[#25273c]  border-gray-700' : 'bg-white border-slate-300'} h-[50px]  absolute bottom-32 rounded-b-lg`}>
              <span className='' > {todoList.filter(item => !item.checked).length} items left</span>
              <div className='md:flex items-center justify-between hidden space-x-4'>
              <span className={`cursor-pointer hover:text-[#4c7cdf] ${filtered === 'all' ? "text-[#4c7cdf]" : ''}`} onClick={ () => setFiltered('all')}>All</span>
              <span className={`cursor-pointer hover:text-[#4c7cdf] ${filtered === 'active' ? "text-[#4c7cdf]" : ''}`} onClick={ () => setFiltered('active')}>Active</span>
              <span className={`cursor-pointer hover:text-[#4c7cdf] ${filtered === 'completed' ? "text-[#4c7cdf]" : ''}`} onClick={ () => setFiltered('completed')}>Completed</span>
              </div>
              <span className='cursor-pointer hover:text-[#4c7cdf]' onClick={clearCompleted}>Clear Completed</span>
          </div>
      <div className={` text-center text-[#6c7187] w-[350px] sm:w-[580px] md:hidden rounded-lg ${isDark ? 'bg-[#25273c] ' : 'bg-white'} h-[45px] px-4 py-3 absolute bottom-10 space-x-4`}>
              <span className={`cursor-pointer text-center hover:text-[#4c7cdf]  ${filtered === 'all' ? "text-[#4c7cdf]" : ''}`} onClick={ () => setFiltered('all')}>All</span>
              <span className={`cursor-pointer hover:text-[#4c7cdf]  ${filtered === 'active' ? "text-[#4c7cdf]" : ''}`} onClick={ () => setFiltered('active')}>Active</span>
              <span className= {`cursor-pointer hover:text-[#4c7cdf]  ${filtered === 'completed' ? "text-[#4c7cdf]" : ''}`} onClick={ () => setFiltered('completed')}>Completed</span>
      </div>
    </div>
  );
}

export default App;
