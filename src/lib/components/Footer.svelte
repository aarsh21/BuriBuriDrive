<script lang="ts">
	import { HeartIcon } from 'lucide-svelte';
</script>

<footer
	class="fixed bottom-0 left-0 w-full border-t border-border/50 bg-gradient-to-b from-background/95 to-background backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto p-4">
		<p class="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
			Made with
			<HeartIcon class="size-4 animate-pulse text-red-500" />
			by
			<a
				href="https://github.com/aarsh21"
				target="_blank"
				class="font-medium text-primary transition-colors hover:text-primary/80">Aarsh</a
			>
		</p>
	</div>
</footer>
