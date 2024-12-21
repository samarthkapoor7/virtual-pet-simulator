class VirtualPet {
    constructor() {
        // Initialize state
        this.state = {
            hunger: 50,
            happiness: 50,
            energy: 50,
            isSleeping: false
        };

        // Cache DOM elements
        this.elements = {
            petImage: document.getElementById('pet-image'),
            hungerBar: document.getElementById('hunger'),
            happinessBar: document.getElementById('happiness'),
            energyBar: document.getElementById('energy'),
            statusMessage: document.getElementById('status-message'),
            feedButton: document.getElementById('feed'),
            playButton: document.getElementById('play'),
            sleepButton: document.getElementById('sleep')
        };

        // Bind event listeners
        this.elements.feedButton.addEventListener('click', () => this.feed());
        this.elements.playButton.addEventListener('click', () => this.play());
        this.elements.sleepButton.addEventListener('click', () => this.sleep());

        // Start simulation
        this.startSimulation();
    }

    // UI Updates
    updateUI() {
        this.elements.hungerBar.value = this.state.hunger;
        this.elements.happinessBar.value = this.state.happiness;
        this.elements.energyBar.value = this.state.energy;
        this.updatePetImage();
    }

    updatePetImage() {
        const images = {
            sleeping: "assets/sleeping-cat.jpg",
            hungry: "assets/hungry-cat.gif",
            sad: "assets/sad-cat.jpeg",
            tired: "assets/sleepy-cat.jpeg",
            default: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800"
        };

        if (this.state.isSleeping) {
            this.elements.petImage.src = images.sleeping;
        } else if (this.state.hunger > 80) {
            this.elements.petImage.src = images.hungry;
        } else if (this.state.happiness < 40) {
            this.elements.petImage.src = images.sad;
        } else if (this.state.energy < 20) {
            this.elements.petImage.src = images.tired;
        } else {
            this.elements.petImage.src = images.default;
        }
    }

    showMessage(message) {
        this.elements.statusMessage.textContent = message;
        this.elements.statusMessage.style.opacity = "0";
        setTimeout(() => {
            this.elements.statusMessage.style.opacity = "1";
        }, 50);
    }

    // Actions
    feed() {
        if (this.state.isSleeping) {
            this.showMessage("Shh! The pet is sleeping.");
            return;
        }
        this.state.hunger = Math.max(0, this.state.hunger - 20);
        this.state.happiness = Math.min(100, this.state.happiness + 5);
        this.state.energy = Math.min(100, this.state.energy + 5);
        this.updateUI();
        this.showMessage("Yum! The pet enjoyed its meal.");
    }

    play() {
        if (this.state.isSleeping) {
            this.showMessage("Shh! The pet is sleeping.");
            return;
        }
        if (this.state.energy < 20) {
            this.showMessage("The pet is too tired to play.");
            return;
        }
        this.state.happiness = Math.min(100, this.state.happiness + 15);
        this.state.energy = Math.max(0, this.state.energy - 20);
        this.state.hunger = Math.min(100, this.state.hunger + 10);
        this.updateUI();
        this.showMessage("Woohoo! The pet had fun playing.");
    }

    sleep() {
        if (this.state.isSleeping) {
            this.wakeUp();
        } else {
            this.state.isSleeping = true;
            this.elements.sleepButton.textContent = "Wake Up 🌅";
            this.showMessage("Zzz... The pet is sleeping soundly.");
            this.updatePetImage();
        }
    }

    wakeUp() {
        this.state.isSleeping = false;
        this.state.energy = 100;
        this.elements.sleepButton.textContent = "Sleep 💤";
        this.updateUI();
        this.showMessage("The pet woke up feeling refreshed!");
    }

    // Simulation
    startSimulation() {
        setInterval(() => {
            if (!this.state.isSleeping) {
                this.updateStats();
                this.updateUI();
                this.checkStatus();
            }
        }, 5000);
    }

    updateStats() {
        this.state.hunger = Math.min(100, this.state.hunger + 2);
        this.state.happiness = Math.max(0, this.state.happiness - 1);
        this.state.energy = Math.max(0, this.state.energy - 1);
    }

    checkStatus() {
        if (this.state.hunger > 80) {
            this.showMessage("Your pet is getting very hungry!");
        } else if (this.state.happiness < 20) {
            this.showMessage("Your pet is feeling sad. Try playing with it!");
        } else if (this.state.energy < 20) {
            this.showMessage("Your pet is getting tired. It might need some sleep.");
        }
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => new VirtualPet());