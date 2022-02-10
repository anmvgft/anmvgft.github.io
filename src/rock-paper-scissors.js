import { Home } from './views/HomeView.js';
import { Game } from './views/GameView.js';
import { RockPaperScissors } from './RockPaperScissors.js';
import { Option } from './components/OptionComponent.js';
import { ButtonComponent } from './components/ButtonComponent.js';

customElements.define('rock-paper-scissors-app', RockPaperScissors);
customElements.define('home-view', Home);
customElements.define('game-view', Game);
customElements.define('game-option', Option);
customElements.define('button-component', ButtonComponent);
