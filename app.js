function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            pminAP: 5,
            pmaxAP: 12,

            monsterHealth: 100,
            mminAP: 8,
            mmaxAP: 15,

            currentRound: 0,
            winner: null,
            GameOn: true,
            logMessages: []
        }
    },
    computed: {
        healthBar() {
            return function (health) {
                if (health < 0) { health = 0 }
                return { width: health + "%" }
            }
        },
        healthBarM() {
            return this.healthBar(this.monsterHealth)
        },
        healthBarP() {
            return this.healthBar(this.playerHealth);
        },
        mayUse() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // Draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // Player lost
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                //A draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // Monster lost
                this.winner = 'player'
            }
        }
    },
    methods: {
        startNew() {
            this.playerHealth = 100
            this.monsterHealth = 100
            this.winner = null
            this.currentRound = 0
            this.logMessages = []
        },
        attackMonster() {
            const attackValue = getRandomValue(this.pminAP, this.pmaxAP)
            this.monsterHealth -= attackValue
            this.addLogMessage('player', 'attack', attackValue)
            this.attackPlayer()
            this.currentRound++

        },
        attackPlayer() {
            const attackValue = getRandomValue(this.mminAP, this.mmaxAP)
            this.playerHealth -= attackValue
            this.addLogMessage('monster', 'attack', attackValue)
        },
        specialAttack() {
            const minSP = (this.pminAP * 1.5)
            const maxSP = (this.pmaxAP * 1.5)
            const attackValue = getRandomValue(minSP, maxSP)
            this.monsterHealth -= attackValue
            this.addLogMessage('player', 'special-attack', attackValue)
            this.attackPlayer()
            this.currentRound++

        },
        healPlayer() {
            const healValue = getRandomValue(this.pmaxAP, this.mmaxAP)
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue
            }
            this.addLogMessage('player', 'heal', healValue)
            this.attackPlayer()
            this.currentRound++
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
})
app.mount('#game')