import cluster from 'cluster';
import { cpus } from 'os';
import { Processes } from './types/constants';

export const createProcesses = (cb: () => void) => {
  if (cluster.isPrimary) {
    const cpusCount = cpus().length;
    console.log(Processes.CPUs, cpusCount);
    console.log(Processes.Primary, process.pid, '\n');

    cpus().forEach(() => {
      const worker = cluster.fork();

      worker.on('exit', () => {
        console.log(Processes.WorkerExid, worker.process.pid);
        cluster.fork();
      });
    });
  }

  if (cluster.isWorker) cb();
};
