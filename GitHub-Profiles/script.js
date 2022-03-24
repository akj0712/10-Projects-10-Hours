console.log("GitHub Profiles");

const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//* Default User
getUser("akj0712");

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserData(respData);

    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addRepoToCard(respData);
}

function createUserData(user) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardHTML = `
        <div id="card" class="card">
            <div class="img-container">
                <a href="${user.html_url}" target="_blank"><img class="avatar" src="${user.avatar_url}" alt="${user.name}"/></a>
            </div>
            <div class="user-info">
                <h2><a href="${user.html_url}" target="_blank">${user.name}</a></h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Follower</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repository</strong></li>
                </ul>
                <div id="repos">
                    
                </div>
            
            </div>
        </div>
    `;
    main.innerHTML = cardHTML;
}

function addRepoToCard(repos) {
    const reposEl = document.getElementById("repos");
    // console.log(repos);

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 9)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;
            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;
    console.log(user);
    if (user) {
        getUser(user);
        search.value = "";
    }
});
