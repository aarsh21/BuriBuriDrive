<script lang="ts">
	interface BreadcrumbItem {
		id: string;
		name: string;
	}

	import { FileIcon, FolderIcon, UploadIcon, ChevronLeftIcon, SearchIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
	import { mockFiles } from '$lib/utils/mockdata';
	import { fade } from 'svelte/transition';

	// Current folder ID (null means root)
	let currentFolderId: string | null = $state(null);

	// Breadcrumb navigation
	let breadcrumbs: BreadcrumbItem[] = $state([{ id: 'root', name: 'My Drive' }]);

	// Get current folder items
	const currentItems = $derived(mockFiles.filter((item) => item.parentId === currentFolderId));

	// Handle folder click
	function openFolder(folderId: string, folderName: string) {
		currentFolderId = folderId;
		breadcrumbs = [...breadcrumbs, { id: folderId, name: folderName }];
	}

	// Handle navigate back
	function navigateBack(index: number) {
		if (index === 0) {
			currentFolderId = null;
			breadcrumbs = [breadcrumbs[0]];
		} else {
			const targetFolder = breadcrumbs[index];
			currentFolderId = targetFolder.id === 'root' ? null : targetFolder.id;
			breadcrumbs = breadcrumbs.slice(0, index + 1);
		}
	}

	// Handle file upload
	function handleUpload() {
		const input = document.createElement('input');
		input.type = 'file';
		input.multiple = true;
		input.onchange = (e) => {
			const files = (e.target as HTMLInputElement).files;
			if (files) {
				// Here you would normally upload the files
				alert(`Selected ${files.length} files for upload`);
			}
		};
		input.click();
	}
</script>

<div class="p-6">
	<!-- Navigation and Actions -->
	<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div class="flex items-center gap-2">
			{#if currentFolderId !== null}
				<Button
					variant="ghost"
					size="icon"
					onclick={() => navigateBack(breadcrumbs.length - 2)}
					class="hover:bg-primary/10"
				>
					<ChevronLeftIcon class="size-4" />
				</Button>
			{/if}
			<div class="flex items-center gap-2 text-sm">
				{#each breadcrumbs as crumb, index}
					{#if index > 0}
						<span class="text-muted-foreground">/</span>
					{/if}
					<button class="transition-colors hover:text-primary" onclick={() => navigateBack(index)}>
						{crumb.name}
					</button>
				{/each}
			</div>
		</div>
		<div class="flex items-center gap-2">
			<div class="relative">
				<SearchIcon class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search files..."
					class="w-full border-border/50 bg-muted/50 pl-9 hover:border-border focus-visible:ring-primary sm:w-64"
				/>
			</div>
			<Tooltip>
				<TooltipTrigger>
					{#snippet child({ props: triggerProps })}
						<Button {...triggerProps} onclick={handleUpload} class="bg-primary hover:bg-primary/90">
							<UploadIcon class="mr-2 size-4" />
							Upload
						</Button>
					{/snippet}
				</TooltipTrigger>
				<TooltipContent>Upload files to current folder</TooltipContent>
			</Tooltip>
		</div>
	</div>

	<!-- Files Grid -->
	<div
		class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
		in:fade={{ duration: 150 }}
	>
		{#each currentItems as item}
			<div
				role="button"
				tabindex="0"
				class="group relative flex cursor-pointer flex-col items-center rounded-lg border border-border/50 bg-card p-6 transition-all duration-200 hover:scale-[1.02] hover:border-primary/20 hover:bg-accent hover:shadow-lg hover:shadow-primary/5"
				onclick={() =>
					item.type === 'folder' ? openFolder(item.id, item.name) : window.open(item.url, '_blank')}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						if (item.type === 'folder') {
							openFolder(item.id, item.name);
						} else {
							window.open(item.url, '_blank');
						}
					}
				}}
			>
				<div
					class="absolute inset-0 rounded-lg bg-gradient-to-b from-primary/0 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"
				></div>
				{#if item.type === 'folder'}
					<FolderIcon class="mb-3 size-12 text-primary" />
				{:else}
					<FileIcon class="mb-3 size-12 text-muted-foreground" />
				{/if}
				<span class="break-all text-center text-sm transition-colors group-hover:text-primary">
					{item.name}
				</span>
			</div>
		{/each}
		{#if currentItems.length === 0}
			<div
				class="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground"
			>
				<FolderIcon class="mb-4 size-12 opacity-50" />
				<p>This folder is empty</p>
			</div>
		{/if}
	</div>
</div>
