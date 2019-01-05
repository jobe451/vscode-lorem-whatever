// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {LoremWhateverGenerator, PredefinedGenerators} from './lorem';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const defaultMinWordSize = 200;
const generatorsMap = new Map();

export function activate(context: vscode.ExtensionContext) {

	let commands = [
		vscode.commands.registerCommand('loremWhatever.loremGibson', () => {
			runGenerator(PredefinedGenerators.GIBSON);
		}),	
		vscode.commands.registerCommand('loremWhatever.loremBuzzword', () => {
			runGenerator(PredefinedGenerators.BUZZWORD);
		}),	
		vscode.commands.registerCommand('loremWhatever.loremConstitution', () => {
			runGenerator(PredefinedGenerators.CONSTITUTION);
		}),	
		vscode.commands.registerCommand('loremWhatever.loremBasel3', () => {
			runGenerator(PredefinedGenerators.BASEL3);
		}),	
		vscode.commands.registerCommand('loremWhatever.loremFaust', () => {
			runGenerator(PredefinedGenerators.FAUST);
		}),	
		vscode.commands.registerCommand('loremWhatever.loremGenesis', () => {
			runGenerator(PredefinedGenerators.GENESIS);
		}),	
	];

	commands.forEach((command) => {
		context.subscriptions.push(command);
	});
}

function runGenerator(mapType: PredefinedGenerators) {
	let generator: LoremWhateverGenerator;
	
	generator = generatorsMap.get(mapType);
	if(generator === undefined)  {
		generator = new LoremWhateverGenerator(mapType);
		generatorsMap.set(mapType, generator);
	}

	let loremText = generator.getSentencesByMinWordCount(defaultMinWordSize);
	insertText(loremText);
}

function insertText(lorem: string) {
	var editor = vscode.window.activeTextEditor;
	if(editor !== undefined) {
		editor.edit((edit) => {
				if(editor !== undefined) {
					editor.selections.forEach((selection) => {
						edit.delete(selection);
						edit.insert(selection.start, lorem);
						edit.insert(selection.start, "\n");
					});	
				}			
			}
		);
	}
}


// this method is called when your extension is deactivated
export function deactivate() {}
