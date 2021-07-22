import forkPackage from '../scripts/forkPackage';
import modules from '../config/modules';

Promise.all(
  modules.map((packageName) => forkPackage(packageName, 'build'))
).finally(() => {
  console.log('success');
});
