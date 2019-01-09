// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {LoremWhateverGenerator, PredefinedGenerators, LoremIpsumBehaviour} from './lorem';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let defaultMinWordSize = 200;
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
		vscode.commands.registerCommand('loremWhatever.loremLorem', () => {
			runGenerator(PredefinedGenerators.LOREM);
		}),	
		vscode.commands.registerCommand('loremWhatever.loremCustom1', () => {
			runGenerator("Custom1");
		}),	
		vscode.commands.registerCommand('loremWhatever.loremCustom2', () => {
			runGenerator("Custom2");
		}),	
		vscode.commands.registerCommand('loremWhatever.loremCustom3', () => {
			runGenerator("Custom3");
		}),	
		vscode.commands.registerCommand('loremWhatever.loremCustom4', () => {
			runGenerator("Custom4");
		}),	
		vscode.commands.registerCommand('loremWhatever.loremCustom5', () => {
			runGenerator("Custom5");
		}),	
		vscode.commands.registerCommand('loremWhatever.loremDefault', () => {
			let defaultLoremName = <string>vscode.workspace.getConfiguration('loremWhatever').get("defaultLorem");
			let generatorType: PredefinedGenerators|string;

			if      (defaultLoremName === "Genesis")       {generatorType = PredefinedGenerators.GENESIS}
			else if (defaultLoremName === "Faust")         {generatorType = PredefinedGenerators.FAUST}
			else if (defaultLoremName === "Gibson")        {generatorType = PredefinedGenerators.GIBSON}
			else if (defaultLoremName === "Constitution")  {generatorType = PredefinedGenerators.CONSTITUTION}
			else if (defaultLoremName === "Basel 3")       {generatorType = PredefinedGenerators.BASEL3}
			else if (defaultLoremName === "Buzzword")      {generatorType = PredefinedGenerators.BUZZWORD}
			else if (defaultLoremName === "Lorem Ipsum")   {generatorType = PredefinedGenerators.LOREM}
			else if (defaultLoremName === "Custom 1")      {generatorType = "Custom1"}
			else if (defaultLoremName === "Custom 2")      {generatorType = "Custom2"}
			else if (defaultLoremName === "Custom 3")      {generatorType = "Custom3"}
			else if (defaultLoremName === "Custom 4")      {generatorType = "Custom4"}
			else if (defaultLoremName === "Custom 5")      {generatorType = "Custom5"}
			else                                           {generatorType = PredefinedGenerators.GIBSON}

			runGenerator(generatorType);
		}),	
	];

	commands.forEach((command) => {
		context.subscriptions.push(command);
	});
}

function runGenerator(mapType: PredefinedGenerators|string): void {
	let generator: LoremWhateverGenerator;
	
	generator = generatorsMap.get(mapType);
	if(generator === undefined)  {
		if(typeof mapType  === "string") {
			let configCustomArray = [];
			let customLorems = vscode.workspace.getConfiguration('loremWhatever').get("customLorems");
			if (customLorems) {
				configCustomArray = (<any>customLorems)[mapType];
			}

			if (configCustomArray instanceof Array && configCustomArray.length > 0) {
				generator = new LoremWhateverGenerator(configCustomArray);
			}
			else {
				vscode.window.showInformationMessage("lorem type " + mapType + " is either undefined or empty. Please check the settings.");
				return;
			}
		}
		else {
			generator = new LoremWhateverGenerator(mapType);
		}
		generatorsMap.set(mapType, generator);	
	}

	let configMinWordSize = <number>vscode.workspace.getConfiguration('loremWhatever').get("minWordCount");
	let loremIpsumBehaviour = LoremIpsumBehaviour.START_CLASSIC;

	if (mapType === PredefinedGenerators.LOREM) {
		let loremIpsumBehaviourConfigText = vscode.workspace.getConfiguration('loremWhatever').get("loremIpsumBehaviour");

		if (loremIpsumBehaviourConfigText === "Random") {
			loremIpsumBehaviour = LoremIpsumBehaviour.RANDOM;
		}
		else if (loremIpsumBehaviourConfigText === "Only classic Lorem Ipsum") {
			loremIpsumBehaviour = LoremIpsumBehaviour.ONLY_CLASSIC;
		}
	}
	
	let loremText = generator.getSentencesByMinWordCount(configMinWordSize ? configMinWordSize : defaultMinWordSize, loremIpsumBehaviour);
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
