import { tags as t } from '@lezer/highlight';
import { EditorView } from 'codemirror';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';

const highlightStyles = [
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
    {
        tag: t.strong,
        fontWeight: "bold"
    },
    {
        tag: t.emphasis,
        fontStyle: "italic"
    },
    {
        tag: t.strikethrough,
        textDecoration: "line-through"
    },
    {
        tag: t.link,
        textDecoration: "underline"
    },
    {
        tag: t.heading,
        fontWeight: "bold",
        color: "#f38ba8"
    },
]

const settings = {
    background: '#1e1e2e',
    foreground: '#cdd6f4',
    caret: '#f5e0dc',
    selection: '#3b3c4f',
    lineHighlight: '#2a2b3c',
    gutterBackground: '#1e1e2e',
    gutterForeground: '#cdd6f4',
}

export const catppuccinMochaTheme = EditorView.theme({
    '&': {
        backgroundColor: settings.background,
        color: settings.foreground,
    },
    '.cm-content': {
        caretColor: settings.caret,
    },
    '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: settings.caret,
    },
    '&.cm-focused .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: settings.selection,
    },
    '.cm-activeLine': {
        backgroundColor: settings.lineHighlight,
    },
    '.cm-gutters': {
        backgroundColor: settings.gutterBackground,
        color: settings.gutterForeground,
    },
    '.cm-activeLineGutter': {
        backgroundColor: settings.lineHighlight,
    },

    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: "#afdaad" },
}, {
    dark: true
});
const highlightStyle = HighlightStyle.define(highlightStyles);
export const catppuccinMocha = [catppuccinMochaTheme, syntaxHighlighting(highlightStyle)];
