const logoutButton = document.querySelector("tab-component").shadowRoot.querySelector("#log-out");

logoutButton.addEventListener('click', () => {
    console.log('logout')

    localStorage.removeItem('user')
    window.location.replace('/source/board-member/board-member.html')
})

