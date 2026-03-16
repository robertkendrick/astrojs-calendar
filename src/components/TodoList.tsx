import { signal } from '@preact/signals';

const text = signal('');

// ******** WHY DOES todos NEED TO BE A SIGNAL !
// because when an item is removed from the todos array it needs to be a signal so that the UI gets updated
// If it isnt a signal it would not get updated and the UI would still being showing it.

// const todos = signal([{ text: 'Buy groceries' }, { text: 'Walk the dog' }]);
let todos = [{ text: 'Buy groceries' }, { text: 'Walk the dog' }]

//--------------------------------------------------------------------------------------------------------
export default function TodoList() {
    const onInput = event => {
        // event.preventDefault();
        text.value = event.target.value
        // console.log(event)
        console.log('onInput: ', text.value)
    }
        
     function addTodo(e) {
        console.log('addTodo: ', text.value)
        // todos.value = [...todos.value, { text: text.value }];
        todos = [...todos, { text: text.value }];
        text.value = ''; // Clear input value on add
    }
    
    function removeTodo(todo) {
        console.log('removeTodo: ', todo)
        // todos.value = todos.value.filter(t => t !== todo);
        todos = todos.filter(t => t !== todo);
        console.log(todos)
    }

    return (
		<>
        {console.log('re-rendering...')}
			<input type="text" value={text.value} onInput={onInput} />
			<button onClick={addTodo}>Add</button>
			<ul>
				{/* {todos.value.map(todo => ( */}
				{todos.map(todo => (
					<li>
						{todo.text} <button onClick={() => removeTodo(todo)}>❌</button>
					</li>
				))}
			</ul>
		</>
	);
}
