import cluster from 'cluster';
import { cpus } from 'os';

export const createProcesses = (cb: () => void) => {
  if (cluster.isPrimary) {
    const cpusCount = cpus().length;
    console.log('CPUs:', cpusCount);
    console.log('Primary started:', process.pid, '\n');

    cpus().forEach(() => {
      const worker = cluster.fork();

      worker.on('exit', () => {
        console.log('worker exided:', worker.process.pid);
        cluster.fork();
      });
    });
  }

  if (cluster.isWorker) cb();
};
