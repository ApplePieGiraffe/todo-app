<script>
    export let name;
    export let completed;
    export let id;
</script>

<li class="todo" class:completed={completed}>
    <label class="label" for={'checkbox-' + id}>
        <input class="checkbox" id={'checkbox-' + id} type="checkbox" bind:checked={completed}>
        <div class="fake-checkbox-wrapper">
            <div class="fake-checkbox">
                <img class="icon-check" src="/assets/img/icon-check.svg" alt="" aria-hidden="true">
            </div>
        </div>
        <span class="name">{name}</span>
    </label>
    <button class="btn-close" aria-label="delete button">
        <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </button>
</li>

<style>
    .todo {
        display: flex;
        width: 100%;
        height: 8rem;
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

    .checkbox {
        display: none;
    }

    .fake-checkbox-wrapper {
        width: 3rem;
        height: 3rem;
        margin-right: 3rem;
        border-radius: 50%;
        padding: 1px;
        background: var(--color-border);
        transition: background 1s;
    }

    .label:hover .fake-checkbox-wrapper {
        background: var(--gradient-primary);
    }

    .fake-checkbox {
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
        background: transparent;
        cursor: pointer;
        transition: opacity .3s;
    }

    .todo:hover .btn-close {
        opacity: 1;
    }

    .name {
        position: relative;
        transition: color 1s;
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
</style>