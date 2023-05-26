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
            margin-right: 70px;
            margin: 0;
            padding: 0;
        }

        a {
            text-decoration: none;
        }

        li > a {
            margin: 0px;
            color: white;
            padding: 40px;
            display: flex;
        }

        .navbar {
            top: 0;
            left: 0;
            width: 100vw;
            position:fixed;
            background-color: black;
            color: aliceblue;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .navbar h1 {
            margin-left: 147px;
        }

        .drop-down {
            position: relative;
        }

        .drop-down-items {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            opacity: 0;
            pointer-events: none;
            transition: opacity 150ms ease-in-out, 150ms ease-in-out;
            transform: translateY(-10px);
        }

        .drop-down > a:hover + .drop-down-items {
            opacity: 1;
            transform: translateY(0px);
            pointer-events: auto;
        }

        .drop-down:hover .drop-down-items {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0px);
        }

        .drop-down-items a:hover{
            background-color: wheat;
            color:black;
        }

        .drop-down-items > a {
            background-color: black;
            width: 8rem;
            color: white;
            padding: 40px 0;
            text-align: center;
        }

        .drop-down + a{
            cursor:default;
        }

        .prevent-select {
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* IE 10 and IE 11 */
            user-select: none; /* Standard syntax */
        }

      </style>
        

        <div class="navbar">
            <h1>UCSD UTA</h1>

            <ul>
                <li><a href="">ABOUT</a></li>
                <li class="drop-down">
                    <a class="prevent-select">TEAM</a>
                    <div class="drop-down-items">
                        <a href="">TEAM 1</a>
                        <a href="">TEAM 2</a>
                    </div>
                </li>
                <li class="drop-down">
                    <a class="prevent-select">EVENTS</a>
                    <div class="drop-down-items">
                        <a href="">EVENT 1</a>
                        <a href="">EVENT 2</a>
                    </div>
                </li>
                <li><a href="">SPONSORS</a></li>
            </ul>
        </div> 
        `
    }
}

customElements.define('navbar-component', NavbarComponent);