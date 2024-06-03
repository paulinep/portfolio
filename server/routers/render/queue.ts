import path from 'path';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import { RenderError, RenderResult, type RenderParams } from './render';
import type { ICacheStore } from '../../types';

type WorkerInfo = {
  worker: Worker;
  busy: boolean;
};

class RenderQueue {
  private cacheStore: ICacheStore;
  private workers: WorkerInfo[] = [];
  private tasks: RenderParams[] = [];
  private readonly workerFile: string;

  /**
   * @param cacheStore Хранилище для результата рендера
   * @param workersCount Количество воркеров для распараллеливания рендера
   */
  constructor (cacheStore: ICacheStore, workersCount: number = 4) {
    this.cacheStore = cacheStore;
    this.workerFile = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      './queue-worker.ts',
    );
    const cnt = Math.max(1, workersCount);
    for (let i = 0; i < cnt; i++) {
      this.makeWorker();
    }
  }

  /**
   * Добавление воркера
   * @private
   */
  private makeWorker () {
    const w = {
      worker: new Worker(this.workerFile),
      busy: false,
    };
    // Сообщения от главного потока
    w.worker.on('message', (msg) => {
      if (msg && typeof msg === 'object') {
        switch (msg.name) {
          case 'render-result': {
            const data = msg.data as RenderResult;
            this.cacheStore.update(
              data.params.key,
              data.html,
              data.status,
              data.params.maxAge,
              data.location,
            );
            w.busy = false;
            break;
          }
          case 'render-error': {
            const data = msg.data as RenderError;
            this.cacheStore.remove(data.params.key);
            w.busy = false;
            break;
          }
        }
        this.next();
      }
    });
    w.worker.on('error', (error) => {
      console.log('- worker error', error);
    });
    w.worker.on('exit', (code) => {
      console.log('- worker exit', code);
    });
    this.workers.push(w);
  }

  /**
   * Выполнение следующей задачи из очереди
   * @private
   */
  private next () {
    if (this.tasks.length > 0) {
      for (const w of this.workers) {
        if (!w.busy) {
          const params = this.tasks.shift();
          w.busy = true;
          w.worker.postMessage({ name: 'render', params });
          return;
        }
      }
    }
  }

  /**
   * Добавление в очередь рендера
   */
  push (params: RenderParams): void {
    this.tasks.push(params);
    this.next();
  }
}

export default RenderQueue;
