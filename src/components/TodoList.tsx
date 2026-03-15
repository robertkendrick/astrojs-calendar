import type { FunctionComponent } from 'preact';
import { signal } from '@preact/signals';

// Check if our logic works
// console.log(todos.value);
// Logs: [{text: "Buy groceries"}, {text: "Walk the dog"}]

// Simulate adding a new todo
// text.value = 'Tidy up';
// addTodo();

// Check that it added the new item and cleared the `text` signal:
// console.log(todos.value);
// Logs: [{text: "Buy groceries"}, {text: "Walk the dog"}, {text: "Tidy up"}]

// console.log(text.value); // Logs: ""



export default function TodoList<FunctionalComponent>() {
    
    const todos = signal([{ text: 'Buy groceries' }, { text: 'Walk the dog' }]);
    
    // We'll use this for our input later
    const text = signal('');
    
    const onInput = event => {
        text.value = event.currentTarget.value
        // console.log(event)
        console.log(text.value)
    }

    function addTodo() {
        console.log('addTodo: ', text.value)
        todos.value = [...todos.value, { text: text.value }];
        text.value = ''; // Clear input value on add
    }
    
    function removeTodo(todo) {
        todos.value = todos.value.filter(t => t !== todo);
    }

    return (
		<>
			<input value={text.value} onInput={onInput} />
			<button onClick={addTodo}>Add</button>
			<ul>
				{todos.value.map(todo => (
					<li>
						{todo.text} <button onClick={() => removeTodo(todo)}>❌</button>
					</li>
				))}
			</ul>
		</>
	);
}
