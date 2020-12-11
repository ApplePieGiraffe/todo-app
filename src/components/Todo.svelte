<script>
    // modules
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    let dispatch = createEventDispatcher();

    export let name;
    export let completed;
    export let id;

    let deleteAnimation = false;
    
    function deleteTodo() {
        deleteAnimation = true;
        dispatch('deleteTodo', id);
    }
</script>

<li class="todo" class:completed={completed} class:animation--fadeOut={deleteAnimation === true} in:fade|local>
    <label class="label" for={'checkbox-' + id}>
        <input class="checkbox sr-only" id={'checkbox-' + id} type="checkbox" bind:checked={completed}>
        <span class="fake-checkbox-wrapper">
            <span class="fake-checkbox">
                <img class="icon-check" src="/assets/img/icon-check.svg" alt="" aria-hidden="true">
            </span>
        </span>
        <span class="name">{name}</span>
    </label>
    <button class="btn-close" type="button" aria-label="delete item" on:click|preventDefault={deleteTodo}>
        <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </button>
</li>

<style>
    /* animations */

    @keyframes fadeOutLeft {
        0% {
            transform: translate(0);
            opacity: 1;
        }
        50% {
            transform: translate(-20rem);
            opacity: 0;
        }
        100% {
            height: 0;
            transform: translate(-20rem);
            opacity: 0;
        }
    }

    .animation--fadeOut {
        animation: fadeOutLeft 1s;
    }

    /* styles */

    .todo {
        display: flex;
        width: 100%;
        height: 6.5rem;
        align-items: center;
        border-bottom: 1px solid var(--color-border);
        padding: 0 3rem;
        background: var(--color-surface);
        color: var(--color-text-active);
        transition: border 1s, background 1s, color 1s;
    }
    
    .label {
        display: flex;
        align-items: center;
        margin-right: auto;
        cursor: pointer;
    }

    .checkbox:focus + .fake-checkbox-wrapper {
        outline: 2px dotted var(--color-text-active);
    }

    .fake-checkbox-wrapper {
        flex: 1 0 auto;
        position: relative;
        display: block;
        width: 3rem;
        height: 3rem;
        margin-right: 3rem;
        border-radius: 50%;
        padding: 1px;
        background: var(--color-border);
        transition: background 1s;
    }

    .fake-checkbox-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--gradient-primary);
        opacity: 0;
        transition: opacity .5s;
    }

    .label:hover .fake-checkbox-wrapper::before {
        opacity: 1;
    }

    .fake-checkbox {
        position: relative;
        z-index: 1;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--color-surface);
        transition: background 1s;
    }

    .icon-check {
        opacity: 0;
    }

    .btn-close {
        opacity: 0;
        border: none;
        padding: .75rem;
        background: transparent;
        cursor: pointer;
        transition: opacity .3s;
    }

    .btn-close:focus {
        opacity: 1;
    }

    .todo:hover .btn-close {
        opacity: 1;
    }

    .name {
        position: relative;
        font-size: 1.5rem;
        line-height: 2rem;
        /* transition: color 0s; */
    }

    .name::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 0;
        height: 1px;
        background: var(--color-text-active);
        transition: width 1s, background 1s;
    }

    /* completed */

    .completed .fake-checkbox-wrapper {
        background: var(--gradient-primary);
    }

    .completed .fake-checkbox {
        background: var(--gradient-primary);
    }

    .completed .icon-check {
        opacity: 1;
    }

    .completed .name {
        color: var(--color-text-completed);
    }

    .completed .name::before {
        width: 100%;
        background: var(--color-text-completed);
    }

    /* media queries */

    @media only screen and (min-width: 600px) {
        .todo {
            height: 8rem;
        }

        .name {
            font-size: 2.25rem;
        }
    }
</style>