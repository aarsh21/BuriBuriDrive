export interface FileItem {
	id: string;
	name: string;
	type: 'file' | 'folder';
	url?: string;
	parentId: string | null;
}

export const mockFiles: FileItem[] = [
	// Root items
	{
		id: 'root-folder-1',
		name: 'Documents',
		type: 'folder',
		parentId: null
	},
	{
		id: 'root-folder-2',
		name: 'Images',
		type: 'folder',
		parentId: null
	},
	{
		id: 'root-file-1',
		name: 'presentation.pdf',
		type: 'file',
		url: 'https://example.com/presentation.pdf',
		parentId: null
	},
	// Documents folder items
	{
		id: 'doc-1',
		name: 'Project Proposal.pdf',
		type: 'file',
		url: 'https://example.com/proposal.pdf',
		parentId: 'root-folder-1'
	},
	{
		id: 'doc-folder-1',
		name: 'Contracts',
		type: 'folder',
		parentId: 'root-folder-1'
	},
	// Images folder items
	{
		id: 'img-1',
		name: 'vacation.jpg',
		type: 'file',
		url: 'https://example.com/vacation.jpg',
		parentId: 'root-folder-2'
	},
	{
		id: 'img-2',
		name: 'profile.png',
		type: 'file',
		url: 'https://example.com/profile.png',
		parentId: 'root-folder-2'
	},
	// Contracts folder items
	{
		id: 'contract-1',
		name: 'agreement.docx',
		type: 'file',
		url: 'https://example.com/agreement.docx',
		parentId: 'doc-folder-1'
	}
];
