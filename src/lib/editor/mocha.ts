import { EditorView } from "@codemirror/view"
import type { Extension } from "@codemirror/state"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"
import { flavors } from "@catppuccin/palette"

const mocha = flavors.mocha.colors;

/// The editor theme styles for One Dark.
const cursor = mocha.peach.hex;
const tooltipBackground = mocha.overlay0.hex;
const highlightBackground = mocha.overlay1.hex;

export const catppuccinMochaTheme = EditorView.theme({
    "&": {
        color: mocha.text.hex,
        backgroundColor: mocha.base.hex
    },

    ".cm-content": {
        caretColor: cursor
    },

    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: "#3b3c4f" },

    ".cm-panels": { backgroundColor: mocha.surface0.hex, color: mocha.text.hex },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },

    ".cm-searchMatch": {
        backgroundColor: mocha.peach.hex,
        outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
        backgroundColor: "#6199ff2f"
    },

    ".cm-activeLine": { backgroundColor: "#6699ff0b" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
        backgroundColor: "#bad0f847"
    },

    ".cm-gutters": {
        backgroundColor: mocha.base.hex,
        color: mocha.text.hex,
        border: "none"
    },

    ".cm-activeLineGutter": {
        backgroundColor: "#6699ff0b"
    },

    ".cm-foldPlaceholder": {
        backgroundColor: "transparent",
        border: "none",
        color: "#ddd"
    },

    ".cm-tooltip": {
        border: "none",
        backgroundColor: tooltipBackground,
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
        borderTopColor: "transparent",
        borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
        borderTopColor: tooltipBackground,
        borderBottomColor: tooltipBackground
    },
    ".cm-tooltip-autocomplete": {
        "& > ul > li[aria-selected]": {
            backgroundColor: highlightBackground,
            color: mocha.text.hex
        }
    }
}, { dark: true })


export const catppuccinMochaHighlightStyle = HighlightStyle.define([
    {
        tag: t.keyword,
        color: mocha.mauve.hex
    },
    {
        tag: [t.name, t.deleted, t.character],
        color: mocha.red.hex
    },
    {
        tag: [t.propertyName, t.macroName],
        color: mocha.yellow.hex,
        fontStyle: "italic"
    },
    {
        tag: [t.function(t.variableName), t.labelName],
        color: mocha.blue.hex,
        fontStyle: "italic"
    },
    {
        tag: [t.color, t.constant(t.name), t.standard(t.name)],
        color: mocha.peach.hex
    },
    {
        tag: [t.definition(t.name), t.separator],
        color: mocha.overlay2.hex
    },
    {
        tag: [t.typeName, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
        color: mocha.blue.hex
    },
    {
        tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
        color: mocha.sky.hex
    },
    {
        tag: t.meta,
        color: mocha.mauve.hex
    },
    {
        tag: t.comment,
        color: mocha.overlay0.hex
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
        color: mocha.surface0.hex,
        textDecoration: "underline"
    },
    {
        tag: t.heading,
        fontWeight: "bold",
        color: mocha.flamingo.hex
    },
    {
        tag: [t.atom, t.bool, t.variableName],
        color: mocha.peach.hex
    },
    {
        tag: [t.processingInstruction, t.string, t.inserted],
        color: mocha.green.hex
    },
    {
        tag: t.invalid,
        color: mocha.red.hex
    },
    {
        tag: t.number,
        color: mocha.peach.hex
    }
])

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const catppuccinMocha: Extension = [catppuccinMochaTheme, syntaxHighlighting(catppuccinMochaHighlightStyle)]