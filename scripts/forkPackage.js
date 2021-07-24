import childProcess from 'child_process';

const forkPackage = (libName, scriptName = 'watch') => {
  childProcess.exec(`yarn workspace ${libName} ${scriptName}`);
};

export default forkPackage;
