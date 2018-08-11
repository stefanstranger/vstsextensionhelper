// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');

// Load tasks.json from VSTS Extension Task
function loadTaskJSON() {
    console.log('loadTaskJSON function is called')
    // Get the current text editor
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        this._statusBarItem.hide();
        return;
    }

    let doc = editor.document;

    // Only retrieve document when it's a JSON file
    if (doc.languageId === "json") {
        let fileName = doc.fileName;
        vscode.window.showInformationMessage('Task.json name: ' + fileName)
        // Update the status bar
        //this._statusBarItem.text = fileName;
        //this._statusBarItem.show();
        let content = doc.getText()

        const docProvider = {
            provideTextDocumentContent: () => content
        };

        vscode.workspace.registerTextDocumentContentProvider('vstsextensionhelper', docProvider);
        vscode.commands.executeCommand("vscode.previewHtml",
            vscode.Uri.parse('vstsextensionhelper:Preview Task'), vscode.ViewColumn.One)
            .then(() => 1, error => console.log(error));
    } else {
        this._statusBarItem.hide();
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vstsextensionhelper" is now active!');
    var vstsexttask = vscode.commands.registerCommand('extension.openPreview', () => loadTaskJSON());
    context.subscriptions.push(vstsexttask);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;