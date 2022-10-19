/**
 * Displays an element. `mode` defines which information to hide: `number` hides
 * the atomic number, `position` hides the group and period, `show` shows all
 * information.
 */
function display(element, mode) {
    document.querySelector('#name').innerHTML = element.name;
    document.querySelector('#symbol').innerHTML = element.symbol;

    document.querySelector('#atomic-number').innerHTML = mode != 'number'? element.number : '?';
    document.querySelector('#group').innerHTML = mode != 'position'? element.xpos : '?';
    const period = element.period + (element.ypos >= 9? ' (f block)' : '');
    document.querySelector('#period').innerHTML = mode != 'position'? period : '?';

    let configuration = element.electron_configuration_semantic;
    // configuration = configuration.replace(/(?<=[spdf])(\d+)/g, '<sup>$1</sup>');
    // the above line is not supported on some mobile browsers. Therefore, we
    // have to resort to a more verbose solution, looping over the string:
    let newConfiguration = '';
    let i = 0;
    while (i < configuration.length) {
        if (configuration[i] == 's' || configuration[i] == 'p' || configuration[i] == 'd' || configuration[i] == 'f') {
            newConfiguration += configuration[i];
            i++;
            if (i < configuration.length && configuration[i] >= '0' && configuration[i] <= '9') {
                newConfiguration += '<sup>' + configuration[i]
                i++;
                if (i < configuration.length && configuration[i] >= '0' && configuration[i] <= '9') {
                    newConfiguration += configuration[i];
                    i++;
                }
                newConfiguration += '</sup>';
            }
        } else {
            newConfiguration += configuration[i];
            i++;
        }
    }

    document.querySelector('#configuration').innerHTML = mode == 'show'? newConfiguration : '?';

    const button = document.querySelector('#button');
    if (mode != 'show') {
        button.innerHTML = 'Show';
        button.onclick = () => display(element, 'show');
    } else {
        button.innerHTML = 'Next';
        button.onclick = () => next();
    }
}

/**
 * Chooses a random element from the periodic table.
 */
function chooseElement() {
    return table[Math.floor(Math.random() * table.length)];
}

/**
 * Chooses a random element from the periodic table and displays it.
 */
function next() {
    const element = chooseElement();
    const mode = document.querySelector('#mode').value;
    display(element, mode);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the content
    next();
})