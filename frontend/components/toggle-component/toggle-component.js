import Component from '../Component.js';

export default class ToggleComponent extends Component {
    constructor(shadowRoot, name) {
        super(shadowRoot, name);

        this.initTheme();
        this.setupEventListeners();
    }

    initTheme() {
        const theme = localStorage.getItem('theme');
        const checkbox = this.shadowRoot.querySelector('.theme-switch__checkbox');
        if (theme === 'dark') {
            checkbox.checked = true;
            document.body.classList.add('dark-theme');
        } else {
            checkbox.checked = false;
            document.body.classList.remove('dark-theme');
        }
    }

    setupEventListeners() {
        const checkbox = this.shadowRoot.querySelector('.theme-switch__checkbox');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                localStorage.setItem('theme', 'dark');
                document.body.classList.add('dark-theme');
            } else {
                localStorage.setItem('theme', 'light');
                document.body.classList.remove('dark-theme');
            }
        });
    }
}
