<script lang="ts">
	import FileManager from '$lib/components/File-Manager.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { TooltipProvider } from '$lib/components/ui/tooltip';
</script>

<div class="dark min-h-screen w-full bg-background text-foreground">
	<main class="container mx-auto p-4 pb-20">
		<TooltipProvider>
			<FileManager />
		</TooltipProvider>
	</main>
	<Footer />
</div>
