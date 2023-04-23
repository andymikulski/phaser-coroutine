// export default class Coroutine<T> {
//   private generator: IterableIterator<T>;
//   private lastValue: T;
//   private stopped = false;

//   constructor(private fn: () => IterableIterator<T>) {
//     this.generator = fn();
//   }

//   public get value(): T {
//     return this.lastValue;
//   }

//   public run = () => {
//     if (this.stopped) {
//       return;
//     }

//     const result = this.generator.next();
//     this.lastValue = result.value;
//     if (!result.done) {
//       // requestAnimationFrame(this.run);
//       // setTimeout(this.run, 0);
//       requestIdleCallback(this.run);
//     }
//   };

//   public reset = () => {
//     this.generator = this.fn();
//     this.lastValue = undefined;
//     this.stopped = false;
//   }

//   public stop = () => {
//     this.stopped = true;
//   }
// }

export default class Coroutine<T> {
  private generator: IterableIterator<T>;
  private lastValue: any;
  private stopped: boolean;
  private resolve: (value?: any) => void;
  private reject: (error?: any) => void;
  private promise: Promise<Coroutine<T>>;

  constructor(private fn: () => IterableIterator<any>) {
    this.generator = fn();
    this.stopped = false;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  run = () => {
    if (this.stopped) {
      return;
    }
    const result = this.generator.next();
    this.lastValue = result.value;
    if (result.done) {
      this.resolve(this);
    } else {
      // requestAnimationFrame(this.run);
      // setTimeout(this.run, 0);
      requestIdleCallback(this.run);
    }
  };

  get value() {
    return this.lastValue;
  }

  reset = () => {
    this.generator = this.fn();
    this.lastValue = undefined;
    this.stopped = false;
    this.promise = new Promise<this>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  };

  stop = () => {
    this.stopped = true;
  };

  get completed() {
    return this.promise;
  }
}
