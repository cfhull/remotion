import {initializeRenderCli} from './initialize-render-cli';
import {Log} from './log';
import {parsedCli} from './parse-command-line';
import {getPackageManager} from './preview-server/get-package-manager';
import {getRemotionVersion} from './preview-server/update-available';

export const lambdaCommand = async () => {
	try {
		const path = require.resolve('@remotion/lambda', {
			paths: [process.cwd()],
		});
		const {LambdaInternals} = require(path);
		await initializeRenderCli('lambda');

		await LambdaInternals.executeCommand(parsedCli._.slice(1));
		process.exit(0);
	} catch (err) {
		const manager = getPackageManager();
		const installCommand =
			manager === 'unknown' ? 'npm i' : manager.installCommand;
		Log.error(err);
		Log.error('Remotion Lambda is not installed.');
		Log.info('');
		Log.info('You can install it using:');
		Log.info(`${installCommand} i @remotion/lambda@${getRemotionVersion()}`);
		process.exit(1);
	}
};
