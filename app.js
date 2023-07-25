function getAttackValue(min, max) {
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

            currentRound: 0
        }
    },
    computed: {
        healthBarM() {
            return { width: this.monsterHealth + '%' }
        },
        healthBarP() {
            return { width: this.playerHealth + '%' }
        },
        mayUse() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            const attackValue = getAttackValue(this.pminAP, this.pmaxAP);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.currentRound++;
        },
        attackPlayer() {
            const attackValue = getAttackValue(this.mminAP, this.mmaxAP);
            this.playerHealth -= attackValue;
        },
        specialAttack() {
            const minSP = (this.pminAP * 1.5)
            const maxSP = (this.pmaxAP * 1.5)
            const attackValue = getAttackValue(minSP, maxSP);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.currentRound++;
        }
    }
})
app.mount('#game');