function TodoItem({todoItem, onDelete, onToggle, isDark}){
   const {id, checked, describtion} = todoItem;

    return(
        <>
        <div className="flex items-center justify-between px-4">
            <div className="flex">
           <input className={`appearance-none rounded-[50%] min-h-[23px] max-h-[25px] min-w-[25px] mr-3 border cursor-pointer ${checked ? "bg-gradient-to-r from-blue-600 to-purple-500 after:content-['✔'] after:text-white after:text-[15px] after:text-center after:flex after:items-center after:justify-center after:leading-[1.8]": "bg-transparent "}`} type="checkbox" value={checked} onChange={()=> onToggle(id)}/>
           <p className={`${checked ? "line-through text-[#6c7187]" : ''}  flex-wrap`} >{describtion}</p>
           </div>
           <span className="text-right cursor-pointer" onClick={() => onDelete(id)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></span>
        
        </div>
        <hr className={` my-4 ${isDark ? 'border-gray-700' : 'border-gray-300'} `} />
        </>
    )
}

export default TodoItem;