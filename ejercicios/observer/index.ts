interface Observer {
  update: (data: any) => any;
}

interface Subject {
  subscribe: (observer: Observer) => void;
  onSubscribe: (observer: Observer) => void;
}

class BitcoinPrice implements Subject {
  observers: Observer[] = []

  constructor(props) {
    const el: HTMLInputElement = document.querySelector('#value')
    el.addEventListener('input', () => {
      this.notify(el.value)
    })
  }


  subscribe(observer: Observer) {
    this.observers.push(observer)
  }

  onSubscribe(observer: Observer) {
    const index = this.observers.findIndex(obs => obs === observer);

    this.observers.splice(index, 1)
  }

  notify(data: any) {
    this.observers.forEach(obs => obs.update(data))
  }
}

class PriceDisplay implements Observer {
  private el: HTMLElement

  constructor(props) {
    this.el = document.querySelector('#price')
  }


  update(data: any) {
    this.el.innerText = data
  }
}

const value = new BitcoinPrice()
const display = new PriceDisplay()

value.subscribe(display)

setTimeout(() => {
  value.onSubscribe(display)
}, 5000)
