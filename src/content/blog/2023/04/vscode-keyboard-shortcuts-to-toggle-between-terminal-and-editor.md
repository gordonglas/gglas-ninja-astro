---
title: VSCode keyboard shortcuts to toggle between the terminal and editor
description: VSCode keyboard shortcuts to toggle between the terminal and editor
slug: 2023/04/vscode-keyboard-shortcuts-to-toggle-between-terminal-and-editor
pubDate: 2023-04-20
tags:
  - Dev
  - Dev
  - Setup
  - VSCode
published: true
---

In VSCode, the default keyboard shortcut bindings to switch/toggle between the terminal and active editor is
```
ctrl+`
```
(ctrl+backtick)

The problem is, when switching back to the editor, it closes the terminal pane. If you want the terminal to remain open when switching back to the editor, you'll need to change the keyboard shortcut for at least the command `workbench.action.focusActiveEditorGroup`

Personally, I also don't really like moving my hand so far to press `ctrl+backtick` to switch-to/open the terminal, so I change that as well. The command for that is `workbench.action.terminal.focus`

Follow the steps below to change the keyboard shortcuts.

## How to set the keyboard shortcuts

[This superuser post](https://superuser.com/a/1343695/96637) suggests using `ctrl+k`, but this is a bad idea, because it will interfere with several existing two-part keybindings that rely on first pressing `ctrl+k`. Ironically, that conflicts with the keyboard shortcut that opens the `Keyboard Shortcut UI` itself, which is `ctrl+k, ctrl+s`. 😄

We'll use different bindings that haven't been used by default yet.

Open the Keyboard Shortcuts UI.  
You can do this by pressing `ctrl-k, ctrl-s`, or using the menus: `File` ->  `Preferences` -> `Keyboard Shortcuts`.

Copy and paste `workbench.action.focusActiveEditorGroup` into the search box.

Click the `+` button on the result, bind it to `ctrl+alt+h` by pressing that combination, then press Enter to set it.

You can also change the `workbench.action.terminal.focus` binding if you wish.
I use `ctrl+alt+j`

That's all.
