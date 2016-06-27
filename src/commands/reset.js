import inquirer from 'inquirer';
import { exec, rm } from 'shelljs';
import { Log } from '../utils';

export function reset() {
  inquirer.prompt([{
    type: 'confirm',
    name: 'reset',
    message: '\nResetting the database! Also delete node_modules?',
    default: false
  }]).then((answers) => {
    if (answers.reset) {
      Log.info('Resetting the database...');
      exec('meteor reset');

      Log.info('Deleting node_modules...');
      rm('-rf', 'node_modules');

      Log.info('Reinstalling node_modules...');
      exec('meteor npm install');

      Log.success('Done!');
    } else {
      Log.info('Resetting the database...');
      exec('meteor reset');
      Log.success('Done!');
    }
  });
}