<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div
	class="flex min-h-screen w-full flex-1 flex-col items-center justify-center bg-gradient-to-r from-zinc-500 via-stone-600 to-zinc-900 text-zinc-50"
>
	{@render children()}
</div>
