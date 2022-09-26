const {MineXON} = require("./index.js");

const minexon = new MineXON({
    apiKey: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
    apiURL: "https://default.minexon.net/api"
})
async function test() {
    /**
     * Checks is password is correct.
     * 
     * @returns {boolean}
     */
    let isValid = await minexon.checkAccount({
        username: "demo",
        password: "demo"
    });
    /**
     * Get account full info.
     * @returns {JSON}
     */
    let accountInfo = await minexon.getAccountInfo({
        username: 'demo'
    });
    /**
     * Get account socials info.
     * @returns {JSON}
     */
    let socials = await minexon.getAccountSocials({
        username: 'demo'
    });
    /**
     * Gets all the News from your website.
     * 
     * @returns {Array}
     */

    let news = await minexon.getNews();
    /**
     * Get All Credit History
     * 
     * @returns {Array}
     */
    let creditHistory = await minexon.getCreditHistory({
        size: 10
    });
    /**
     * Get Credit History by username
     * 
     * @returns {Array}
     */
    let creditHistoryUser = await minexon.getCreditHistory({
        size: 10,
        username: 'demo'
    });
    /**
     * Get all Credit Top
     * 
     * @returns {Array}
     */
    let creditTopAll = await minexon.getCreditTop({
        type: 'all'
    });
    /**
     * Get month Credit Top
     * 
     * @returns {Array}
     */
    let creditTopJustMonth = await minexon.getCreditTop({
        type: 'justMonth'
    });
    /**
     * Get All Store History
     * 
     * @returns {Array}
     */
        let storeHistory = await minexon.getStoreHistory({
        size: 10
    });
    /**
     * Get Store History by username
     * 
     * @returns {Array}
     */
    let storeHistoryUser = await minexon.getStoreHistory({
        size: 10,
        username: 'demo'
    });
}
test();