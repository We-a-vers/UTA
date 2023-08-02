class NavbarComponent extends HTMLElement{
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
       /* CSS for the navigation bar */

        body {
            margin: 80px;
            padding-top: 80px; 
        }
        
        ul {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        margin: 0 3% 0 0;
        gap: 1.5rem;
        }
        
        a {
        text-decoration: none;
        }
        
        li > a {
        margin: 0px;
        color: #172940;
        padding: 40px;
        display: flex;
        font-family: 'Lora';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        }
        
        .navbar {
        top: 0;
        left: 0;
        width: 100vw;
        position:fixed;
        background-color: white;
        color: #172940;
        display: flex;
        align-items: center;
        justify-content: space-between;
        filter: drop-shadow(0px 4px 4px rgba(29, 49, 89, 0.1));
        }
        
        .navbar h1 {
        margin-left: 147px;
        }
        
        .navbar img{
        margin-left: 80px;
        width: 31%;
        }
        
        .drop-down {
        position: relative;
        }
        
        .drop-down-items {
        display: flex;
        flex-direction: column;
        position: absolute;
        color: #172940;
        top: 100%;
        left: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity 150ms ease-in-out, 150ms ease-in-out;
        transform: translateY(-10px);
        }
        
        .drop-down:hover .drop-down-items {
        opacity: 1;
        pointer-events: auto;
        background-color: white;
        transform: translateY(0px);
        }
        
        .drop-down:hover{
        text-decoration: underline;
        }
        
        .drop-down-items a:hover{
        background-color: #3C4F75;
        color:white;
        }
        
        .drop-down-items > a {
        color: #172940;
        width: 8rem;
        padding: 40px 0;
        text-align: center;
        }
        
        .drop-down-items a:nth-child(2){
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        }
        
        .drop-down + a{
        cursor:default;
        }
        
        .prevent-select {
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
        }
        
        .navbar-container {
            margin-bottom: 5.25rem;
        }
        
        #home-button{
            display: inline-flex;
        }
        
        #home-button > img:hover{
            cursor: pointer;
        }
        
        #home-button > img{
            width: 100%;
        }

    </style>
        

    <div class="navbar-container">
        <div class="navbar">

            <a href="/" id="home-button"><img src="/source/assets/UTA-logo.png" alt=""></a>

            <ul>
                <li><a href="/source/about-us/about-us.html">About Us</a></li>
                <li class="drop-down">
                    <a class="prevent-select">Team</a>
                    <div class="drop-down-items">
                        <a href="/source/board-member/board-member.html">Board Member</a>
                        <a href="/source/intern-program/intern.html">Intern Program</a>
                    </div>
                </li>
                <li class="drop-down">
                    <a class="prevent-select">Events</a>
                    <div class="drop-down-items">
                        <a href="/source/events/events.html">All</a>
                        <a href="/source//archive/archive.html">Archive</a>
                    </div>
                </li>
                <li><a href="/source/sponsors/sponsors.html">Sponsors</a></li>
                <li><a style="cursor: pointer;" id="log-in">Login</a></li>
            </ul>
        </div> 
    </div> 
        `
    }
}

customElements.define('navbar-component', NavbarComponent);