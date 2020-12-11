<script>
    // components
    import Todo from './Todo.svelte';

    // LOCAL STORAGE

    // create name 'todos'...
    let todos;

    // add todos to local storage if not already in local storage...
    if (localStorage.getItem('todos') === null) {
        localStorage.setItem('todos', JSON.stringify([
            {
                name: 'Complete online JavaScript course',
                completed: true,
                id: 0
            },
            {
                name: 'Jog around the park 3x',
                completed: false,
                id: 1
            },
            {
                name: '10 minutes meditation',
                completed: false,
                id: 2
            },
            {
                name: 'Read for 1 hour',
                completed: false,
                id: 3
            },
            {
                name: 'Pick up groceries',
                completed: false,
                id: 4
            },
            {
                name: 'Complete Todo App on Frontend Mentor',
                completed: false,
                id: 5
            },
        ]));
    }

    // localStorage.clear();

    // assign todos from local storage to name 'todos'...
    todos = JSON.parse(localStorage.getItem('todos'));

    // update local storage whenever 'todos' is changed...
    $: {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // variables
    let newTodo;
    $: itemsLeft = todos.filter((todo) => !todo.completed).length;
    let filter = 'all';

    // FUNCTIONS
    function addTodo() {
        if (newTodo) {
            // generate unique (unused) ID...
            let usedIDs = [];
            let count = 0;
            let newID;

            for (let todo of todos) {
                usedIDs.push(todo.id);
            }

            while (true) {
                if (usedIDs.includes(count)) {
                    console.log('nope');
                    count++;
                } else {
                    console.log('yes');
                    newID = count;
                    break;
                }
            }

            // add todo to todos...
            todos = [...todos, {name: newTodo, completed: false, id: newID}];
            newTodo = '';
            console.log(todos);
        }
    }

    function clearCompleted() {
        todos = todos.filter((todo) => todo.completed === false);
    }

    function deleteTodo(e) {
        // wait for animation to finish before removing todo...
        setTimeout(() => {
            todos = todos.filter((todo) => todo.id != e.detail);
        }, 1000);
    }

    // add 'press 'enter' to add new todo' functionality...
    function handleKeydown(e) {
        if (e.keyCode === 13) {
            addTodo();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<form class="todo-list" on:submit|preventDefault={addTodo}>
    <div class="todo-list__input-wrapper">
        <input class="todo-list__input" type="text" placeholder="Create a new todo..." aria-label="add a new item to the todo list" bind:value={newTodo}>
    </div>

    <div class="todo-list__container">
        <ul class="todo-list__list" id="todo-list">
            {#if filter === 'all'}
                {#each todos as todo (todo.id)}
                    <Todo name={todo.name} bind:completed={todo.completed} id={todo.id} on:deleteTodo={deleteTodo}/>
                {/each}
            {:else if filter === 'active'}
                {#each todos.filter((todo) => !todo.completed) as todo (todo.id)}
                    <Todo name={todo.name} bind:completed={todo.completed} id={todo.id} on:deleteTodo={deleteTodo}/>
                {/each}
            {:else if filter === 'completed'}
                {#each todos.filter((todo) => todo.completed) as todo (todo.id)}
                    <Todo name={todo.name} bind:completed={todo.completed} id={todo.id} on:deleteTodo={deleteTodo}/>
                {/each}
            {/if}
        </ul>
    
        <div class="todo-list__footer">
            <span class="items-left">{itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} left</span>
            <div class="todo-list__options-container">
                <button class="todo-list__filter-option" class:active-filter={filter === 'all'} on:click|preventDefault={() => filter = 'all'}>All</button>
                <button class="todo-list__filter-option" class:active-filter={filter === 'active'} on:click|preventDefault={() => filter = 'active'}>Active</button>
                <button class="todo-list__filter-option" class:active-filter={filter === 'completed'} on:click|preventDefault={() => filter = 'completed'}>Completed</button>
            </div>
            <button class="clear-completed" on:click|preventDefault={clearCompleted}>Clear Completed</button>
        </div>
    </div>
</form>

<style>
    .todo-list {
        margin-bottom: 12rem;
    }

    /* input */

    .todo-list__input-wrapper {
        position: relative;
        margin-bottom: 2rem;
    }

    .todo-list__input-wrapper::before {
        content: '';
        position: absolute;
        top: 1.75rem;
        left: 3rem;
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid var(--color-border);
        border-radius: 50%;
        background-color: transparent;
        transition: border 1s;
    }

    .todo-list__input {
        width: 100%;
        height: 6rem;

        border: none;
        border-radius: 5px;
        padding-left: 9rem;
        background: var(--color-surface);

        color: var(--color-text-active);
        font-size: 1.5rem;
        font-weight: 400;
        letter-spacing: -.25px;
        transition: background 1s, color 1s;
    }

    .todo-list__input::placeholder {
        color: var(--color-text-1);
        font-family: 'Josefin Sans', sans-serif;
        opacity: 1;
    }

    .todo-list__container {
        border-radius: 5px;
        box-shadow: var(--box-shadow);
        transition: box-shadow 1s;
    }

    /* todo-list  */

    .todo-list__list {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        overflow: hidden;
    }

    /* footer */

    .todo-list__footer {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 6.25rem;

        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0 3rem;
        background: var(--color-surface);

        color: var(--color-text-1);
        font-size: 1.5rem;
        letter-spacing: -.2px;
        line-height: 1.75rem;

        transition: background 1s, color 1s;
    }

    .todo-list__options-container {
        position: absolute;
        top: 8rem;
        left: 0;
        display: flex;
        width: 100%;
        height: 6rem;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background: var(--color-surface);
    }

    /* buttons */

    button {
        color: var(--color-text-1);
        transition: color .3s;
    }

    button:hover {
        color: var(--color-text-active);
    }

    .todo-list__footer button {
        border: none;
        background: transparent;
        font-family: 'Josefin Sans', sans-serif;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .todo-list__options-container button {
        font-size: 1.75rem;
        font-weight: bold;
    }

    .todo-list__options-container button:not(:last-child) {
        margin-right: 2rem;
    }

    .active-filter {
        color: var(--color-bright-blue);
    }

    /* media queries */

    @media only screen and (min-width: 600px) {
        .todo-list {
            margin-bottom: 6rem;
        }

        /* input */

        .todo-list__input-wrapper {
            margin-bottom: 3rem;
        }

        .todo-list__input-wrapper::before {
            top: 2.5rem;
            width: 3rem;
            height: 3rem;
        }

        .todo-list__input {
            height: 8rem;
            font-size: 2.25rem;
        }

        /* footer */

        .todo-list__footer {
            font-size: 1.75rem;
        }

        .todo-list__options-container {
            position: initial;
            display: initial;
            width: initial;
            height: initial;
            border-radius: initial;
            background: initial;
        }

        .todo-list__footer button {
            font-size: 1.75rem;
        }
    }
</style>