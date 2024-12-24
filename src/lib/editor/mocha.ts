import { createTheme } from 'thememirror';
import { tags as t } from '@lezer/highlight';

export const catppuccinMocha = createTheme({
    variant: 'dark',
    settings: {
        background: '#1e1e2e',
        foreground: '#cdd6f4',
        caret: '#f5e0dc',
        selection: '#3b3c4f',
        lineHighlight: '#2a2b3c',
        gutterBackground: '#313244',
        gutterForeground: '#cdd6f4',
    },
    styles: [
        {
            tag: t.comment,
            color: '#6c7086',
        },
        {
            tag: t.variableName,
            color: '#eba0ac',
        },
        {
            tag: [t.string, t.special(t.brace)],
            color: '#a6e3a1',
        },
        {
            tag: t.number,
            color: '#fab387',
        },
        {
            tag: t.bool,
            color: '#fab387',
        },
        {
            tag: t.null,
            color: '#f9e2af',
        },
        {
            tag: t.keyword,
            color: '#cba6f7',
        },
        {
            tag: t.operator,
            color: '#94e2d5',
        },
        {
            tag: t.className,
            color: '#f9e2af',
        },
        {
            tag: t.definition(t.typeName),
            color: '#f9e2af',
        },
        {
            tag: t.typeName,
            color: '#cba6f7',
        },
        {
            tag: t.angleBracket,
            color: '#94e2d5',
        },
        {
            tag: t.tagName,
            color: '#89b4fa',
        },
        {
            tag: t.attributeName,
            color: '#f9e2af',
        },
    ],
});