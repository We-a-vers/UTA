class FooterComponent extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadow.innerHTML = `
            <style>
                #footer-container {
                    display: flex;
                    max-width: 90rem;
                    max-height: 12.625rem;
                    padding: 9rem 2.4375rem 1.9375rem 2.5625rem;
                    justify-content: center;
                    align-items: flex-start;
                    background: var(--light-gray-50, #FEFEFE);
                    border-top: 1px solid #000;
                    background: #FFF;
                }

                #footer-content {
                    display: flex;
                    width: 85rem;
                    justify-content: space-between;
                    align-items: center;
                }

                #footer-title {
                    color: #000;
                    font-family: Open Sans;
                    font-size: 1.25rem;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                }

                #footer-links {

                }

                #footer-links a {
                    color: #000;
                    font-family: Open Sans;
                    font-size: 1.25rem;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    margin-left: 2.5rem;
                }

            </style>

            <div id="footer-container">
                <div id="footer-content">
                    <p id="footer-title">© United Taiwanese Association (UTA)</p>
                    <div id="footer-links">
                        <a>Email</a>
                        <a href="https://www.instagram.com/ucsduta/">Instagram</a>
                        <a href="https://www.facebook.com/groups/uta.at.ucsd/">Facebook</a>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('footer-component',FooterComponent);