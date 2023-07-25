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
        }
    },
    computed: {
        healthBarM() {
            return { width: this.monsterHealth + '%' }
        },
        healthBarP() {
            return { width: this.playerHealth + '%' }
        }
    },
    methods: {
        attackMonster() {
            const attackValue = getAttackValue(this.pminAP, this.pmaxAP);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getAttackValue(this.mminAP, this.mmaxAP);
            this.playerHealth -= attackValue;
        }
    }
})
app.mount('#game');