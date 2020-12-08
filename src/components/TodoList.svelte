<script>
    import Todo from './Todo.svelte';

    let itemsLeft = 5;

    let todos = [
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
    ];
</script>

<form class="todo-list" on:submit|preventDefault>
    <div class="todo-list__input-wrapper">
        <input class="todo-list__input" type="text" placeholder="Create a new todo...">
    </div>

    <ul class="todo-list__list">
        {#each todos as todo (todo.id)}
            <Todo name={todo.name} completed={todo.completed} id={todo.id}/>
        {/each}
    </ul>

    <div class="todo-list__footer">
        <span class="items-left">{itemsLeft} items left</span>
        <div class="todo-list__options-container">
            <button class="todo-list__filter-option active-filter-option">All</button>
            <button class="todo-list__filter-option">Active</button>
            <button class="todo-list__filter-option">Completed</button>
        </div>
        <button class="clear-completed">Clear Completed</button>
    </div>
</form>

<style>
    .todo-list {
        margin-bottom: 12rem;
        /* box-shadow: 0px 35px 50px -15px rgba(194, 195, 214, 0.5); */
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
        /* box-shadow: 0px 35px 50px -15px rgba(194, 195, 214, 0.5); */
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

    .active-filter-option {
        color: var(--color-bright-blue);
    }

    /* media queries */

    @media only screen and (min-width: 800px) {
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