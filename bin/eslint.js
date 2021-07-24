import forkPackage from '../scripts/forkPackage';
import modules from '../config/modules';

Promise.all(
  modules.map((packageName) => forkPackage(packageName, 'eslint'))
).finally(() => {
  console.log('success');
});
