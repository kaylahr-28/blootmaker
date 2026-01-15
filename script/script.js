//HTML elements
let homePage;
let customizePage;
let completePage;
let startBtn;
let blootFrame;
let colorOption;
let charmOption;
let charmSelect;
let armOption;
let armSelect;
let eyeOption;
let eyeSelect;
let mouthOption;
let mouthSelect;
let completeFrame;
let nameOption;

let shineSound = new Audio("media/sound/shine.mp3");
let bgm = new Audio("media/sound/blootbgm.mp3");
let click = new Audio("media/sound/click.mp3");
let audioPause = false;





//accessory options
//defaults
const star = "star";
const openEye = "open";
const openDownMouth = "opendown";
const downArms = "down";

let nameArray = ["Lovely",
    "Sleepy",
    "Angry",
    "Lucky",
    "Gloomy",
    "Bashful",
    "Noble",
    "Fearful",
    "Enraged",
    "Wistful",
    "Content",
    "Melancholic",
    "Puzzled",
    "Giddy",
    "Wicked",
    "Polite",
    "Wacky",
    "Silly",
    "Dangerous",
    "Radioactive"
];

let lastBloot;
let previousBloots = [];

/**
 * Bloot class, holds Bloot features
 */
class Bloot {
    /**
     * 
     * @param {string} name 
     * @param {string} color 
     * @param {string} charm 
     * @param {string} eyes 
     * @param {string} mouth 
     * @param {string} arms 
     */
    constructor(name, color, charm, eyes, mouth, arms) {
        this.name = name;
        this.color = color;
        this.charm = charm;
        this.eyes = eyes;
        this.mouth = mouth;
        this.arms = arms;
    }

    /**
     * display: add features of Bloot to HTML div
     * @param {*} div the div that will hold the Bloot's display
     */
    display(div) {
        let blootBody;
        let displayName;
        if (div == blootFrame || div == completeFrame) {
            blootBody = "blootbody";
            displayName = "";
        } else {
            blootBody = "bloothomepg";
            displayName = `<p id='displayname'>${this.name} Bloot</p>`;
        }
        let blootString = `<img src='media/${blootBody}.png' alt='bloot body'>`;
        blootString += `<img class='accessories' src="media/eyes/${this.eyes}.png">`;
        blootString += `<img class='accessories' src="media/mouth/${this.mouth}.png">`;
        blootString += `<img class='accessories' src="media/arms/${this.arms}.png">`;
        blootString += `<img class='accessories' src="media/charm/${this.charm}.png">`;
        blootString += displayName;

        div.innerHTML = blootString;
    }

    /**
     * optionChanged: if a select option value is changed, update Bloot's features
     * @param {*} prop 
     * @param {*} newVal 
     */
    optionChanged(prop, newVal) {
        if (prop == "charm") {
            this.charm = newVal;
        } else if (prop == "arm") {
            this.arms = newVal;
        } else if (prop == "mouth") {
            this.mouth = newVal;
        } else if (prop == "eye") {
            this.eyes = newVal;
        }
        this.display(blootFrame);
    }

    /**
     * newBlootDiv: create new div for homepage to display previous Bloot
     * @param {*} div 
     */
    newBlootDiv(div) {
        div.innerHTML += `<div id="blootnum${previousBloots.length}" backgroundColor=${this.color}></div>`;

    }

    /**
     * prevDisplay: add div of most recent Bloot to larger div of all previous Bloots
     * @param {*} div 
     */
    prevDisplay(div) {
        div.innerHTML += this.display(div);
    }
}

//create new Bloot instance
let newBloot = new Bloot("", "92DCE5", star, openEye, openDownMouth, downArms);

document.addEventListener('DOMContentLoaded', () => {


    homePage = document.getElementById("homepage");
    customizePage = document.getElementById("customizepage");
    completePage = document.getElementById("completepage");
    startBtn = document.getElementById("startbutton");
    blootFrame = document.getElementById("blootframe");
    colorOption = document.getElementById("coloroption");
    charmSelect = document.getElementById("charmselect");
    armSelect = document.getElementById("armselect");
    eyeSelect = document.getElementById("eyeselect");
    mouthSelect = document.getElementById("mouthselect");
    completeFrame = document.getElementById("finalbloot");
    nameOption = document.querySelector("#nameoption");

    newBloot.display(blootFrame);
    //when color is changed, update bloot's color
    colorOption.addEventListener('change', (e) => {
        const newColor = e.target.value;
        blootFrame.style.backgroundColor = newColor;
        completeFrame.style.backgroundColor = newColor;
        newBloot.color = newColor;

    });


    charmSelect.addEventListener('input', (e) => {

        const newCharm = e.target.value;
        newBloot.optionChanged("charm", newCharm);

    });

    eyeSelect.addEventListener('input', (e) => {

        const newEyes = e.target.value;
        newBloot.optionChanged("eye", newEyes);

    });

    mouthSelect.addEventListener('input', (e) => {

        const newMouth = e.target.value;
        newBloot.optionChanged("mouth", newMouth);

    });

    armSelect.addEventListener('input', (e) => {

        const newArm = e.target.value;
        newBloot.optionChanged("arm", newArm);

    });


});

/**
 * btnClicked: navigate thru "pages" (divs) based on their current display options
 * @returns if name value is = ""
 */
function btnClicked() {

    //home to customize
    if (homePage.style.display != "none") {
        click.play();
        customizePage.style.display = "block";
        homePage.style.display = "none";

        newBloot.color = "#92DCE5";
        if (colorOption.value != "#92DCE5") {
            completeFrame.style.backgroundColor = "#92DCE5";
        }

        //customize to complete
    } else if (customizePage.style.display != "none") {
        if (nameOption.value == "") {
            return;
        }

        shineSound.play();
        completePage.style.display = "block";
        customizePage.style.display = "none";

        newBloot.display(completeFrame);
        newBloot.name = nameOption.value;

        //display name
        let nameDisplay = "Meet " + nameOption.value + " Bloot!"
        document.getElementById("meetbloot").innerHTML = nameDisplay;
        //complete to home
    } else if (completePage.style.display != "none") {
        completePage.style.display = "none";
        homePage.style.display = "flex";
        click.play();

        let addedBloot = newBloot;

        previousBloots.push(addedBloot);

        newBloot.newBlootDiv(document.getElementById("previousbloots"));

        document.querySelector(`#blootnum${previousBloots.length}`).style.backgroundImage = `linear-gradient(to bottom, ${newBloot.color}, ${newBloot.color})`;
        newBloot.display(document.querySelector(`#blootnum${previousBloots.length}`))

        resetBloot();
    }
}

/**
 * resetBloot: returns all features to their default vals for next Bloot to be created
 */
function resetBloot() {
    //reset all values
    blootFrame.style.backgroundColor = "#92DCE5";
    colorOption.value = "#92DCE5";
    nameOption.value = "";


    eyeSelect.value = "open";
    charmSelect.value = "star";
    mouthSelect.value = "opendown";
    armSelect.value = "down";
    newBloot.eyes = openEye;
    newBloot.mouth = openDownMouth;
    newBloot.charm = star;
    newBloot.arms = downArms;
    newBloot.display(blootFrame)
}

/**
 * randomClicked: cycles thru randomized names when randomize btn is clicked
 */
function randomClicked() {

    if (nameArray.length == 0) {
        nameArray = ["Lovely",
            "Sleepy",
            "Angry",
            "Lucky",
            "Gloomy",
            "Bashful",
            "Noble",
            "Fearful",
            "Enraged",
            "Wistful",
            "Content",
            "Melancholic",
            "Puzzled",
            "Giddy",
            "Wicked",
            "Polite",
            "Wacky",
            "Silly",
            "Dangerous",
            "Radioactive"
        ];
    }

    let randomNum = Math.floor(Math.random() * nameArray.length);

    //gets random name
    let randomName = nameArray[randomNum];

    newBloot.name = randomName;

    //removes name from array so it isnt repeatedly called
    nameArray.splice(randomNum, 1);

    nameOption.value = randomName;


}

/**
 * audioClicked: toggles bgm
 */
function audioClicked() {

    audioPause = !audioPause;

    if (audioPause == true) {
        bgm.pause();
    } else {
        bgm.play();
        bgm.loop = true;
        bgm.volume = 0.2;
    }


}



