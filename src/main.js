import App from './App.svelte';

const app = new App({
	target: document.body
});

export default app;

// Sortable.js

import Sortable from "sortablejs";

let sortableTodoList = document.getElementById('todo-list');

let sortable = new Sortable(sortableTodoList, {
	animation: 500
});