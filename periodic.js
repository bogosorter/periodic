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
    try {
        configuration = configuration.replace(/(?<=[spdf])(\d+)/g, '<sup>$1</sup>');
    } catch {
        // On some mobile devices, this won't work. Probably due to lack of
        // regex support.
        configuration = element.electron_configuration_semantic;
    }

    document.querySelector('#configuration').innerHTML = mode == 'show'? configuration : '?';

    // Change colors according to cpk-hex
    const bgColor = hexToRGB(element['cpk-hex']);
    const color = contrastingColor(bgColor);
    document.querySelector('#element').style.setProperty('--bg-color', bgColor.join(', '));
    document.querySelector('#element').style.setProperty('color', `rgb(${color})`);


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

/**
 * Get a contrasting color.
 * Code from https://stackoverflow.com/questions/635022/calculating-contrasting-colours-in-javascript/6511606
 */
 function contrastingColor(color)
 {
     return (luma(color) >= 165) ? '0, 0, 0' : '255, 255, 255';
 }
 function luma(color) // color can be a hx string or an array of RGB values 0-255
 {
     var rgb = (typeof color === 'string') ? hexToRGB(color) : color;
     return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
 }
 function hexToRGB(color)
 {
     if (color.length === 3)
         color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
     else if (color.length !== 6)
         throw('Invalid hex color: ' + color);
     var rgb = [];
     for (var i = 0; i <= 2; i++)
         rgb[i] = parseInt(color.substr(i * 2, 2), 16);
     return rgb;
 }