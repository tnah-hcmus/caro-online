class Counter {
    constructor() {
        this.data = {};
    }
    count(label = "default") {
        if(!(label in this.data)) {
            this.clear(label);
        }
        this.data[label]++; 
    }
    get(label = "default") {
        if (label in this.data) {
            return this.data[label];
          }
        return undefined;
    }
    clear(label = "default") {
        this.data[label] = 0;
    }
    clearAll() {
        this.data = {};
    }
}
export const renders = new Counter();

export function useCounter(
  label = "default"
) {
  renders.count(label);
  return [renders.get(label)];
}