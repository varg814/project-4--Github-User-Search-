const searchBtn = document.getElementById("btn2");
const user = document.getElementById("user");
const login = document.getElementById("login");
const bio = document.getElementById("bio");
const dateCreated = document.getElementById("dateCreated");
const reposNumber = document.getElementById("reposNumber");
const followersNumber = document.getElementById("followersNumber");
const followingNumber = document.getElementById("followingNumber");
const loc = document.getElementById("loc");
const blog = document.getElementById("blog");
const twitter = document.getElementById("twitter");
const company = document.getElementById("company");
const contentSection = document.getElementById("contentSection");
const errorDiv = document.getElementById("errorDiv");
const imagee = document.getElementById("imagee")

async function getInfo() {
  
  
  try {
    const username = document.getElementById("username").value.toLowerCase();
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error("No Result");
    } else{
      errorDiv.innerHTML = "";
      contentSection.style.opacity = "100";
    }

    const data = await response.json();
    const userImg = data.avatar_url;
    const date = new Date(data.created_at);
    let months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const formattedDate = `${day} ${months[month]} ${year}  `;

    
    imagee.style.backgroundImage = `url(${userImg})`;
    user.innerHTML = data.name;
    reposNumber.innerHTML = data.public_repos;
    followersNumber.innerHTML = data.followers;
    followingNumber.innerHTML = data.following;
    dateCreated.innerHTML = `date ${formattedDate}`;
    loc.innerHTML = data.location;
    blog.innerHTML = data.blog;
    twitter.innerHTML = data.twitter_username;
    company.innerHTML = data.company;
    login.innerHTML = `@${data.login}`;

    if (data.bio === null) {
      bio.innerHTML = "This profile has no bio";
      bio.style.color = "#4B6A9B";
    }

    if (data.name === null) {
      user.innerHTML = "Not Available";
    } else {
      user.innerHTML = data.name;
    }

    if (data.company === null) {
      company.innerHTML = "Not Available";
      company.style.color = "#4B6A9B";
      company.style.opacity = 0.6

    }else {
      company.style.opacity = 1
    }

    if (data.twitter_username === null) {
      twitter.innerHTML = "Not Available";
      twitter.style.color = "#4B6A9B";
      twitter.style.opacity = 0.6
    } else {
      twitter.style.opacity = 1
    }

    if (data.location === null) {
      loc.innerHTML = "Not Available";
      loc.style.color = "#4B6A9B";
      loc.style.opacity = 0.6

    }else {
      loc.style.opacity = 1
    }

    if (data.blog === "") {
      blog.innerHTML = "Not Available";
      blog.style.color = "#4B6A9B";
      blog.style.opacity = 0.6

    }else {
      blog.style.opacity = 1
    }
  } catch (error) {
    let toStr = error.toString();
    errorDiv.innerHTML = toStr.slice(6);

    errorDiv.style.color = "red";
    contentSection.style.opacity = 0;
    contentSection.style.backgroundImage = "none";
  }
}

const toggleButton = document.getElementById('btn');
const body = document.body; 
const modeText = document.querySelector('.toggle p');

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  modeText.textContent = 'LIGHT';
  toggleButton.style.backgroundImage = 'url("./imgs/002-sun.png")';
  user.style.color = "white"

} else {
  body.classList.remove('dark-mode');
  modeText.textContent = 'DARK';
  toggleButton.style.backgroundImage = 'url("./imgs/moon.png")';
  user.style.color = "#2B3442"

}


toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    modeText.textContent = 'LIGHT';
    toggleButton.style.backgroundImage = 'url("./imgs/002-sun.png")'; 
    user.style.color = "white"
  } else {
    localStorage.setItem('theme', 'light');
    modeText.textContent = 'DARK'; 
    toggleButton.style.backgroundImage = 'url("./imgs/moon.png")'; 
    user.style.color = "#2B3442"
  }
});



