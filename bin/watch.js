import forkPackage from '../scripts/forkPackage';
import modules from '../config/modules';

Promise.all(
  modules.map((packageName) => forkPackage(packageName, 'watch'))
).finally(() => {
  console.log('success');
});
