class VirtualPet {
    constructor() {
        this.hunger = 50;
        this.happiness = 50;
        this.energy = 50;
        this.isSleeping = false;

        this.petImage = document.getElementById('pet-image');
        this.hungerBar = document.getElementById('hunger');
        this.happinessBar = document.getElementById('happiness');
        this.energyBar = document.getElementById('energy');
        this.statusMessage = document.getElementById('status-message');

        this.feedButton = document.getElementById('feed');
        this.playButton = document.getElementById('play');
        this.sleepButton = document.getElementById('sleep');

        this.feedButton.addEventListener('click', () => this.feed());
        this.playButton.addEventListener('click', () => this.play());
        this.sleepButton.addEventListener('click', () => this.sleep());

        this.updateUI();
        this.startSimulation();
    }

    feed() {
        if (this.isSleeping) {
            this.statusMessage.textContent = "Shh! The pet is sleeping.";
            return;
        }
        this.hunger = Math.max(0, this.hunger - 20);
        this.happiness += 5;
        this.energy += 5;
        this.updateUI();
        this.statusMessage.textContent = "Yum! The pet enjoyed its meal.";
    }

    play() {
        if (this.isSleeping) {
            this.statusMessage.textContent = "Shh! The pet is sleeping.";
            return;
        }
        if (this.energy < 20) {
            this.statusMessage.textContent = "The pet is too tired to play.";
            return;
        }
        this.happiness += 15;
        this.energy -= 20;
        this.hunger += 10;
        this.updateUI();
        this.statusMessage.textContent = "Woohoo! The pet had fun playing.";
    }

    sleep() {
        if (this.isSleeping) {
            this.wakeUp();
        } else {
            this.isSleeping = true;
            this.sleepButton.textContent = "Wake Up";
            this.statusMessage.textContent = "Zzz... The pet is sleeping soundly.";
            this.updatePetImage();
        }
    }

    wakeUp() {
        this.isSleeping = false;
        this.sleepButton.textContent = "Sleep";
        this.energy = 100;
        this.statusMessage.textContent = "The pet woke up feeling refreshed!";
        this.updateUI();
    }

    updateUI() {
        this.hungerBar.value = this.hunger;
        this.happinessBar.value = this.happiness;
        this.energyBar.value = this.energy;
        this.updatePetImage();
    }

    updatePetImage() {
        if (this.isSleeping) {
            this.petImage.src = "assets/sleeping-cat.jpg";
        } else if (this.hunger > 80) {
            this.petImage.src = "assets/hungry-cat.gif";
        } else if (this.happiness < 40) {
            this.petImage.src = "assets/sad-cat.jpeg";
        } else if (this.energy < 20) {
            this.petImage.src = "assets/sleepy-cat.jpeg";
        } else if (this.hunger < 20) {
            this.petImage.src = "assets/fat-cat.jpg";
        } else {
            this.petImage.src = "assets/cat.jpg";
        }
    }

    startSimulation() {
        setInterval(() => {
            if (!this.isSleeping) {
                this.hunger = Math.min(100, this.hunger + 2);
                this.happiness = Math.max(0, this.happiness - 1);
                this.energy = Math.max(0, this.energy - 1);
                this.updateUI();

                if (this.hunger > 80) {
                    this.statusMessage.textContent = "Your pet is getting very hungry!";
                } else if (this.happiness < 20) {
                    this.statusMessage.textContent = "Your pet is feeling sad. Try playing with it!";
                } else if (this.energy < 20) {
                    this.statusMessage.textContent = "Your pet is getting tired. It might need some sleep.";
                }
            }
        }, 5000);
    }
}

window.onload = () => {
    new VirtualPet();
};