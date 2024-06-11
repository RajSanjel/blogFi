declare module '@editorjs/image' {
    import { BlockTool } from '@editorjs/editorjs';

    interface ImageToolData {
        file: {
            url: string;
        };
        caption?: string;
        withBorder?: boolean;
        withBackground?: boolean;
        stretched?: boolean;
    }

    class ImageTool implements BlockTool {
        constructor(config?: { data?: ImageToolData; api?: any; config?: any; readOnly?: boolean });
        save(blockContent: HTMLElement): ImageToolData;
        render(): HTMLElement;
    }

    export default ImageTool;
}

declare module '@editorjs/list' {
    import { BlockTool } from '@editorjs/editorjs';

    interface ListToolData {
        items: string[];
        style: 'ordered' | 'unordered';
    }

    class List implements BlockTool {
        constructor(config?: { data?: ListToolData; api?: any; config?: any; readOnly?: boolean });
        save(blockContent: HTMLElement): ListToolData;
        render(): HTMLElement;
    }

    export default List;
}
