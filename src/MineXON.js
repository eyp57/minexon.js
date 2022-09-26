const { MineXONOptions, AccountOptions, CreditHistoryOptions, StoreHistoryOptions, AccountSocialsOptions } = require("./Constants");
const fetch = (...args) => import('node-fetch').then(({ default: e }) => e(...args));

class MineXON {
    /**
     * 
     * @param {MineXONOptions} options 
     */
    constructor(options = {
        apiKey: "",
        apiURL: ""
    }) {
        const { apiKey, apiURL } = options;

        if(apiKey == null || apiKey == undefined || apiKey == "") throw new Error("Please give an apiKey option to MineXON Object");
        if(apiURL == null || apiURL == undefined || apiURL == "") throw new Error("Please give an apiURL option to MineXON Object");

        this.apiKey = apiKey;
        this.apiURL = new URL(apiURL);
    }
    static getVersion() {
        return "v6.0.7"
    }
    /**
     * 
     * @param {AccountOptions} options 
     */
    async checkAccount(options = {
        username: "",
        password: ""
    }) {
        const { username, password } = options;
        if(username == null || username == undefined || username == "") throw new Error("Please give an username option to Account data");
        if(password == null || password == undefined || password == "") throw new Error("Please give an password option to Account data");
        const response = await fetch(this.apiURL.origin + "/api/controller/account.php?apiKey=" + this.apiKey + "&action=password-control&username=" + username + "&password=" + password).then(res => res.text()).catch(() => `NO`);
        return response == "OK" ? true : false
    }
    /**
     * 
     * @param {AccountSocialsOptions} options 
     * @returns
     */
    async getAccountSocials(options = {
        username: ''
    }) {
        const { username } = options;
        if(username == null || username == undefined || username == "") throw new Error("Please give an username option to Account data");
        const response = await fetch(this.apiURL.origin + "/api/controller/account.php?apiKey=" + this.apiKey + "&action=socials&username=" + username).then(res => res.text()).catch(() => 'Data not found.');
        return response == "Data not found." ? {
            response: 'Data not found.'
        } : JSON.parse(response);
    }
    /**
     * 
     * @param {AccountSocialsOptions} options 
     * @returns 
     */
    async getAccountInfo(options = {
        username: ''
    }) {
        const { username } = options;
        if(username == null || username == undefined || username == "") throw new Error("Please give an username option to Account data");
        const response = await fetch(this.apiURL.origin + "/api/controller/account.php?apiKey=" + this.apiKey + "&action=info&username=" + username).then(res => res.text()).catch(() => 'Data not found.');
        return response == "Data not found." ? {
            response: 'Data not found.'
        } : JSON.parse(response);
    }

    async getNews(size = 5) {
        if (isNaN(size)) throw new Error("Size is not an integer");
        const response = await fetch(this.apiURL.origin + "/api/controller/news.php?apiKey=" + this.apiKey + "&action=news&size=" + size).then(res => res.json()).catch(() => ([
            {
                newsId: '0',
                title: 'There is an error with connecting to API',
                image: '',
                text: '<p>There was an error with connecting to NEWS API.</p>',
                views: '0',
                likes: '0',
                author: 'No One',
                date: "01.01.1997"
            }
        ]));
        return response;
    }

    /**
     * 
     * @param {CreditHistoryOptions} options 
     */
    async getCreditHistory(options = {
        size: '',
        username: ''
    }) {
        let { username, size } = options;
        if(isNaN(size)) size = 5;
        let url = this.apiURL.origin + "/api/controller/credit.php?apiKey=" + this.apiKey + "&action=history&size=" + size;
        if(username) {
            url = url + "&username=" + username;
        };
        const response = await fetch(url).then(res => res.text()).catch(() => `Data not found.`);
        return response == "Data not found." ? {
            response: 'Data not found.'
        } : JSON.parse(response);
    }

    async getCreditTop(options = {
        type: 'all',
    }) {
        let { type } = options;
        let url = this.apiURL.origin + "/api/controller/credit.php?apiKey=" + this.apiKey + "&action=top&type=" + type;
        const response = await fetch(url).then(res => res.text()).catch(() => `Data not found.`);
        return response == "Data not found." ? {
            response: 'Data not found.'
        } : JSON.parse(response);
    }

    /**
     * 
     * @param {StoreHistoryOptions} options 
     */
     async getStoreHistory(options = {
        size: '',
        username: ''
    }) {
        let { username, size } = options;
        if(isNaN(size)) size = 5;
        let url = this.apiURL.origin + "/api/controller/store.php?apiKey=" + this.apiKey + "&action=history&size=" + size;
        if(username) {
            url = url + "&username=" + username;
        };
        const response = await fetch(url).then(res => res.text()).catch(() => `Data not found.`);
        return response == "Data not found." ? {
            response: 'Data not found.'
        } : JSON.parse(response);
    }
}
module.exports = MineXON;