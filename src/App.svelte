<script>
    // components
    import ThemeBtn from './components/ThemeBtn.svelte';
    import TodoList from './components/TodoList.svelte';
    import Todo from './components/Todo.svelte';
    import { onMount } from 'svelte';

    // themes
    let body = window.document.body;
    let themes = ['dark-theme', 'light-theme', 'christmas-theme'];

    if (localStorage.getItem('themeIndex') === null) {
        localStorage.setItem('themeIndex', 0);
    }

    let unusedVar = 'idk'

    let themeIndex = localStorage.getItem('themeIndex');
    body.classList.add(themes[themeIndex % themes.length])

    function changeTheme() {
        themeIndex++;
        body.className = '';
        body.classList.add(themes[themeIndex % themes.length]);
        localStorage.setItem('themeIndex', themeIndex);
    }

    // background images
    let bgImgs = [
        {
            theme: 'dark-theme',
            pathMobile: 'assets/img/bg-mobile-dark.jpg',
            pathDesktop: 'assets/img/bg-desktop-dark.jpg',
            id: 0
        },
        {
            theme: 'light-theme',
            pathMobile: 'assets/img/bg-mobile-light.jpg',
            pathDesktop: 'assets/img/bg-desktop-light.jpg',
            id: 1
        },
        {
            theme: 'christmas-theme',
            pathMobile: 'assets/img/bg-mobile-christmas.jpg',
            pathDesktop: 'assets/img/bg-desktop-christmas.jpg',
            id: 2
        }];
</script>

<div class="bg-img-container">
    {#each bgImgs as bgImg (bgImg.id)}
        <picture>
            <source media="(max-width: 399px)" srcset={bgImg.pathMobile}>




            <img class="bg-img" src={bgImg.pathDesktop} alt="" class:bg-img--active={themes[themeIndex % themes.length] === bgImg.theme}>
        </picture>
    {/each}
</div>

<main class="main">
    <div class="main__header">
        <h1 class="heading">Todo</h1>
        <ThemeBtn element={body} on:click={changeTheme}/>
    </div>

    <TodoList/>

    <notanhtmlelement></notanhtmlelement>

    {@debug}

    <div class="main__footer">
        <p class="note">Drag and drop to reorder list.</p>
        <p class="attribution">Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://github.com/ApplePieGiraffe" target="_blank">ApplePieGiraffe</a>.</p>
    </div>
</main>


<style>
    /* background images */

    .bg-img-container {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
    }

    .bg-img {
        position: absolute;
        width: 100%;
        height: 300px;
        object-fit: cover;
        opacity: 0;
        transition: opacity 1s;
    }

    .bg-img--active {
        opacity: 1;
    }

    /* layout */

    :global(body) {
        padding: 0 3rem;
        padding-top: 6rem;
    }

    .main {
        width: 100%;
        max-width: 67.5rem;
        margin: 0 auto;
        /* margin-top: 6rem; */
    }

    /* header */

    .main__header {
        display: flex;
      align-items: center;
      margin-bottom: 5rem;
    }

    .heading {
        margin-right: auto;
        color: white;
        font-size: 3.5rem;
        letter-spacing: 1.875rem;
        line-height: 3.5rem;
        text-transform: uppercase;
    }

    /* footer */

    .main__footer {
        color: var(--color-text-1);
        letter-spacing: -.2px;
        line-height: 1.75rem;
    text-align: center;
    transition: color 1s;
    }

    .note {
        margin-bottom: 1rem;
        font-size: 1.75rem;
    }

    .attribution {
        margin-bottom: 3rem;
        font-size: 11px;
    }

    .attribution a {
        color: var(--color-bright-blue);
    }

    /* media queries */

    @media only screen and (min-width: 800px) {
        :global(body) {
            padding-top: 8.75rem;
        }

        .main__header {
            margin-bottom: 6rem;
        }

        .heading {
    font-size: 5rem;
    line-height: 5rem;
        }
    }
</style>

