import { Quote } from './Quote.js';

class Game {

  cutrrentStep = 0;
  lastStep = 3;

    quotes = [
        {
          text: "pan tadeusz",
          category: "Utwór literacki",
        },
        {
          text: "janko muzykant",
          category: "Utwór literacki",
        },
        {
          text: "akademia pana kleksa",
          category: "Film",
        },
        {
          text: "ogniem i mieczem",
          category: "Film",
        },
      ];

    constructor({
        lettersWrapper,
        categoryWrapper,
        wordWrapper,
        outputWrapper,
    }) {
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        const {text, category} = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.categoryWrapper.innerHTML = category;
        this.quote = new Quote(text);
    }

    guess (letter, event) {
        event.target.disabled = true;
        if(this.quote.guess(letter)) {
          this.drawQuote();
        } else {
          this.cutrrentStep++;
          document.getElementsByClassName('step')[this.cutrrentStep-1].style.opacity = 0.2;
          if (this.cutrrentStep == this.lastStep) {
            this.loosing();
          }
        }
    }


    drawLetters() {
        for (let i=0; i<26; i++) {
            const label = (i+10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label;
            button.addEventListener('click', (event) => this.guess(label, event));
            this.lettersWrapper.appendChild(button);
        }
    }

    drawQuote() {
      const content = this.quote.getContent();
      this.wordWrapper.innerHTML = content;
      if(!content.includes('_')) {
        this.wining();
      }
    }

  wining() {
    this.wordWrapper.innerHTML = 'WYGRYWASZ! KONIEC GRY!';
    this.lettersWrapper.innerHTML = '';
  }

  loosing() {
    this.wordWrapper.innerHTML = 'PRZEGRYWASZ! KONIEC GRY!';
    this.lettersWrapper.innerHTML = '';
  }

    start() {
      this.drawLetters();
      this.drawQuote();
    }
}

const game = new Game({
      lettersWrapper: document.getElementById('letters'),
      categoryWrapper: document.getElementById('category'),
      wordWrapper: document.getElementById('word'),
      outputWrapper: document.getElementById('output'),
    });

    game.start();