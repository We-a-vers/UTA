class TabComponent extends HTMLElement{
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

            html, body{
                margin: 0;
            }
        
            ul{
                display: flex;
                flex-direction: column;
                list-style-type: none;
                margin-right: 70px;
                margin: 0;
                padding: 0;
                gap: 10px;
                margin-top: 3rem;
            }

            li{
                border: 1px;
                text-align: left;
                padding: 1rem;
                border-radius: 0.5rem;
                color: black;
                font-size: 16px;
                font-family: 'Inter', sans-serif;
                font-style: normal;
                font-weight: 500;
                line-height: 140%;
            }

            li:hover{
                cursor: pointer;
            }

            li:focus{
                background-color: #F2F5F7;
            }

            h1{
                display: flex;
                font-size: 16px;
                color: black;
                font-family: 'Inter', sans-serif;
                font-style: normal;
                font-weight: 700;
            }

            img{
                margin-right: 10px;
                align-self: center;
            }

            #tab-container{
                background-color: #FCFCFD;
                width: 17.5rem;
                margin-top: 0;
                padding-top: 1.5rem;
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                height: 100%;
                border-right: 1px solid #DEE1EB;
            }

            #tab-header{
                display: flex;
                align-items: center;
            }

            .prevent-select {
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
            }

        </style>
        
        <div id="tab-container">
            <!-- Add icon next to title -->
            
            <div id="tab-header">
                <img src="../assets/admin-icon-tab.png" alt="">
                <h1>Admin</h1>
            </div>
         
            
            <ul class="prevent-select">
                <li tabindex="1">Home</li>
                <li tabindex="2">About Us</li>
                <li tabindex="3">Board Members</li>
                <li tabindex="4">Intern Program</li>
                <li tabindex="5">Events</li>
                <li tabindex="6">Sponsors</li>
            </ul>
        </div>
         
        `
    }
}

customElements.define('tab-component',TabComponent);